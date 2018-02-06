<template src="./Census.html">
</template>

<script>
import store from "../store";
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
        HEAD_EDUCATION_CODE:0

      },
      rmos:[],
      divisions: [],
      districts: [
        {
          id: 1,
          division_id: 1,
          name: "Faridfur"
        },
        {
          id: 2,
          division_id: 1,
          name: "Gazipur"
        },
        {
          id: 3,
          division_id: 2,
          name: "Naogaon"
        },
        {
          id: 4,
          division_id: 2,
          name: "Chapai Nawabganj"
        },
        {
          id: 5,
          division_id: 3,
          name: "Comilla"
        },
        {
          id: 6,
          division_id: 3,
          name: "Cox's Bazar"
        },
        {
          id: 7,
          division_id: 3,
          name: "Bandarban"
        }
      ]
    };
  },
  props: ["censuses"],
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
        CENSUS_YEAR: "2018"
      };
      this.isEdit = true;
    },
    editCensus(CensusId) {
      store.getCensus(CensusId, (err, Census) => {
        if (err) {
        } else {
          this.census = Census;
          this.isEdit = true;
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
    syncDownSetup() {
      alert('test');
    },
    syncUpCensus(CensusID) {
      if (confirm("Are you sure to Sync this Census?")) {
        alert('ok');
      }
    }
  }
};
</script>
