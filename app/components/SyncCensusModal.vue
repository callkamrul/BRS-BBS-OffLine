<template>

    <div>
        <div class="modal fade" id="login-modal-syncup" tabindex="-1" role="dialog" aria-labelledby="login-modal-title">
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

                            <button type="button" @click="authenticateThenSyncCensus" class="btn btn-primary">Login</button>
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
                users: [],
                census: {}
            };
        },

        methods: {
            authenticateThenSyncCensus() {
                var user_name = this.user_name;
                var password = this.password;
                var census = this.census;

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
                            //console.log(response.data.token);

                            var syncCensus = function (token) {
                                var auth_obj = token;
                                console.log(auth_obj);
                                console.log(census);


                                alert("sync CensusId");
                                return 0;

                                axios
                                    .post("http://192.168.50.14/api/offline/census", census)
                                    .then(function (response) {
                                        //console.log(response);

                                        if (response.status == 200) {
                                            console.log(response);
                                        } else {
                                            alert(response.token);
                                            return 0;
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        alert("Error census posting");
                                    });
                            };

                            syncCensus(response.data.token);
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

                $("#login-modal-syncup").modal("hide");
            },
            loginClose() {
                $("#login-modal-syncup").modal("hide");
            },
            loginForm2(census) {
                this.census = census;
                $("#sync-census-modal").modal("show");
            }
        },

        mounted: function () {
            eventHub.$on("sync-census", this.loginForm2);
        },
        beforeDestroy: function () {
            eventHub.$off("sync-census", this.loginForm2);
        }
    };
</script>
