<template src="./Census.html">

</template>

<script>

import store from "../store";
//import select2 from "./select2.vue";
//import vSelect from 'vue-select'


import SyncSetupModal from "./SyncSetupModal.vue";
import SyncCensusModal from "./SyncCensusModal.vue";
import eventHub from "../shared/EventHub";

export default {
  components: {
    SyncSetupModal,
    SyncCensusModal

  },
  data() {
    return {

      onLine: false,
      isEdit: false,
      selectedCensus: "",
      msg_division: "",
      msg_districts: "",
      msg_unionWards: "",
      msg_thanaUpazilla: '',
      msg_mauzaMahalla: '',
      msg_rmos: '',
      msg_serial_no_unit: '',
      msg_name_of_unit: '',
      msg_name_of_mahallah: '',
      msg_unit_type_code: '',
      census: {
        id: 0,
        DIVISION_ID: 0,
        DISTRICT_ID: 0,
        THANA_UPZ_ID: 0,
        WARD_UNION_ID: 0,
        MAHALLAH_ID: 0,
        RMO_CODE: 0,
        SERIAL_NO_UNIT: 0,
        NAME_OF_UNIT: "",
        NAME_OF_MAHALLAH: "",
        NAME_OF_HOUSE: "",
        NO_NAME_OF_ROAD: "",
        FLOOR_LEVEL: "",
        HOLIDING_NO: "",
        PHONE: "",
        FAX: "",
        EMAIL: "",
        WEBSITE: "",
        LEGAL_OWNERSHIP_CODE: 0,
        TYPE_OF_OWNERSHIP: 0,
        HEAD_GENDER_CODE: 0,
        HEAD_OF_UNIT_AGE: 0,
        HEAD_EDUCATION_CODE: 0,
        ENTERPRISE_GROUP_ID: ""
      },
      enableIsUnderEntGroup: true,
      enableEntGroup: true,
      enableIsUnderEnt: true,
      enableIsUnderEnt2: true,
      enableEntGroupId2: true,
      enableEnterprise: true,
      enableClosingReasonOther: true,
      rmos: [],

      rmos: [],
      divisions: [],
      all_districts: [],
      all_thanaUpazilla: [],
      all_unionWards: [],
      all_mauzaMahalla: [],
      all_HeadOfficedistricts: [],
      all_headOfficeThanaUpazilla: [],
      all_headOfficeUnionWards: [],
      all_headOfficeMauza: [],

        districts: [],
        thanaUpazilla: [],
        unionWards: [],
        mauzaMahalla: [],
        HeadOfficedistricts: [],
        headOfficeThanaUpazilla: [],
        headOfficeUnionWards: [],
        headOfficeMauza: []
    };
  },
  props: ["censuses"],

  filters: {
    ByDivision: function (districts,division_id) {
    	var division_id = division_id || this.census.division_id;
    	return this.districts.filter(district => district.division_id == division_id);
    }
  },
  mounted() {
      store.getDivisionList((err, list) => {
          this.divisions = list;
      });
      store.getDistrictList((err, list) => {
          this.all_districts = list;
          this.districts = list;
      });

      store.getThanaUpazillaByDistrict((err, thanaList) => {
        this.all_thanaUpazilla = thanaList;
        this.thanaUpazilla = thanaList;
      });
      store.getUnionWardByThanaUpazilla((err, unionList) => {
        this.all_unionWards = unionList;
        this.unionWards = unionList;

      });
      store.getMauzaMahallahByUnionWard((err, list) => {
        this.all_mauzaMahalla = list;
        this.mauzaMahalla = list;
      });
      /*store.getDistrictList((err, list) => {
        this.all_HeadOfficedistricts = list;
        this.HeadOfficedistricts = list;
      });
      store.getThanaUpazillaByDistrict((err, thanaList) => {
        this.all_headOfficeThanaUpazilla = thanaList;
        this.headOfficeThanaUpazilla = thanaList;
      });
      store.getUnionWardByThanaUpazilla((err, unionList) => {
        this.all_headOfficeUnionWards = unionList;
        this.headOfficeUnionWards = unionList;
      });
      store.getMauzaMahallahByUnionWard((err, list) => {
        this.all_headOfficeMauza = list;
        this.headOfficeMauza = list;
      });*/

    store.getAllCommonConfigList(
      (err, list) => {
        this.rmos = list;
      },
      "cc_rmo",
      "en"
    );
    store.getAllCommonConfigList((err, list) => {
      this.legal_ownerships = list;
    }, "CC_LEGAL_OWNERSHIPS");
    store.getAllCommonConfigList((err, list) => {
      this.type_of_ownerships = list;
    }, "CC_OWNERSHIP_TYPES");
    store.getAllCommonConfigList((err, list) => {
      this.genders = list;
    }, "CC_GENDER");
    store.getAllCommonConfigList((err, list) => {
      this.educations = list;
    }, "CC_EDUCATION");
    store.getAllCommonConfigList((err, list) => {
      this.unit_types = list;
    }, "CC_UNIT_TYPE");
    store.getAllCommonConfigList((err, list) => {
      this.permissionAuth = list;
    }, "CC_PERMISSION_AUTHORITIES");
    store.getAllCommonConfigList((err, list) => {
      this.pollutionControl = list;
    }, "cc_pollution_control");
    store.getAllCommonConfigList((err, list) => {
      this.specialtyCode = list;
    }, "cc_specialty_code");
    store.getAllCommonConfigList((err, list) => {
      this.unitCurrentStatus = list;
    }, "cc_unit_status");
    store.getAllCommonConfigList((err, list) => {
      this.closingReasons = list;
    }, "cc_closing_reasons");
    store.getIndustrialCode((err, list) => {
      this.industrialCode = list;
    });
    store.getIndustrialCode((err, list) => {
      this.productSubClassCode = list;
    }, "product_sub_classes");
    store.getAllCommonConfigList((err, list) => {
      this.economicOrgs = list;
    }, "cc_economic_organizations");
    store.getAllCommonConfigList((err, list) => {
      this.accountingType = list;
    }, "cc_accounting_type");
    store.getAllCommonConfigList((err, list) => {
      this.regOrgCode = list;
    }, "cc_registration_organizations");
    store.getAllCommonConfigList((err, list) => {
      this.unitMode = list;
    }, "cc_unit_mode");
    store.getAnswerOption((err, list) => {
      this.yesNo = list;
    }, "cc_answer_options");
    store.getAnswerOption(
      (err, list) => {
        this.yesNoOthers = list;
      },
      "cc_answer_options",
      1
    );
    this.updateOnlineStatus();
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  computed: {
    districtsByDivision: function() {
      var division_id = this.census.division_id;
      return this.districts.filter(
        district => district.division_id == division_id
      );
    }
  },
  methods: {
    updateOnlineStatus() {
      this.onLine = navigator.onLine;
    },
    backToList() {
      location.reload(true);
      this.isEdit = false;
    },

    addCensus() {
      this.census = {
        ID: 0,
        division_id: 0,
        district_id: 0,
        RMO_CODE: 0,
        serial_no_unit: "",
        NAME_OF_UNIT: "",
        name_of_mahallah: "",

        HEAD_OFFICE_DIVISION: 0,
        head_office_district: 0,
        CENSUS_YEAR: "2018",
        ENTERPRISE_GROUP_ID: ""
      };
      this.isEdit = true;
    },
    editCensus(CensusId) {
      this.census={}
      store.getCensus(CensusId, (err, Census) => {
        if (err) {
        } else {
          this.census = Census;
          this.isEdit = true;
          // Load address (division, district, thana list) in edit mode
            this.districts = this.all_districts.filter(f=>String(f.DIVISION_ID) == Census.DIVISION_ID);
            this.thanaUpazilla = this.all_thanaUpazilla.filter(f=>String(f.DISTRICT_ID) == Census.DISTRICT_ID);
            this.unionWards = this.all_unionWards.filter(f=>String(f.THANA_UPAZILA_ID) == Census.THANA_UPZ_ID);
            this.mauzaMahalla = this.all_mauzaMahalla.filter(f=>String(f.UNION_WARD_ID) == Census.WARD_UNION_ID);

//          store.getDistrictList((err, list) => {
//            this.districts = list;
//          }, Census.DIVISION_ID);
//          store.getThanaUpazillaByDistrict((err, thanaList) => {
//            this.thanaUpazilla = thanaList;
//          }, Census.DISTRICT_ID);
//          store.getUnionWardByThanaUpazilla((err, unionList) => {
//            this.unionWards = unionList;
//          }, Census.THANA_UPZ_ID);
//          store.getMauzaMahallahByUnionWard((err, list) => {
//            this.mauzaMahalla = list;
//          }, Census.WARD_UNION_ID);
          store.getDistrictList((err, list) => {
            this.HeadOfficedistricts = list;
          }, Census.HEAD_OFFICE_DIVISION);
          store.getThanaUpazillaByDistrict((err, thanaList) => {
            this.headOfficeThanaUpazilla = thanaList;
          }, Census.HEAD_OFFICE_DISTRICT);
          store.getUnionWardByThanaUpazilla((err, unionList) => {
            this.headOfficeUnionWards = unionList;
          }, Census.HEAD_OFFICE_THANA_UPZ);
          store.getMauzaMahallahByUnionWard((err, list) => {
            this.headOfficeMauza = list;
          }, Census.HEAD_OFFICE_WARD_UNION);
        }
      });
    },
    saveCensus(e) {
        this.msg_division = '';
        this.msg_districts = '';
        this.msg_unionWards = '';
        this.msg_thanaUpazilla = '';
        this.msg_mauzaMahalla = '';
        this.msg_rmos = '';
        this.msg_serial_no_unit = '';
        this.msg_name_of_unit = '';
        this.msg_name_of_mahallah = '';
        this.msg_unit_type_code = '';

       if (!this.census.DIVISION_ID || !this.census.DISTRICT_ID ||
           !this.census.THANA_UPZ_ID || !this.census.WARD_UNION_ID ||
           !this.census.MAHALLAH_ID || !this.census.RMO_CODE ||
           !this.census.SERIAL_NO_UNIT || !this.census.NAME_OF_UNIT ||
           !this.census.NAME_OF_MAHALLAH || !this.census.UNIT_TYPE_CODE) {

           if(!this.census.DIVISION_ID)
               this.msg_division = "This field is required.";
           if(!this.census.DISTRICT_ID)
               this.msg_districts = "This field is required.";
           if(!this.census.THANA_UPZ_ID)
               this.msg_thanaUpazilla = "This field is required.";
           if(!this.census.WARD_UNION_ID)
               this.msg_unionWards = "This field is required.";
           if(!this.census.MAHALLAH_ID)
               this.msg_mauzaMahalla = "This field is required.";
           if(!this.census.RMO_CODE)
               this.msg_rmos = "This field is required.";
           if(!this.census.SERIAL_NO_UNIT)
               this.msg_serial_no_unit = "This field is required.";
           if(!this.census.NAME_OF_UNIT)
               this.msg_name_of_unit = "This field is required.";
           if(!this.census.NAME_OF_MAHALLAH)
               this.msg_name_of_mahallah = "This field is required.";
           if(!this.census.UNIT_TYPE_CODE)
               this.msg_unit_type_code = "This field is required.";
           e.preventDefault();
           return false;
       }

      if (this.census.ID > 0) {
        store.editCensus(this.census.ID, this.census);
      } else {
        store.addCensus(this.census);
      }
      this.isEdit = false;
    },
    deleteCensus(CensusId) {
      if (confirm("Are you sure to delete this Census?")) {
        store.deleteCensus(CensusId);
      }
    },

    syncSetup() {
      eventHub.$emit("sync-setup");
    },
    syncCensus(census) {
      eventHub.$emit("sync-census",census);
    },
    loadDistricts: function() {
        this.census.DISTRICT_ID = 0;
        this.districts = this.all_districts.filter(f=>String(f.DIVISION_ID) == this.census.DIVISION_ID);
        //$('#division-id').val(this.census.DISTRICT_ID)
    },
    loadThanaUpazilla: function(e) {
        this.census.THANA_UPZ_ID = 0;
        this.thanaUpazilla = this.all_thanaUpazilla.filter(f=>String(f.DISTRICT_ID) == this.census.DISTRICT_ID);
        //$('#thana_upz_id').val(this.census.THANA_UPZ_ID)
    },
    loadUnionWard() {
        this.census.WARD_UNION_ID = 0;
        this.unionWards = this.all_unionWards.filter(f=>String(f.THANA_UPAZILA_ID) == this.census.THANA_UPZ_ID);
    },
      loadMauzaMahalla() {
          this.census.MAHALLAH_ID = 0;
          this.mauzaMahalla = this.all_mauzaMahalla.filter(f=>String(f.UNION_WARD_ID) == this.census.WARD_UNION_ID);

          /*this.mauzaMahalla = [];
          var unionWardId = this.census.WARD_UNION_ID;
          store.getMauzaMahallahByUnionWard((err, list) => {
              this.mauzaMahalla = list;
          }, unionWardId);*/
      },

    loadHeadOfficeDistricts() {
      this.HeadOfficedistricts = [];
      var division_id = this.census.HEAD_OFFICE_DIVISION;
      store.getDistrictList((err, list) => {
        this.HeadOfficedistricts = list;
      }, division_id);
    },
    loadHeadOfficeThana: function(e) {
        this.headOfficeThanaUpazilla = [];
      var district_id = this.census.HEAD_OFFICE_DISTRICT;
      store.getThanaUpazillaByDistrict((err, thanaList) => {
        this.headOfficeThanaUpazilla = thanaList;
      }, district_id);
    },
    loadHeadOfficeUnionWard() {
        this.headOfficeUnionWards = [];
      var thanaId = this.census.HEAD_OFFICE_THANA_UPZ;
      store.getUnionWardByThanaUpazilla((err, unionList) => {
        this.headOfficeUnionWards = unionList;
      }, thanaId);
    },
    loadHeadOfficeMauza() {
        this.headOfficeMauza = [];
      var unionWardId = this.census.HEAD_OFFICE_WARD_UNION;
      store.getMauzaMahallahByUnionWard((err, list) => {
        this.headOfficeMauza = list;
      }, unionWardId);
    },
    checkUnitType: function() {
      this.enableIsUnderEntGroup = true;
      this.enableIsUnderEnt = true;
      this.enableIsUnderEnt2 = true;
      var unit_type = this.census.UNIT_TYPE_CODE;
      if (unit_type == 1) {
        this.enableIsUnderEntGroup = false;
      }
      if (unit_type == 2) {
        this.enableIsUnderEnt = false;
        this.enableIsUnderEnt2 = false;
      }
    },
    checkIsUnderEntGroup: function() {
      var yesNo = this.census.IS_UNDER_ENT_GROUP;
      if (yesNo == 1) {
        this.enableEntGroup = false;
      } else {
        this.census.ENTERPRISE_GROUP_ID = "";
        this.enableEntGroup = true;
      }
    },
    checkIsEntGroup: function() {
      var yesNo = this.census.IS_UNDER_ENTERPRISE;
      if (yesNo == 1) {
        this.enableEnterprise = false;
      } else {
        this.census.ENTERPRISE_ID = "";
        this.enableEnterprise = true;
      }
    },
    checkIsEntGroupId2: function() {
      var yesNo = this.census.IS_UNDER_ENT_GROUP2;
      if (yesNo == 1) {
        this.enableEntGroupId2 = false;
      } else {
        this.census.ENTERPRISE_GROUP_ID_2 = "";
        this.enableEntGroupId2 = true;
      }
    },
    checkClosingReasonsOthers: function() {
      var reasons = this.census.REASON_OF_CLOSE_CODE;
      if (reasons == 13) {
        this.enableClosingReasonOther = false;
      } else {
        this.census.REASON_OF_CLOSE_OTHER = "";
        this.enableClosingReasonOther = true;
      }
    },

    checkUnitType: function() {
      this.enableIsUnderEntGroup = true;
      this.enableIsUnderEnt = true;
      this.enableIsUnderEnt2 = true;
      var unit_type = this.census.UNIT_TYPE_CODE;
      if (unit_type == 1) {
        this.enableIsUnderEntGroup = false;
      }
      if (unit_type == 2) {
        this.enableIsUnderEnt = false;
        this.enableIsUnderEnt2 = false;
      }
    },
    checkIsUnderEntGroup: function() {
      var yesNo = this.census.IS_UNDER_ENT_GROUP;
      if (yesNo == 1) {
        this.enableEntGroup = false;
      } else {
        this.census.ENTERPRISE_GROUP_ID = "";
        this.enableEntGroup = true;
      }
    },
    checkIsEntGroup: function() {
      var yesNo = this.census.IS_UNDER_ENTERPRISE;
      if (yesNo == 1) {
        this.enableEnterprise = false;
      } else {
        this.census.ENTERPRISE_ID = "";
        this.enableEnterprise = true;
      }
    },
    checkIsEntGroupId2: function() {
      var yesNo = this.census.IS_UNDER_ENT_GROUP2;
      if (yesNo == 1) {
        this.enableEntGroupId2 = false;
      } else {
        this.census.ENTERPRISE_GROUP_ID_2 = "";
        this.enableEntGroupId2 = true;
      }
    },
    upperCase: function(inputVal,e) {
        this.value = store.upperCase(inputVal);
    },
      checkForm:function(e) {
          if(this.census.DIVISION_ID) return true;
          this.errors = [];
          if(!this.census.DIVISION_ID) this.errors.push("Division required.");
         // if(!this.age) this.errors.push("Age required.");
          e.preventDefault();
      }
  }
};
</script>
