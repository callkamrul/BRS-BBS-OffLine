<template src="./Census.html">

</template>

<script>
import store from "../store";
import LoginModal from './LoginModal.vue'
import eventHub from "../shared/EventHub";

export default {
  data() {
    return {
      fakeVar: "",
      isEdit: false,
      selectedCensus: "",
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
        LEGAL_OWNERSHIP_CODE:0,
        TYPE_OF_OWNERSHIP:0,
        HEAD_GENDER_CODE:0,
        HEAD_OF_UNIT_AGE:0,
        HEAD_EDUCATION_CODE:0,
        ENTERPRISE_GROUP_ID:""
      },
      enableIsUnderEntGroup: true,
      enableEntGroup: true,
      enableIsUnderEnt: true,
      enableIsUnderEnt2: true,
      enableEntGroupId2: true,
      enableEnterprise: true,
      rmos:[],
      divisions: [],
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
  components:{
		LoginModal
	},
  filters: {
    //filterDistrictsByDivision: function (division_id) {
    //	var division_id = division_id || this.census.division_id;
    //	return this.districts.filter(district => district.division_id == division_id);
    //}
  },
  mounted() {
    store.getDivisionList((err, list) => { this.divisions = list});
    store.getAllCommonConfigList((err, list) => { this.rmos = list}, 'cc_rmo');
    store.getAllCommonConfigList((err, list) => { this.legal_ownerships = list}, 'CC_LEGAL_OWNERSHIPS');
    store.getAllCommonConfigList((err, list) => { this.type_of_ownerships = list}, 'CC_OWNERSHIP_TYPES');
    store.getAllCommonConfigList((err, list) => { this.genders = list}, 'CC_GENDER');
    store.getAllCommonConfigList((err, list) => { this.educations = list}, 'CC_EDUCATION');
    store.getAllCommonConfigList((err, list) => { this.unit_types = list}, 'CC_UNIT_TYPE');
    store.getAllCommonConfigList((err, list) => { this.permissionAuth = list}, 'CC_PERMISSION_AUTHORITIES');
    store.getAllCommonConfigList((err, list) => { this.pollutionControl = list}, 'cc_pollution_control');
    store.getAllCommonConfigList((err, list) => { this.specialtyCode = list}, 'cc_specialty_code');
    store.getAllCommonConfigList((err, list) => { this.unitCurrentStatus = list}, 'cc_unit_status');
    store.getAllCommonConfigList((err, list) => { this.closingReasons = list}, 'cc_closing_reasons');
    store.getIndustrialCode((err, list) => { this.industrialCode = list});
    store.getIndustrialCode((err, list) => { this.productSubClassCode = list}, 'product_sub_classes');
    store.getAllCommonConfigList((err, list) => { this.economicOrgs = list}, 'cc_economic_organizations');
    store.getAllCommonConfigList((err, list) => { this.accountingType = list}, 'cc_accounting_type');

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
    backToList() {
      this.isEdit = false;
    },
    addCensus() {
      this.census = {
        ID: 0,
        division_id: 0,
        district_id: 0,
        RMO_CODE:0,
        serial_no_unit:"",
        NAME_OF_UNIT: "",
        name_of_mahallah: "",

        HEAD_OFFICE_DIVISION: 0,
        head_office_district: 0,
        CENSUS_YEAR: "2018",
        ENTERPRISE_GROUP_ID:""
      };
      this.isEdit = true;
    },
    editCensus(CensusId) {
      store.getCensus(CensusId, (err, Census) => {
        if (err) {
        } else {
          this.census = Census;
          this.isEdit = true;
          // Load address (division, district, thana list) in edit mode
          store.getDistrictList((err, list ) => { this.districts = list}, Census.DIVISION_ID);
          store.getThanaUpazillaByDistrict((err, thanaList ) => { this.thanaUpazilla = thanaList}, Census.DISTRICT_ID);
          store.getUnionWardByThanaUpazilla((err, unionList ) => { this.unionWards = unionList}, Census.THANA_UPZ_ID);
          store.getMauzaMahallahByUnionWard((err, list ) => { this.mauzaMahalla = list}, Census.WARD_UNION_ID);
          store.getDistrictList((err, list ) => { this.HeadOfficedistricts = list}, Census.HEAD_OFFICE_DIVISION);
          store.getThanaUpazillaByDistrict((err, thanaList ) => { this.headOfficeThanaUpazilla = thanaList}, Census.HEAD_OFFICE_DISTRICT);
          store.getUnionWardByThanaUpazilla((err, unionList ) => { this.headOfficeUnionWards = unionList}, Census.HEAD_OFFICE_THANA_UPZ);
          store.getMauzaMahallahByUnionWard((err, list ) => { this.headOfficeMauza = list}, Census.HEAD_OFFICE_WARD_UNION);
        }
      });
    },
    saveCensus() {
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

     loginApp() {
      eventHub.$emit('login-form')
    },
   
    syncDownSetup() {
      
      //var vm = this
      axios.get('http://192.168.50.14/api/divisions')
        .then(function (response) {
          db.run("DELETE FROM DIVISIONS");
          var items = response.data;
          for (var prop in items) {
              //console.log(items[prop]);
              var item =items[prop];
              var sql_insert;
              sql_insert ="INSERT INTO DIVISIONS (ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
              sql_insert += " ("+item.id+", '"+item.geo_code+"', '"+item.name+"', '"+item.name_bn+"', "+item.created_by+", "+item.updated_by+");";
              db.run(sql_insert);
              sql_insert ="";
          }
        })

        axios.get('http://192.168.50.14/api/districts')
        .then(function (response) {
          db.run("DELETE FROM DISTRICTS");
          var items = response.data;
          for (var prop in items) {
              //console.log(items[prop]);
              var item =items[prop];
              var sql_insert;
              sql_insert ="INSERT INTO DISTRICTS (ID, DIVISION_ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
              sql_insert += " ("+item.id+", "+item.division_id+", '"+item.geo_code+"', '"+item.name+"', '"+item.name_bn+"', "+item.created_by+", "+item.updated_by+");";
              db.run(sql_insert);
              sql_insert ="";
          }
        })

        alert('Setup Sync Done');

        //console.log(vm.divisions);
    },
    syncUpCensus(CensusID) {
      if (confirm("Are you sure to Sync this Census?")) {
        alert('ok');
      }
    },
    loadDistricts() {
        var division_id = this.census.DIVISION_ID;
        store.getDistrictList((err, list ) => { this.districts = list}, division_id);
    },
    loadThanaUpazilla: function(e) {
      var district_id = this.census.DISTRICT_ID;
      store.getThanaUpazillaByDistrict((err, thanaList ) => { this.thanaUpazilla = thanaList}, district_id);
   },
   loadUnionWard() {
        var thanaId = this.census.THANA_UPZ_ID;
        store.getUnionWardByThanaUpazilla((err, unionList ) => { this.unionWards = unionList}, thanaId);
    },
     loadMauzaMahalla() {
        var unionWardId = this.census.WARD_UNION_ID;
        store.getMauzaMahallahByUnionWard((err, list ) => { this.mauzaMahalla = list}, unionWardId);
    },
     loadHeadOfficeDistricts() {
        var division_id = this.census.HEAD_OFFICE_DIVISION;
        store.getDistrictList((err, list ) => { this.HeadOfficedistricts = list}, division_id);
     },
      loadHeadOfficeThana: function(e) {
          var district_id = this.census.HEAD_OFFICE_DISTRICT;
          store.getThanaUpazillaByDistrict((err, thanaList ) => { this.headOfficeThanaUpazilla = thanaList}, district_id);
      },
      loadHeadOfficeUnionWard() {
          var thanaId = this.census.HEAD_OFFICE_THANA_UPZ;
          store.getUnionWardByThanaUpazilla((err, unionList ) => { this.headOfficeUnionWards = unionList}, thanaId);
      },
      loadHeadOfficeMauza() {
          var unionWardId = this.census.HEAD_OFFICE_WARD_UNION;
          store.getMauzaMahallahByUnionWard((err, list ) => { this.headOfficeMauza = list}, unionWardId);
      },
      checkUnitType: function () {
          this.enableIsUnderEntGroup= true;
          this.enableIsUnderEnt= true;
          this.enableIsUnderEnt2= true;
          var unit_type = this.census.UNIT_TYPE_CODE;
          if(unit_type == 1){
              this.enableIsUnderEntGroup= false;
          }
          if(unit_type == 2){
              this.enableIsUnderEnt= false;
              this.enableIsUnderEnt2= false;
          }
      },
      checkIsUnderEntGroup: function () {
          var yesNo = this.census.IS_UNDER_ENT_GROUP;
          if(yesNo == 1){
              this.enableEntGroup= false;
          }else {
              this.census.ENTERPRISE_GROUP_ID= "";
              this.enableEntGroup= true;
          }
      },
      checkIsEntGroup: function () {
          var yesNo = this.census.IS_UNDER_ENTERPRISE;
          if(yesNo == 1){
              this.enableEnterprise= false;
          }else {
              this.census.ENTERPRISE_ID= "";
              this.enableEnterprise= true;
          }
      },
      checkIsEntGroupId2: function () {
          var yesNo = this.census.IS_UNDER_ENT_GROUP2;
          if(yesNo == 1){
              this.enableEntGroupId2= false;
          }else {
              this.census.ENTERPRISE_GROUP_ID_2= "";
              this.enableEntGroupId2= true;
          }
      }
  }
};
</script>
