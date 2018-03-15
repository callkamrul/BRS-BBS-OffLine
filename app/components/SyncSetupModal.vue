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

                            // BSIC & BCPC settings
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
                                            var nameBn = String(item.name_bn);

											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }
                                            //console.log(description)
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO BSIC_SECTIONS (ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += "(" +
                                                item.id +
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
                                                item.updated_by +
                                                ");";
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
                                            var nameBn = String(item.name_bn);
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }

                                            var sql_insert;
                                            sql_insert = "REPLACE INTO BSIC_PRODUCT_DIVISIONS (ID, SECTION_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += " (" + item.id + ", " + item.section_id + ", '" + item.code + "', '" + name + "', '" + nameBn + "', '" + description + "', '" + description_bn + "', " + item.created_by + ", " + item.updated_by + ");";

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
                                            var nameBn = String(item.name_bn);
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO BSIC_PRODUCT_GROUPS (ID, SECTION_ID, PRODUCT_DIVISION_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += " (" + item.id + ", " + item.section_id + ", " + item.product_division_id + ", '" + item.code + "', '" + name + "', '" + nameBn + "', '" + description + "', '" + description_bn + "', " + item.created_by + ", " + item.updated_by + ");";
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
                                            var nameBn = String(item.name_bn);
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO BSIC_PRODUCT_CLASSES (ID, SECTION_ID, PRODUCT_DIVISION_ID, PRODUCT_GROUP_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
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
                                            //console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };

                            var syncBcpcSections = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bcpc-sections")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name_bn);

											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }
                                            //console.log(description)
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO SECTIONS (ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += "(" +
                                                item.id +
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
                                                item.updated_by +
                                                ");";
                                            console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };

                            var syncBcpcDivisions = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bcpc-divisions")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name_bn);
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }

                                            var sql_insert;
                                            sql_insert = "REPLACE INTO PRODUCT_DIVISIONS (ID, SECTION_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += " (" + item.id + ", " + item.section_id + ", '" + item.code + "', '" + name + "', '" + nameBn + "', '" + description + "', '" + description_bn + "', " + item.created_by + ", " + item.updated_by + ");";

                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };
                            var syncBcpcProductGroup = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bcpc-product-groups")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name_bn);
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO PRODUCT_GROUPS (ID, SECTION_ID, PRODUCT_DIVISION_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += " (" + item.id + ", " + item.section_id + ", " + item.product_division_id + ", '" + item.code + "', '" + name + "', '" + nameBn + "', '" + description + "', '" + description_bn + "', " + item.created_by + ", " + item.updated_by + ");";
                                            //sql_insert = sql_insert.replace(/\n/gm,"");
                                            //console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };
                            var syncBcpcProductClass = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bcpc-product-classes")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name_bn);
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO PRODUCT_CLASSES (ID, SECTION_ID, PRODUCT_DIVISION_ID, PRODUCT_GROUP_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, CREATED_BY, UPDATED_BY) VALUES ";
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
                                            //console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };
                            var syncBcpcProductSubClass = function () {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/bcpc-product-subclasses")
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var name = String(item.name);
                                            var nameBn = String(item.name_bn);
                                            name = name.replace(/'/g,"''");
                                            nameBn = nameBn.replace(/'/g,"''");
											/*
											 In the end of description or description_bn, a weired character like a checkbox or other false
											 character has been added automatically that causes an error in inserting data in sqlite database.
											 For removing false character, We remove last character from description or description_bn.
											 If anyone have time to analyse why these false character added, welcome to update this script
											 and apply better solution.
											 Here substr function takes string from 0 index to last index-1
											 In these moment, we have not any better solution other than this.
											 */
                                            var description = item.description;
                                            if (description && description.length > 1)
                                            {
                                                description = description.substr(0, description.length-1).replace(/'/g,"''");
                                            }
                                            var description_bn = item.description_bn;
                                            if (description_bn && description_bn.length > 1)
                                            {
                                                description_bn = description_bn.substr(0, description_bn.length-1).replace(/'/g,"''");
                                            }
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO PRODUCT_SUB_CLASSES (ID, SECTION_ID, PRODUCT_DIVISION_ID, PRODUCT_GROUP_ID, PRODUCT_CLASS_ID, CODE, NAME, NAME_BN, DESCRIPTION, DESCRIPTION_BN, HS_CODE, BSIC_PRODUCT_CLASS_ID, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert +=
                                                " (" +
                                                item.id +
                                                ", " +
                                                item.section_id +
                                                ", " +
                                                item.product_division_id +
                                                ", " +
                                                item.product_group_id +
                                                ", " +
                                                item.product_class_id +
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
                                                "', '" +
                                                item.hs_code +
                                                "', " +
                                                item.bsic_product_class_id +
                                                ", " +
                                                item.created_by +
                                                ", " +
                                                item.updated_by
                                                + ");";
                                            //console.log(sql_insert);
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };
                            // Common Configs
                            var syncCommonConfig = function (table_name) {
                                // alert("syncDistrict");
                                //var vm = this
                                return axios
                                    .get("http://192.168.50.14/api/cc-list/" + table_name)
                                    .then(function (response) {
                                        //db.run("DELETE FROM THANA_UPAZILAS");
                                        var items = response.data;
                                        for (var prop in items) {
                                            //console.log(items[prop]);
                                            var item = items[prop];
                                            var sql_insert;
                                            sql_insert = "REPLACE INTO " + table_name + " (ID, CODE, NAME, NAME_BN, WEIGHT, IS_DEFAULT, IS_ACTIVE, CREATED_BY, UPDATED_BY) VALUES ";
                                            sql_insert += "(" + item.id + ", '" + item.code + "', '" + item.name + "', '" + item.name_bn + "', " + item.weight + ", " + item.is_default + ", " + item.is_active + ", " + item.created_by + ", " + item.updated_by + ");";
                                            db.run(sql_insert);
                                            sql_insert = "";
                                        }

                                    });

                                //console.log(vm.divisions);
                            };

                            syncDivision(); //call syncDownSetup function;
                            alert("Division Setup Synced");
                            syncDistrict(); //call syncDownSetup function;
                            alert("District Setup Synced");
                            syncThanaUpazila(); //call syncDownSetup function;
                            alert("ThanaUpazila Setup Synced");
                            syncUnionWards(); //call syncDownSetup function;
                            alert("Union Ward Setup Synced");
                            syncMauzaMahallah(); //call syncDownSetup function;
                            alert("Mauza Mahallah Setup Synced");

                            //Bsic Settings
                            syncBsicSections(); //call syncDownSetup function;
                            alert("BSIC Section Setup Synced");
                            syncBsicDivisions(); //call syncDownSetup function;
                            alert("BSIC Division Setup Synced");
                            syncBsicProductGroup(); //call syncDownSetup function;
                            alert("BSIC Product Group Setup Synced");
                            syncBsicProductClass(); //call syncDownSetup function;
                            alert("BSIC Product Class Setup Synced");
                            // BCPC settings
                            syncBcpcSections(); //call syncDownSetup function;
                            alert("BCPC Section Setup Synced");
                            syncBcpcDivisions();
                            alert("BCPC Division Setup Synced");
                            syncBcpcProductGroup();
                            alert("BCPC Product Group Setup Synced");
                            syncBcpcProductClass();
                            alert("BCPC Product Class Setup Synced");
                            syncBcpcProductSubClass();
                            alert("BCPC Product Sub Class Setup Synced");

                            // Common Configs. Only add common config table name in commonConfigs object then it automatically sync up.
                            // No need to add extra code.
                            var commonConfigs = {
                                AnswerOptions:"CC_ANSWER_OPTIONS",
                                PERMISSION_AUTHORITIES:"CC_PERMISSION_AUTHORITIES",
                                CLOSING_REASONS:"CC_CLOSING_REASONS",
                                EDUCATION:"CC_EDUCATION",
                                ECONOMIC_ORGANIZATIONS:"CC_ECONOMIC_ORGANIZATIONS",
                                GENDER:"CC_GENDER",
                                LEGAL_OWNERSHIPS:"CC_LEGAL_OWNERSHIPS",
                                POLLUTION_CONTROL:"CC_POLLUTION_CONTROL",
                                RMO:"CC_RMO",
                                REGISTRATION_ORGANIZATIONS:"CC_REGISTRATION_ORGANIZATIONS",
                                SPECIALTY_CODE:"CC_SPECIALTY_CODE",
                                TRADE_LICENSE_AUTHORITY:"CC_TRADE_LICENSE_AUTHORITY",
                                OWNERSHIP_TYPES:"CC_OWNERSHIP_TYPES",
                                UNIT_MODE:"CC_UNIT_MODE",
                                UNIT_STATUS:"CC_UNIT_STATUS",
                                UNIT_TYPE:"CC_UNIT_TYPE"
                            };
                            var cConfig;
                            for (cConfig in commonConfigs){
                                syncCommonConfig(commonConfigs[cConfig]);
                                alert(cConfig + " Setup Synced");
                            }

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
