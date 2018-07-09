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
                isSuccess: false,
                isCity: false,
                isHeadOfficePouro: false,
                isHeadOfficeCity: false,
                isPouro: false,
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
                msg_provider_nid: '',
                msg_collector_nid: '',
                census: {
                    id: 0,
                    DIVISION_ID: 0,
                    DISTRICT_ID: 0,
                    THANA_UPZ_ID: 0,
                    WARD_UNION_ID: 0,
                    MAHALLAH_ID: 0,
                    HEAD_OFFICE_PAURASHAVA_ID: 0,
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
                enableDisableHOName: false,
                enableDisableHOMahallah: false,
                enableDisableHOHouse: false,
                enableDisableHORoad: false,
                enableDisableHOFloor: false,
                enableDisableHOHolding: false,
                enableDisableHOPhone: false,
                enableDisableHOFax: false,
                enableDisableHOEmail: false,
                enableDisableHOWebsite: false,
                enableDisableHODivision: false,
                enableDisableHODistrict: false,
                enableDisableHOCity: false,
                enableDisableHOThana: false,
                enableDisableHOPourasabha: false,
                enableDisableHOWardUnion: false,
                enableDisableHOMauza: false,
                enableDisableHORmo: false,
                enableDisableHOLocation: false,
                enableDisableTradeLicenseAuth: false,
                isTradeLicense: false,
                TRADE_LICENSE_NUMBER: false,
                isRegistered: true,
                hasPermission: true,
                hasEnvCtrl: true,
                hasSpZone: true,
                hasMembership: true,
                isSpecificLegalOwnership: false,
                hasChamberMembership: true,
                isUnitStatusClosed: true,
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
                city_corporation: [],
                headOfficeCityCorporation: [],
                pourosabha: [],
                headOfficeUnionWards: [],
                headOfficeMauza: [],
                headOfficePourosabha: []
            };
        },
        props: ["censuses"],

        filters: {
            ByDivision: function (districts, division_id) {
                var division_id = division_id || this.census.division_id;
                return this.districts.filter(district => district.division_id == division_id);
            }
        },
        mounted() {
            store.getDivisionList((err, list) => {
                this.divisions = list;
            });

            this.updateOnlineStatus();
            window.addEventListener("online", this.updateOnlineStatus);
            window.addEventListener("offline", this.updateOnlineStatus);
        },
        computed: {
            districtsByDivision: function () {
                var division_id = this.census.division_id;
                return this.districts.filter(
                    district => district.division_id == division_id
                );
            },
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
                this.setAllCommonConfigList();
                var selectDropDown = $(".select").select2({
                    placeholder: "Select",
                    allowClear: true
                });
                selectDropDown.on('select2:select', function (e) {
                    var event = new Event('change');
                    e.target.dispatchEvent(event);
                });

                $('.select-size-xs').select2({
                    containerCssClass: 'select-xs',
                    placeholder: "Select",
                    allowClear: true
                });

                $('.select2-sm').select2({
                    containerCssClass: 'select2-sm',
                    placeholder: "Select",
                    allowClear: true
                });

                $('.select2-md').select2({
                    containerCssClass: 'select2-md',
                    placeholder: "Select",
                    allowClear: true
                });

                $('.select2-lg').select2({
                    containerCssClass: 'select2-lg',
                    placeholder: "Select",
                    allowClear: true
                });
            },
            editCensus(CensusId) {
                this.census = {}
                store.getCensus(CensusId, (err, Census) => {
                    if (err) {
                    } else {
                        this.census = Census;
                        this.isEdit = true;
                        if(Census.LOCATION_TYPE_ID == 1){
                            this.isCity = true;
                            Census.CITY_CORP_ID = Census.CITY_CORP_PAURASAVA_ID;
                            store.getCityCorporationPourosabhaByDistrict((err, cityCorpList) => {
                                this.city_corporation = cityCorpList;
                            }, Census.DISTRICT_ID,1);

                        } else if(Census.LOCATION_TYPE_ID == 2) {
                            this.isPouro = true;
                            Census.PAURASHAVA_ID = Census.CITY_CORP_PAURASAVA_ID;
                            store.getCityCorporationPourosabhaByDistrict((err, cityCorpList) => {
                                this.pourosabha = cityCorpList;
                            }, Census.THANA_UPZ_ID, 2);
                        }
                        if(Census.HEAD_OFFICE_LOCATION_TYPE_ID == 1){
                            this.isHeadOfficeCity = true;
                            Census.HEAD_OFFICE_CITY_CORP_ID = Census.HEAD_OFFICE_CITY_CORP_PAURASAV;
                            store.getCityCorporationPourosabhaByDistrict((err, cityCorpList) => {
                                this.headOfficeCityCorporation = cityCorpList;
                            }, Census.HEAD_OFFICE_DISTRICT,1);

                        } else if(Census.HEAD_OFFICE_LOCATION_TYPE_ID == 2) {
                            this.isHeadOfficePouro = true;
                            Census.HEAD_OFFICE_PAURASHAVA_ID = Census.HEAD_OFFICE_CITY_CORP_PAURASAV;
                            store.getCityCorporationPourosabhaByDistrict((err, cityCorpList) => {
                                this.headOfficePourosabha = cityCorpList;
                            }, Census.HEAD_OFFICE_THANA_UPZ, 2);
                        }

                        if(this.census.UNIT_MODE_CODE == 1 || this.census.UNIT_MODE_CODE == 6){

                            //disableHeadOfficeAddress
                            this.enableDisableHOName = true;
                            this.enableDisableHOMahallah = true;
                            this.enableDisableHOHouse = true;
                            this.enableDisableHORoad = true;
                            this.enableDisableHOFloor = true;
                            this.enableDisableHOHolding = true;
                            this.enableDisableHOPhone = true;
                            this.enableDisableHOFax = true;
                            this.enableDisableHOEmail = true;
                            this.enableDisableHOWebsite = true;
                            this.enableDisableHODivision = true;
                            this.enableDisableHODistrict = true;
                            this.enableDisableHOLocation = true;
                            this.enableDisableHOCity = true;
                            this.enableDisableHOThana = true;
                            this.enableDisableHOPourasabha = true;
                            this.enableDisableHOWardUnion = true;
                            this.enableDisableHOMauza = true;
                            this.enableDisableHORmo = true;

                        }

                        if(Census.HAS_TRADE_LICENSE == 2){
                            this.enableDisableTradeLicenseAuth = true;
                            this.enableDisableTradeLicenseNumber = true;
                        }

                        // enable question 11.1 & 11.2 if question 11 is yes
                        if(Census.IS_REGISTERED == 1){
                            this.isRegistered = false;
                        }
                        // enable question 12.1 & 12.2 if question 12 is yes
                        if(Census.IS_UNDER_PERMISSION_AUTH == 1){
                            this.hasPermission = false;
                        }
                        // enable question 13.1 if question 13 is yes
                        if(Census.HAS_ENVIRONMENTAL_CONTROL == 1){
                            this.hasEnvCtrl = false;
                        }

                        // enable question 14.1 if question 14 is yes
                        if(Census.HAS_SPECIALIZED_ZONE == 1){
                            this.hasSpZone = false;
                        }


                        if(Census.HAS_MEMBERSHIP == 1){
                            this.hasMembership = false;
                        }
                        if(Census.HAS_CHAMBER_MEMBERSHIP == 1){
                            this.hasChamberMembership = false;
                        }

                        // Disable question 5, 10, 35.1 & 35.2 if code of question 3 is 6,7,8
                        var ownership = Census.LEGAL_OWNERSHIP_CODE;
                        if(ownership == 5 || ownership == 6 || ownership == 7){

                            this.isSpecificLegalOwnership = true;
                            this.isTradeLicense = true;
                            this.enableDisableTradeLicenseAuth = true;
                            this.enableDisableTradeLicenseNumber = true;

                        } else if(ownership == 1) {
                            this.isTradeLicense = true;
                            this.enableDisableTradeLicenseAuth = true;
                            this.enableDisableTradeLicenseNumber = true;
                        }

                        // Enable question 6.2 if  code of question 6 is 1
                        // or enable question 6.3,6.4 if code of question 6 is 2
                        var unit_type = Census.UNIT_TYPE_CODE;
                        if (unit_type == 1) {
                            this.enableIsUnderEntGroup = false;
                        }
                        if (unit_type == 2) {
                            this.enableIsUnderEnt = false;
                            this.enableIsUnderEnt2 = false;
                        }

                        // Enable question
                        var yesNo = Census.IS_UNDER_ENT_GROUP2;
                        if (yesNo == 1) {
                            this.enableEntGroupId2 = false;
                        }

                        if (Census.IS_UNDER_ENT_GROUP == 1) {
                            this.enableEntGroup = false;
                        }


                        if(Census.CURRENT_STATUS_OF_UNIT == 2 || Census.CURRENT_STATUS_OF_UNIT == 3 || Census.CURRENT_STATUS_OF_UNIT == 4){
                            this.isUnitStatusClosed = false;
                        }

                        // Load address (division, district, thana list) in edit mode
                        this.districts = this.all_districts.filter(f => String(f.DIVISION_ID) == Census.DIVISION_ID);
                        this.thanaUpazilla = this.all_thanaUpazilla.filter(f => String(f.DISTRICT_ID) == Census.DISTRICT_ID);
                        this.unionWards = this.all_unionWards.filter(f => String(f.THANA_UPAZILA_ID) == Census.THANA_UPZ_ID);
                        this.mauzaMahalla = this.all_mauzaMahalla.filter(f => String(f.UNION_WARD_ID) == Census.WARD_UNION_ID);

                        this.setAllCommonConfigList();
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


                        store.getDistrictList((err, list) => {
                            this.districts = list;
                        },Census.DIVISION_ID);

                        store.getThanaUpazillaByDistrict((err, thanaList) => {
                            this.thanaUpazilla = thanaList;
                        },Census.DISTRICT_ID);
                        store.getUnionWardByThanaUpazilla((err, unionList) => {
                            this.unionWards = unionList;
                        },Census.THANA_UPZ_ID);
                        store.getMauzaMahallahByUnionWard((err, list) => {
                            this.mauzaMahalla = list;
                        },Census.WARD_UNION_ID);

                    }
                });
                setTimeout(function () {
                    $('#census-form-container').floatingScroll();

                    var selectDropDown = $(".select").select2({
                        placeholder: "Select",
                        allowClear: true
                    });
                    selectDropDown.on('select2:select', function (e) {
                        var event = new Event('change');
                        e.target.dispatchEvent(event);
                    });
                    $('.select-size-xs').select2({
                        containerCssClass: 'select-xs',
                        placeholder: "Select",
                        allowClear: true
                    });

                    $('.select2-sm').select2({
                        containerCssClass: 'select2-sm',
                        placeholder: "Select",
                        allowClear: true
                    });

                    $('.select2-md').select2({
                        containerCssClass: 'select2-md',
                        placeholder: "Select",
                        allowClear: true
                    });

                    $('.select2-lg').select2({
                        containerCssClass: 'select2-lg',
                        placeholder: "Select",
                        allowClear: true
                    });

                }, 5000);
            },
            saveCensus(e) {
                this.msg_division = '';
                this.msg_districts = '';
                this.msg_location_type = '';
                this.msg_unionWards = '';
                this.msg_thanaUpazilla = '';
                this.msg_mauzaMahalla = '';
                this.msg_rmos = '';
                this.msg_serial_no_unit = '';
                this.msg_name_of_unit = '';
                this.msg_name_of_mahallah = '';
                this.msg_unit_type_code = '';
                this.msg_provider_nid = '';
                this.msg_collector_nid = '';

                if( this.census.PROVIDER_NID && this.census.PROVIDER_NID.length != 10 && this.census.PROVIDER_NID.length != 13 && this.census.PROVIDER_NID.length != 17){
                    this.msg_provider_nid = "Only 10 or 13 or 17 characters are accepted"
                }
                if(this.census.COLLECTOR_NID && this.census.COLLECTOR_NID.length != 10 && this.census.COLLECTOR_NID.length != 13 && this.census.COLLECTOR_NID.length != 17){
                    this.msg_collector_nid = "Only 10 or 13 or 17 characters are accepted"
                }

                if (!this.census.DIVISION_ID || !this.census.DISTRICT_ID ||
                    !this.census.THANA_UPZ_ID || !this.census.WARD_UNION_ID ||
                    !this.census.MAHALLAH_ID || !this.census.RMO_CODE ||
                    !this.census.SERIAL_NO_UNIT || !this.census.NAME_OF_UNIT ||
                    !this.census.NAME_OF_MAHALLAH || !this.census.UNIT_TYPE_CODE ||
                    !this.census.LOCATION_TYPE_ID ||
                    this.msg_provider_nid || this.msg_collector_nid) {

                    if (!this.census.DIVISION_ID)
                        this.msg_division = "This field is required.";
                    if (!this.census.DISTRICT_ID)
                        this.msg_districts = "This field is required.";
                    if (!this.census.LOCATION_TYPE_ID)
                        this.msg_location_type = "This field is required.";
                    if (!this.census.THANA_UPZ_ID)
                        this.msg_thanaUpazilla = "This field is required.";
                    if (!this.census.WARD_UNION_ID)
                        this.msg_unionWards = "This field is required.";
                    if (!this.census.MAHALLAH_ID)
                        this.msg_mauzaMahalla = "This field is required.";
                    if (!this.census.RMO_CODE)
                        this.msg_rmos = "This field is required.";
                    if (!this.census.SERIAL_NO_UNIT)
                        this.msg_serial_no_unit = "This field is required.";
                    if (!this.census.NAME_OF_UNIT)
                        this.msg_name_of_unit = "This field is required.";
                    if (!this.census.NAME_OF_MAHALLAH)
                        this.msg_name_of_mahallah = "This field is required.";
                    if (!this.census.UNIT_TYPE_CODE)
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
                this.isSuccess = true;

                setTimeout(function() {
                    $('.notifications').slideDown("slow");
                }, 800);
                setTimeout(function() {
                    $('.notifications').slideUp("slow");
                    this.isSuccess = false;
                }, 4000);
            },
            deleteCensus(CensusId) {
                if (confirm("Are you sure to delete this Census?")) {
                    store.deleteCensus(CensusId);
                }
            },

            syncSetup() {
                eventHub.$emit("sync-setup");
            },
            syncCensus(CensusId) {
                eventHub.$emit("sync-census", CensusId);
            },
            loadDistricts: function () {
                this.districts = [];
                var division_id = this.census.DIVISION_ID;
                $('#district-id').val('').trigger('change');
                store.getDistrictList((err, list) => {
                    this.districts = list;
                }, division_id);

            },
            loadThanaUpazilla: function (e) {
                var district_id = this.census.DISTRICT_ID;
                this.city_corporation = [];
                this.pourosabha = [];
                this.thanaUpazilla = [];
                this.census.CITY_CORP_ID = '';
                this.census.THANA_UPZ_ID = '';
                this.census.PAURASHAVA_ID = '';
                $('#city_corp_id').val(null).trigger('change');
                $('#thana-upz-id').val(null).trigger('change');
                $('#paurashava_id').val(null).trigger('change');
                store.getThanaUpazillaByDistrict((err, thanaList) => {
                    this.thanaUpazilla = thanaList;
                }, district_id);

                store.getCityCorporationPourosabhaByDistrict((err, cityCorpList) => {
                    this.city_corporation = cityCorpList;
                }, district_id,1);

            },
            loadUnionWard() {
                var thana_id = this.census.THANA_UPZ_ID;
                this.pourosabha = [];
                this.unionWards = [];

                store.getUnionWardByThanaUpazilla((err, unionList) => {
                    this.unionWards = unionList;
                }, thana_id);
                store.getCityCorporationPourosabhaByDistrict((err, cityCorpList) => {
                    this.pourosabha = cityCorpList;
                }, thana_id,2);


            },
            loadUnionWardByPourasabha() {
                this.census.WARD_UNION_ID = 0;
                var pourasabhaId = this.census.PAURASHAVA_ID;
                var thana_id = this.census.THANA_UPZ_ID;
                store.getUnionWardByThanaUpazilla((err, unionList) => {
                    this.unionWards = unionList;
                }, thana_id, pourasabhaId);

            },
            loadMauzaMahalla() {

                this.mauzaMahalla = [];
                 var unionWardId = this.census.WARD_UNION_ID;
                 store.getMauzaMahallahByUnionWard((err, list) => {
                 this.mauzaMahalla = list;
                 }, unionWardId);

            },

            loadHeadOfficeDistricts() {
                this.HeadOfficedistricts = [];
                var division_id = this.census.HEAD_OFFICE_DIVISION;
                store.getDistrictList((err, list) => {
                    this.HeadOfficedistricts = list;
                }, division_id);
            },
            loadHeadOfficeThana: function (e) {
                this.headOfficeThanaUpazilla = [];
                this.headOfficeCityCorporation = [];
                var district_id = this.census.HEAD_OFFICE_DISTRICT;
                store.getThanaUpazillaByDistrict((err, thanaList) => {
                    this.headOfficeThanaUpazilla = thanaList;
                }, district_id);

                store.getCityCorporationPourosabhaByDistrict((err, cityCorpList) => {
                    this.headOfficeCityCorporation = cityCorpList;
                }, district_id,1);
            },
            loadHeadOfficeUnionWard() {
                this.headOfficeUnionWards = [];
                this.headOfficePourosabha = [];
                var thanaId = this.census.HEAD_OFFICE_THANA_UPZ;
                store.getUnionWardByThanaUpazilla((err, unionList) => {
                    this.headOfficeUnionWards = unionList;
                }, thanaId);

                store.getCityCorporationPourosabhaByDistrict((err, cityCorpList) => {
                    this.headOfficePourosabha = cityCorpList;
                }, thanaId,2);
            },
            loadHeadOfficeUnionWardByPourasabha() {
                this.headOfficeUnionWards = [];
                var pourasabhaId = this.census.HEAD_OFFICE_PAURASHAVA_ID;
                var thana_id = this.census.HEAD_OFFICE_THANA_UPZ;
                store.getUnionWardByThanaUpazilla((err, unionList) => {
                    this.headOfficeUnionWards = unionList;
                }, thana_id, pourasabhaId);

            },
            loadHeadOfficeMauza() {
                this.headOfficeMauza = [];
                var unionWardId = this.census.HEAD_OFFICE_WARD_UNION;
                store.getMauzaMahallahByUnionWard((err, list) => {
                    this.headOfficeMauza = list;
                }, unionWardId);
            },
            checkUnitType: function () {
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
            checkIsUnderEntGroup: function () {
                var yesNo = this.census.IS_UNDER_ENT_GROUP;
                if (yesNo == 1) {
                    this.enableEntGroup = false;
                } else {
                    this.census.ENTERPRISE_GROUP_ID = "";
                    this.enableEntGroup = true;
                }
            },
            checkIsEntGroup: function () {
                var yesNo = this.census.IS_UNDER_ENTERPRISE;
                if (yesNo == 1) {
                    this.enableEnterprise = false;
                } else {
                    this.census.ENTERPRISE_ID = "";
                    this.enableEnterprise = true;
                }
            },
            checkIsEntGroupId2: function () {
                var yesNo = this.census.IS_UNDER_ENT_GROUP2;
                if (yesNo == 1) {
                    this.enableEntGroupId2 = false;
                } else {
                    this.census.ENTERPRISE_GROUP_ID_2 = "";
                    this.enableEntGroupId2 = true;
                }
            },
            checkClosingReasonsOthers: function () {
                var reasons = this.census.REASON_OF_CLOSE_CODE;
                if (reasons == 13) {
                    this.enableClosingReasonOther = false;
                } else {
                    this.census.REASON_OF_CLOSE_OTHER = "";
                    this.enableClosingReasonOther = true;
                }
            },

            checkUnitType: function () {
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
            checkIsUnderEntGroup: function () {
                var yesNo = this.census.IS_UNDER_ENT_GROUP;
                if (yesNo == 1) {
                    this.enableEntGroup = false;
                } else {
                    this.census.ENTERPRISE_GROUP_ID = "";
                    this.enableEntGroup = true;
                }
            },
            checkIsEntGroup: function () {
                var yesNo = this.census.IS_UNDER_ENTERPRISE;
                if (yesNo == 1) {
                    this.enableEnterprise = false;
                } else {
                    this.census.ENTERPRISE_ID = "";
                    this.enableEnterprise = true;
                }
            },
            checkIsEntGroupId2: function () {
                var yesNo = this.census.IS_UNDER_ENT_GROUP2;
                if (yesNo == 1) {
                    this.enableEntGroupId2 = false;
                } else {
                    this.census.ENTERPRISE_GROUP_ID_2 = "";
                    this.enableEntGroupId2 = true;
                }
            },
            upperCase: function (inputVal, e) {
                this.value = store.upperCase(inputVal);
            },
            checkForm: function (e) {
                if (this.census.DIVISION_ID) return true;
                this.errors = [];
                if (!this.census.DIVISION_ID) this.errors.push("Division required.");
                // if(!this.age) this.errors.push("Age required.");
                e.preventDefault();
            },
            checkNIDLength: function() {
                this.msg_provider_nid = '';
                var nid = this.census.PROVIDER_NID;
                if(nid && nid.length != 10 && nid.length != 13 && nid.length != 17){
                    this.msg_provider_nid = "Only 10 or 13 or 17 characters are accepted"
                }
            },
            checkCollectorNIDLength: function() {
                this.msg_collector_nid = '';
                var nid = this.census.COLLECTOR_NID;
                if(nid && nid.length != 10 && nid.length != 13 && nid.length != 17){
                    this.msg_collector_nid = "Only 10 or 13 or 17 characters are accepted"
                }
            },

            // Set All common Config data
            setAllCommonConfigList: function () {
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
            },
            showHide: function () {
                this.census.THANA_UPZ_ID = 0;
                this.census.CITY_CORP_ID = 0;
                this.census.PAURASHAVA_ID = 0;
                this.census.WARD_UNION_ID = 0;
                this.census.MAHALLAH_ID = 0;
                var locationTypeId = this.census.LOCATION_TYPE_ID;
                if(locationTypeId == 1){
                    this.isCity = true;
                    this.isPouro = false;
                } else if (locationTypeId == 2) {
                    this.isCity = false;
                    this.isPouro = true;
                } else {
                    this.isCity = false;
                    this.isPouro = false;
                }
            },
            showHideHeadOffice: function () {
                this.census.HEAD_OFFICE_THANA_UPZ = 0;
                this.census.HEAD_OFFICE_PAURASHAVA_ID = 0;
                this.census.HEAD_OFFICE_CITY_CORP_ID = 0;
                this.census.HEAD_OFFICE_WARD_UNION = 0;
                this.census.HEAD_OFFICE_MAUZA = 0;
                var locationTypeId = this.census.HEAD_OFFICE_LOCATION_TYPE_ID;
                if(locationTypeId == 1){
                    this.isHeadOfficeCity = true;
                    this.isHeadOfficePouro = false;
                } else if (locationTypeId == 2) {
                    this.isHeadOfficeCity = false;
                    this.isHeadOfficePouro = true;
                } else {
                    this.isHeadOfficeCity = false;
                    this.isHeadOfficePouro = false;
                }
            },
            typeOfInstitution: function () {
                var institutionType = this.census.UNIT_MODE_CODE;
                if(institutionType == 1){
                    this.census.HEAD_OFFICE_NAME = this.census.NAME_OF_UNIT;
                    this.census.HEAD_OFFICE_MAHALLAH = this.census.NAME_OF_MAHALLAH;
                    this.census.HEAD_OFFICE_HOUSE = this.census.NAME_OF_HOUSE;
                    this.census.HEAD_OFFICE_ROAD = this.census.NO_NAME_OF_ROAD;
                    this.census.HEAD_OFFICE_FLOOR_LEVEL = this.census.FLOOR_LEVEL;
                    this.census.HEAD_OFFICE_HOLIDING_NO = this.census.HOLIDING_NO;
                    this.census.HEAD_OFFICE_PHONE = this.census.PHONE;
                    this.census.HEAD_OFFICE_FAX = this.census.FAX;
                    this.census.HEAD_OFFICE_EMAIL = this.census.EMAIL;
                    this.census.HEAD_OFFICE_WEBSITE = this.census.WEBSITE;

                    this.census.HEAD_OFFICE_DIVISION = this.census.DIVISION_ID;
                    $('#head-office-division').val(this.census.DIVISION_ID).trigger('change');

                    $('#head-office-district').val('').trigger('change');
                    this.HeadOfficedistricts = this.districts;
                    this.census.HEAD_OFFICE_DISTRICT = this.census.DISTRICT_ID;
                    $('#head-office-district').val(this.census.DISTRICT_ID).trigger('change');

                    $('#head-office-thana-upz').val('').trigger('change');
                    this.headOfficeThanaUpazilla = this.thanaUpazilla;
                    this.census.HEAD_OFFICE_THANA_UPZ = this.census.THANA_UPZ_ID;
                    $('#head-office-thana-upz').val(this.census.THANA_UPZ_ID).trigger('change');

                    $('#head-office-ward-union').val('').trigger('change');
                    this.headOfficeUnionWards = this.unionWards;
                    this.census.HEAD_OFFICE_WARD_UNION = this.census.WARD_UNION_ID;
                    $('#head-office-ward-union').val(this.census.WARD_UNION_ID).trigger('change');

                    this.headOfficeMauza = this.mauzaMahalla;
                    this.census.HEAD_OFFICE_MAUZA = this.census.MAHALLAH_ID;
                    $('#head-office-mauza').val(this.census.MAHALLAH_ID).trigger('change');

                    this.census.HEAD_OFFICE_RMO_CODE = this.census.RMO_CODE;
                    $('#head-office-rmo-code').val(this.census.RMO_CODE).trigger('change');

                    this.census.HEAD_OFFICE_LOCATION_TYPE_ID = this.census.LOCATION_TYPE_ID;
                    var locationTypeId = this.census.LOCATION_TYPE_ID;
                    if(locationTypeId == 1){
                        this.isHeadOfficeCity = true;
                        this.headOfficeCityCorporation = this.city_corporation;
                        this.census.HEAD_OFFICE_CITY_CORP_ID = this.census.CITY_CORP_ID;
                        $('#head-office-city-corp-id').val(this.census.CITY_CORP_ID).trigger('change');
                    } else if (locationTypeId == 2) {
                        this.isHeadOfficePouro = true;
                        this.headOfficePourosabha = this.pourosabha;
                        this.census.HEAD_OFFICE_PAURASHAVA_ID = this.census.PAURASHAVA_ID;
                        $('#head_office_paurashava_id').val(this.census.PAURASHAVA_ID).trigger('change');
                    } else {
                        this.isHeadOfficeCity = false;
                        this.isHeadOfficePouro = false;
                    }

                    //disableHeadOfficeAddress
                    this.enableDisableHOName = true;
                    this.enableDisableHOMahallah = true;
                    this.enableDisableHOHouse = true;
                    this.enableDisableHORoad = true;
                    this.enableDisableHOFloor = true;
                    this.enableDisableHOHolding = true;
                    this.enableDisableHOPhone = true;
                    this.enableDisableHOFax = true;
                    this.enableDisableHOEmail = true;
                    this.enableDisableHOWebsite = true;
                    this.enableDisableHODivision = true;
                    this.enableDisableHODistrict = true;
                    this.enableDisableHOLocation = true;
                    this.enableDisableHOCity = true;
                    this.enableDisableHOThana = true;
                    this.enableDisableHOPourasabha = true;
                    this.enableDisableHOWardUnion = true;
                    this.enableDisableHOMauza = true;
                    this.enableDisableHORmo = true;

                } else if(institutionType == 6){
                    //disableHeadOfficeAddress
                    this.enableDisableHOName = true;
                    this.enableDisableHOMahallah = true;
                    this.enableDisableHOHouse = true;
                    this.enableDisableHORoad = true;
                    this.enableDisableHOFloor = true;
                    this.enableDisableHOHolding = true;
                    this.enableDisableHOPhone = true;
                    this.enableDisableHOFax = true;
                    this.enableDisableHOEmail = true;
                    this.enableDisableHOWebsite = true;
                    this.enableDisableHODivision = true;
                    this.enableDisableHODistrict = true;
                    this.enableDisableHOLocation = true;
                    this.enableDisableHOCity = true;
                    this.enableDisableHOThana = true;
                    this.enableDisableHOPourasabha = true;
                    this.enableDisableHOWardUnion = true;
                    this.enableDisableHOMauza = true;
                    this.enableDisableHORmo = true;
                } else {
                    //disableHeadOfficeAddress
                    this.enableDisableHOName = false;
                    this.enableDisableHOMahallah = false;
                    this.enableDisableHOHouse = false;
                    this.enableDisableHORoad = false;
                    this.enableDisableHOFloor = false;
                    this.enableDisableHOHolding = false;
                    this.enableDisableHOPhone = false;
                    this.enableDisableHOFax = false;
                    this.enableDisableHOEmail = false;
                    this.enableDisableHOWebsite = false;
                    this.enableDisableHODivision = false;
                    this.enableDisableHODistrict = false;
                    this.enableDisableHOLocation = false;
                    this.enableDisableHOCity = false;
                    this.enableDisableHOThana = false;
                    this.enableDisableHOPourasabha = false;
                    this.enableDisableHOWardUnion = false;
                    this.enableDisableHOMauza = false;
                    this.enableDisableHORmo = false;
                }
            },
            hasTradeLicense:function () {
                var hasTradeLicense = this.census.HAS_TRADE_LICENSE;
                if(hasTradeLicense == 1){
                    this.enableDisableTradeLicenseAuth = false;
                    this.enableDisableTradeLicenseNumber = false;
                    $("#trade-license-authority").select2({
                        placeholder: "Select",
                        allowClear: true
                    });
                } else if(hasTradeLicense == 2) {
                    this.enableDisableTradeLicenseAuth = true;
                    this.enableDisableTradeLicenseNumber = true;
                    $("#trade-license-authority").val('').select2('destroy');
                    this.census.TRADE_LICENSE_NUMBER = '';
                    this.census.TRADE_LICENSE_AUTHORITY = '';
                }

            },
            checkRegistration:function () {
                var hasRegistration = this.census.IS_REGISTERED;
                if(hasRegistration == 1){
                    this.isRegistered = false;
                } else if(hasRegistration == 2) {
                    this.isRegistered = true;
                    this.census.REG_ORG_CODE1 = '';
                    this.census.REG_ORG_CODE2 = '';
                    this.census.REG_ORG_CODE3 = '';
                    $('#reg-org-code1').val(null).trigger('change');
                    $('#reg-org-code2').val(null).trigger('change');
                    $('#reg-org-code3').val(null).trigger('change');
                    this.census.REGISTRATION_NO1 = '';
                    this.census.REGISTRATION_NO2 = '';
                    this.census.REGISTRATION_NO3 = '';
                }

            },
            checkPermissionAuth:function () {
                var hasPermission = this.census.IS_UNDER_PERMISSION_AUTH;
                if(hasPermission == 1){
                    this.hasPermission = false;
                } else if(hasPermission == 2) {
                    this.hasPermission = true;
                    this.census.APPROVAL_REGISTRATION_NO1 = '';
                    this.census.APPROVAL_REGISTRATION_NO2 = '';
                    this.census.APPROVAL_REGISTRATION_NO3 = '';
                    this.census.APPROVAL_REGISTRATION_NO4 = '';
                    this.census.APPROVAL_REGISTRATION_NO5 = '';
                    this.census.APPROVAL_REGISTRATION_NO6 = '';

                    this.census.PERMISSION_AUTH_ID1 = '';
                    this.census.PERMISSION_AUTH_ID2 = '';
                    this.census.PERMISSION_AUTH_ID3 = '';
                    this.census.PERMISSION_AUTH_ID4 = '';
                    this.census.PERMISSION_AUTH_ID5 = '';
                    this.census.PERMISSION_AUTH_ID6 = '';
                    $('#permission-auth-id1').val(null).trigger('change');
                    $('#permission-auth-id2').val(null).trigger('change');
                    $('#permission-auth-id3').val(null).trigger('change');
                    $('#permission-auth-id4').val(null).trigger('change');
                    $('#permission-auth-id5').val(null).trigger('change');
                    $('#permission-auth-id6').val(null).trigger('change');
                }
            },
            checkEnvironmentalControl:function () {
                var hasEnvCtrl = this.census.HAS_ENVIRONMENTAL_CONTROL;
                if(hasEnvCtrl == 1){
                    this.hasEnvCtrl = false;
                } else if(hasEnvCtrl == 2) {
                    this.hasEnvCtrl = true;
                    this.census.POLLUTION_CONTROL_MEASURE_ID = '';
                    $('#pollution_control_measure_id').val(null).trigger('change');
                }
            },
            checkSpecializedZone:function () {
                var hasSpZone = this.census.HAS_SPECIALIZED_ZONE;
                if(hasSpZone == 1){
                    this.hasSpZone = false;
                } else if(hasSpZone == 2) {
                    this.hasSpZone = true;
                    this.census.SPECIALTY_CODE_ID = '';
                    $('#specialty-code-id').val(null).trigger('change');
                }
            },
            checkMembership:function () {
                var hasMembership = this.census.HAS_MEMBERSHIP;
                if(hasMembership == 1){
                    this.hasMembership = false;
                } else if(hasMembership == 2) {
                    this.hasMembership = true;
                    this.census.MEMBERSHIP_AUTHORITY = '';
                    this.census.MEMBERSHIP_NUMBER = '';
                }
            },
            checkChamberMembership:function () {
                var chamberMembership = this.census.HAS_CHAMBER_MEMBERSHIP;
                if(chamberMembership == 1){
                    this.hasChamberMembership = false;
                } else if(chamberMembership == 2) {
                    this.hasChamberMembership = true;
                    this.census.CHAMBER_NAME = '';
                    this.census.CHAMBER_MEMBERSHIP_NUMBER = '';
                }
            },
            checkOwnership:function () {
                var ownership = this.census.LEGAL_OWNERSHIP_CODE;
                if(ownership == 5 || ownership == 6 || ownership == 7){

                    this.census.TYPE_OF_OWNERSHIP = 1;
                    $("#type-of-ownership").val(1).trigger('change');
                    this.isSpecificLegalOwnership = true;
                    this.census.HEAD_GENDER_CODE = '';
                    $("#head-gender-code").val(null).trigger('change');
                    this.census.HEAD_OF_UNIT_AGE = '';
                    this.census.HEAD_EDUCATION_CODE = '';
                    $("#head-education-code").val(null).trigger('change');

                    this.isTradeLicense = true;
                    this.enableDisableTradeLicenseAuth = true;
                    this.enableDisableTradeLicenseNumber = true;
                    this.census.HAS_TRADE_LICENSE = '';
                    this.census.TRADE_LICENSE_AUTHORITY = '';
                    this.census.TRADE_LICENSE_NUMBER = '';
                    $("#has-trade-license").val(null).trigger('change');
                    $("#trade-license-authority").val(null).trigger('change');

                    this.census.MALE_OWNER = '';
                    this.census.FEMALE_OWNER = '';
                    this.census.MALE_UNPAID_WORKER = '';
                    this.census.FEMALE_UNPAID_WORKER = '';
                    $("#unit-type-code").select2('open');


                } else if(ownership == 1) {
                    this.census.TYPE_OF_OWNERSHIP = '';
                    $("#type-of-ownership").val(null).trigger('change');
                    this.isSpecificLegalOwnership = false;
                    this.census.HEAD_GENDER_CODE = '';
                    $("#head-gender-code").val(null).trigger('change');
                    this.census.HEAD_OF_UNIT_AGE = '';
                    this.census.HEAD_EDUCATION_CODE = '';

                    this.isTradeLicense = true;
                    this.enableDisableTradeLicenseAuth = true;
                    this.enableDisableTradeLicenseNumber = true;
                    this.census.HAS_TRADE_LICENSE = '';
                    this.census.TRADE_LICENSE_AUTHORITY = '';
                    this.census.TRADE_LICENSE_NUMBER = '';
                    $("#has-trade-license").val(null).trigger('change');
                    $("#trade-license-authority").val(null).trigger('change');

                    this.census.MALE_OWNER = '';
                    this.census.FEMALE_OWNER = '';
                    this.census.MALE_UNPAID_WORKER = '';
                    this.census.FEMALE_UNPAID_WORKER = '';
                }
                else {
                    this.census.TYPE_OF_OWNERSHIP = '';
                    $("#type-of-ownership").val(null).trigger('change');
                    this.isSpecificLegalOwnership = false;
                    this.census.HEAD_GENDER_CODE = '';
                    $("#head-gender-code").val(null).trigger('change');
                    this.census.HEAD_OF_UNIT_AGE = '';
                    this.census.HEAD_EDUCATION_CODE = '';

                    this.isTradeLicense = false;
                    this.enableDisableTradeLicenseAuth = false;
                    this.enableDisableTradeLicenseNumber = false;
                    this.census.HAS_TRADE_LICENSE = '';
                    this.census.TRADE_LICENSE_AUTHORITY = '';
                    this.census.TRADE_LICENSE_NUMBER = '';
                    $("#has-trade-license").val(null).trigger('change');
                    $("#trade-license-authority").val(null).trigger('change');

                    this.census.MALE_OWNER = '';
                    this.census.FEMALE_OWNER = '';
                    this.census.MALE_UNPAID_WORKER = '';
                    this.census.FEMALE_UNPAID_WORKER = '';
                }
            },
            checkCurrentStatusUnit:function () {
                var currentStatus = this.census.CURRENT_STATUS_OF_UNIT;
                if(currentStatus == 1){
                    this.isUnitStatusClosed = true;
                    this.census.TMP_CLOSED_REOPEN_MONTH = '';
                    this.census.TMP_CLOSED_REOPEN_YEAR = '';
                    this.census.TMP_PERMANENTLY_CLOSE_YEAR = '';
                    this.census.REASON_OF_CLOSE_CODE = '';
                    this.census.REASON_OF_CLOSE_OTHER = '';
                    $("#reopen-month").val(null).trigger('change');
                    $("#closing-reason").val(null).trigger('change');
                } else {
                    this.isUnitStatusClosed = false;
                }
            },

        }
    };
</script>
