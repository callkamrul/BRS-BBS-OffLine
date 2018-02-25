<template>
<div>
	<div id="sync-census-modal" class="ui small modal">
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
  
  <button type="button" @click="authenticateThenSyncCensus" class="ui primary button">Login</button>
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
        .then(function(response) {
          //this.users =response;

          // console.log(response.token);
          // return 0;
          if (response.status == 200) {
            //console.log(response.data.token);

            var syncCensus = function(token) {
              var auth_obj = token;
              console.log(auth_obj);
              console.log(census);
              

              alert("sync CensusId");
              return 0;

              axios
                .post("http://192.168.50.14/api/offline/census", census)
                .then(function(response) {
                  //console.log(response);

                  if (response.status == 200) {
                    console.log(response);
                  } else {
                    alert(response.token);
                    return 0;
                  }
                })
                .catch(function(error) {
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
        .catch(function(error) {
          console.log(error);
          alert("Error");
        });

      $("#sync-census-modal").modal("hide");
    },
    loginClose() {
      $("#sync-census-modal").modal("hide");
    },
    loginForm2(census) {
      this.census = census;
      $("#sync-census-modal").modal("show");
    }
  },

  mounted: function() {
    eventHub.$on("sync-census", this.loginForm2);
  },
  beforeDestroy: function() {
    eventHub.$off("sync-census", this.loginForm2);
  }
};
</script>
