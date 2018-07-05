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
        //$('#loader').text('Loading........');
        $('#loader').html("<div class='loading'> <div align='center' class='loader'></div> </div>");
      var user_name = this.user_name;
      var password = this.password;
      var census = this.census;
        //console.log(census);

      axios
        .post("http://192.168.50.14/api/signin", {
          user_name: user_name,
          password: password
        })
        .then(function(response) {
          if (response.status == 200) {

            var syncCensus = function(token) {
              var auth_obj = token;

              //Validate
              if (census.DIVISION_ID != auth_obj.division_id) {
                alert("Division not matched.");
                  $('#loader').html('');
                return 0;
              }

              if (census.DISTRICT_ID != auth_obj.district_id) {
                alert("District not matched.");
                  $('#loader').html('');
                return 0;
              }
                if (census.THANA_UPZ_ID != auth_obj.thana_upazila_id) {
                    alert("Thana/Upazila not matched.");
                    $('#loader').html('');
                    return 0;
                }
                if (census.WARD_UNION_ID != auth_obj.union_ward_id) {
                    alert("Union/Ward not matched.");
                    $('#loader').html('');
                    return 0;
                }


              census.api_mode = "api";
              census.offline_user_id = auth_obj.id;
              census.offline_office_id = auth_obj.office_id;
              census.offline_user_desg_id = auth_obj.designation_id;

              axios
                .post("http://192.168.50.14/api/offline/census", census)
                .then(function(response) {
                  //console.log(response);

                  if (response.status == 200) {
                    var sql = `UPDATE CENSUS SET SERVER_ID = ${response.data.id }, UNIT_IDENTIFICATION_CODE = "${response.data.unit_identification_code}" WHERE ID=${census.ID}`;
                      db.run(sql);
                  // Through Success message
                      alert("Data has been synced successfully.")
                  } else {
                    alert(response.token);
                    return 0;
                  }
                })
                .catch(function(error) {
                  alert("Error in data syncing");
                });
                $('#loader').html('');
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
            $('#loader').html('');
        });

      $("#login-modal-syncup").modal("hide");
    },
    loginClose() {
      $("#login-modal-syncup").modal("hide");
    },
    loginForm2(CensusId) {
        this.census = {};
        store.getCensus(CensusId, (err, Census) => {
            if (err) {
            } else {
                this.census = Census;
            }
        });
      //this.census = census;
      //console.log(census);
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
