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
                division_id: 0,
                district_id: 0,
                serial_no_unit: 0,
                name_of_unit: "",
                name_of_mahallah: ""
            },
            divisions: [{
                id: 1,
                name: "Dhaka"
            },
            {
                id: 2,
                name: "Rajshahi"
            },
            {
                id: 3,
                name: "Chittagong"
            }
            ],
            districts: [{
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
    computed: {
        districtsByDivision: function () {
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
                id: 0,
                division_id: 0,
                district_id: 0,
                serial_no_unit: 0,
                name_of_unit: "",
                name_of_mahallah: ""
            };
            this.isEdit = true;
        },
        editCensus(CensusId) {
            store.getCensus(CensusId, (err, Census) => {
                if (err) { } else {
                    this.census = Census;
                    this.isEdit = true;
                }
            });
        },
        saveCensus() {
            if (this.census.id > 0) {
                store.editCensus(this.census.id, this.census);
            } else {
                store.addCensus(this.census);
            }
            this.isEdit = false;
        },
        deleteCensus(CensusId) {
            if (confirm("Are you sure to delete this Census?")) {
                store.deleteCensus(CensusId);
            }
        }
    }
};
</script>
