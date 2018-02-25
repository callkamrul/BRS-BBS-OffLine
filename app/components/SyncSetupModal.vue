<template>
<div>
	<div id="login-modal" class="ui small modal">
		<i class="close icon"></i>
		<div class="header">
			Login BRS_BBS
		</div>
		<div class="content">

			
			<form class="ui form">
  <div class="field two ">
    <label>User Name</label>
	<div class="two fields">
		<div class="field">
    <input type="text"  name="user_name" v-model="user_name" placeholder="Username">
		</div>
	</div>
  </div>
  <div class="field ">
    <label>Password</label>
	<div class="two fields">
		<div class="field">
    <input type="password"  name="password" v-model="password" placeholder="Password">
		</div>
	</div>
  </div>
  
  <button type="button" @click="authenticate" class="ui primary button">Login</button>
  <button type="button" class="ui secondary button" @click="loginClose">Cancel</button>
</form>

				
		
		</div>

	</div>
		
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
        .then(function(response) {
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
                .then(function(response) {
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
                .then(function() {
                  axios
                    .get("http://192.168.50.14/api/districts")
                    .then(function(response) {
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
                .then(function() {
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
        .catch(function(error) {
          console.log(error);
          alert("Error");
        });

      $("#login-modal").modal("hide");
    },
    loginClose() {
      $("#login-modal").modal("hide");
    },
    loginForm: function() {
      $("#login-modal").modal("show");
    }
  },

  mounted: function() {
    eventHub.$on("sync-setup", this.loginForm);
  },
  beforeDestroy: function() {
    eventHub.$off("sync-setup", this.loginForm);
  }
};
</script>
