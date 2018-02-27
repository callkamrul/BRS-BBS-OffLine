<template>
    <div>
        <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modal-title">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="login-modal-title">Login BRS_BBS</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label class="control-label">User Name</label>
                                <input type="text" class="form-control" name="user_name" v-model="user_name" placeholder="Username">
                            </div>
                            <div class="form-group">
                                <label class="control-label">Password</label>
                                <input type="password" class="form-control" name="password" v-model="password" placeholder="Password">
                            </div>

                            <button type="button" @click="authenticate" class="btn btn-primary">Login</button>
                            <button type="button" class="btn btn-link" @click="loginClose">Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal -->

    </div>
</template>

<script>
    import Vue from "vue";

    import store from "../store";
    import eventHub from "../shared/EventHub";

    export default {
        data() {
            return {
                user_name: "",
                password: "",
                users: []
            };
        },

        methods: {
            authenticate() {
                var user_name = this.user_name;
                var password = this.password;

                axios
                    .post("http://192.168.50.14/api/signin", {
                        user_name: user_name,
                        password: password
                    })
                    .then(function (response) {
                        //this.users =response;

                        // console.log(response.token);
                        // return 0;
                        if (response.status == 200) {
                            console.log(response.data.token);
                            //sync Down Setup Start ...
                            var syncDownSetup = function () {
                                alert("syncDownSetup");
                                //var vm = this
                                axios
                                    .get("http://192.168.50.14/api/divisions")
                                    .then(function (response) {
                                        db.run("DELETE FROM DIVISIONS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var sql_insert;
                                            sql_insert =
                                                "INSERT INTO DIVISIONS (ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert +=
                                                " (" +
                                                item.id +
                                                ", '" +
                                                item.geo_code +
                                                "', '" +
                                                item.name +
                                                "', '" +
                                                item.name_bn +
                                                "', " +
                                                item.created_by +
                                                ", " +
                                                item.updated_by +
                                                ");";
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }
                                        alert("Division Setup Synced");
                                    })
                                    .then(function () {
                                        axios
                                            .get("http://192.168.50.14/api/districts")
                                            .then(function (response) {
                                                db.run("DELETE FROM DISTRICTS");
                                                var items = response.data;
                                                for (var prop in items) {
                                                    //console.log(items[prop]);
                                                    var item = items[prop];
                                                    var sql_insert;
                                                    sql_insert =
                                                        "INSERT INTO DISTRICTS (ID, DIVISION_ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                                    sql_insert +=
                                                        " (" +
                                                        item.id +
                                                        ", " +
                                                        item.division_id +
                                                        ", '" +
                                                        item.geo_code +
                                                        "', '" +
                                                        item.name +
                                                        "', '" +
                                                        item.name_bn +
                                                        "', " +
                                                        item.created_by +
                                                        ", " +
                                                        item.updated_by +
                                                        ");";
                                                    db.run(sql_insert);
                                                    sql_insert = "";
                                                }

                                                alert("District Setup Synced");

                                            });
                                    })
                                    .then(function () {
                                        alert("Thana/Upazila Setup Synced");
                                        location.reload(true);
                                    });

                                //console.log(vm.divisions);
                            };
                            syncDownSetup(); //call syncDownSetup function;

                        } else {
                            alert(response.token);
                            return 0;
                        }

                        //return 0;
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Error");
                    });

                $("#login-modal").modal("hide");
            },
            loginClose() {
                $("#login-modal").modal("hide");
            },
        },

        mounted: function () {
            eventHub.$on("sync-setup", this.loginForm);
        },
        beforeDestroy: function () {
            eventHub.$off("sync-setup", this.loginForm);
        }
    };
</script>
