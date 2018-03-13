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
                            var syncDivision = function () {
                                //alert("syncDivision");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/divisions")
                                    .then(function (response) {
                                        //db.run("DELETE FROM DIVISIONS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var sql_insert;
                                            //var sql_update;
                                          /*  var sql_select = "SELECT COUNT(*) FROM DIVISIONS WHERE ID =" + item.id;
                                            var isExistDiv = db.run(sql_select);
                                            console.log(isExistDiv);
                                            if(isExistDiv){
                                                sql_update =
                                                    "UPDATE DIVISIONS SET";
                                                sql_update +=
                                                    " GEO_CODE='" +
                                                    item.geo_code +
                                                    "', NAME='" +
                                                    item.name +
                                                    "', NAME_BN='" +
                                                    item.name_bn +
                                                    "' WHERE ID =" +
                                                    item.id +
                                                    ";";
                                                db.run(sql_update);
                                                sql_update = "";
                                            }else*/ //{
                                                sql_insert =
                                                    "REPLACE INTO DIVISIONS (ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
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
//                                            }

                                        }
                                    });

                                //console.log(vm.divisions);
                            };
                            var syncDistrict = function () {
                               // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/districts")
                                    .then(function (response) {
                                       // db.run("DELETE FROM DISTRICTS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var sql_insert;
                                            sql_insert =
                                                "REPLACE INTO DISTRICTS (ID, DIVISION_ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
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

                                       // alert("District Setup Synced");

                                    });

                                //console.log(vm.divisions);
                            };

                            var syncThanaUpazila = function () {
                               // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/thana-upazilas")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var sql_insert;
                                            sql_insert =
                                                "REPLACE INTO THANA_UPAZILAS (ID, DIVISION_ID, DISTRICT_ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert +=
                                                " (" +
                                                item.id +
                                                ", " +
                                                item.division_id +
                                                ", " +
                                                item.district_id +
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

                                        //alert("Thanaupazila Setup Synced");

                                    });

                                //console.log(vm.divisions);
                            };

                            var syncMauzaMahallah = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/mauza-mahallahs")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var sql_insert;
                                            sql_insert =
                                                "REPLACE INTO MAUZA_MAHALLAHS (ID, DIVISION_ID, DISTRICT_ID, THANA_UPAZILA_ID, UNION_WARD_ID, GEO_CODE, GEO_CODE_OLD, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert +=
                                                " (" +
                                                item.id +
                                                ", " +
                                                item.division_id +
                                                ", " +
                                                item.district_id +
                                                ", " +
                                                item.thana_upazila_id +
                                                ", " +
                                                item.union_ward_id +
                                                ", '" +
                                                item.geo_code +
                                                "', '" +
                                                item.geo_code_old +
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

                                        //alert("Thanaupazila Setup Synced");

                                    });

                                //console.log(vm.divisions);
                            };

                            var syncUnionWards = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/union-wards")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var sql_insert;
                                            sql_insert =
                                                "REPLACE INTO UNION_WARDS (ID, DIVISION_ID, DISTRICT_ID, THANA_UPAZILA_ID, GEO_CODE, GEO_CODE_OLD, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert +=
                                                " (" +
                                                item.id +
                                                ", " +
                                                item.division_id +
                                                ", " +
                                                item.district_id +
                                                ", " +
                                                item.thana_upazila_id +
                                                ", '" +
                                                item.geo_code +
                                                "', '" +
                                                item.geo_code_old +
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

                                        //alert("Thanaupazila Setup Synced");

                                    });

                                //console.log(vm.divisions);
                            };
                            var syncBsicSections = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bsic-sections")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name);
                                            var description = item.description;
                                            var description_bn = item.description_bn;
                                            console.log(description)
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO BSIC_SECTIONS (ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += "(" + item.id + ", '" + item.code + "', '" + name + "', '" + nameBn + "', '" + description + "', '" + description_bn + "', " + item.created_by + ", " + item.updated_by + ");";
                                            console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };

                            var syncBsicDivisions = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bsic-divisions")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name);
                                            var description = item.description;
                                            var description = description.replace(/\n/gm,"");
                                            var description_bn = item.description_bn;
                                            var description_bn = description_bn.replace(/\n/gm,"");
                                            console.log(description)
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO BSIC_PRODUCT_DIVISIONS (ID, SECTION_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += " (" + item.id + ", " + item.section_id + ", '" + item.code + "', '" + name + "', '" + nameBn + "', '" + description + "', '" + description_bn + "', " + item.created_by + ", " + item.updated_by + ");";
                                            //sql_insert = sql_insert.replace(/\n/gm,"");
                                            console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };

                            var syncBsicProductGroup = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bsic-product-groups")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name);
                                            var description = item.description;
                                           // var description = description.replace(/\n/gm,"");
                                            var description_bn = item.description_bn;
                                           // var description_bn = description_bn.replace(/\n/gm,"");
                                            //console.log(description)
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO BSIC_PRODUCT_DIVISIONS (ID, SECTION_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += " (" + item.id + ", " + item.section_id + ", '" + item.code + "', '" + name + "', '" + nameBn + "', '" + description + "', '" + description_bn + "', " + item.created_by + ", " + item.updated_by + ");";
                                            //sql_insert = sql_insert.replace(/\n/gm,"");
                                            //console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };

                            var syncBsicProductClass = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bsic-product-classes")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name);
                                            var description = item.description;
                                            // var description = description.replace(/\n/gm,"");
                                            var description_bn = item.description_bn;
                                            // var description_bn = description_bn.replace(/\n/gm,"");
                                            //console.log(description)
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO BSIC_PRODUCT_DIVISIONS (ID, SECTION_ID, PRODUCT_DIVISION_ID, PRODUCT_GROUP_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert +=
                                                " (" +
                                                item.id +
                                                ", " +
                                                item.section_id +
                                                ", " +
                                                item.product_division_id +
                                                ", " +
                                                item.product_group_id +
                                                ", '" +
                                                item.code +
                                                "', '" +
                                                name +
                                                "', '" +
                                                nameBn +
                                                "', '" +
                                                description +
                                                "', '" +
                                                description_bn +
                                                "', " +
                                                item.created_by +
                                                ", " +
                                                item.updated_by
                                                + ");";
                                            //sql_insert = sql_insert.replace(/\n/gm,"");
                                            //console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };

                            /*syncDivision(); //call syncDownSetup function;
                            alert("Division Setup Synced");
                            syncDistrict(); //call syncDownSetup function;
                            alert("District Setup Synced");
                            syncThanaUpazila(); //call syncDownSetup function;
                            alert("ThanaUpazila Setup Synced");
                            syncUnionWards(); //call syncDownSetup function;
                            alert("Union Ward Setup Synced");
                            syncMauzaMahallah(); //call syncDownSetup function;
                            alert("Mauza Mahallah Setup Synced");*/
                            syncBsicSections(); //call syncDownSetup function;
                            alert("BSIC Section Setup Synced");

                            //Basic Settings
                          /*  syncBsicSections(); //call syncDownSetup function;
                            alert("BSIC Section Setup Synced");
                            syncBsicDivisions(); //call syncDownSetup function;
                            alert("BSIC Division Setup Synced");
                            syncBsicProductGroup(); //call syncDownSetup function;
                            alert("BSIC Product Group Setup Synced");*/
                            //syncBsicProductClass(); //call syncDownSetup function;
                            //alert("BSIC Product Class Setup Synced");
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
