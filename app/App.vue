<template>
	<!-- The HTML template for our component -->
	<div id="app">
		<Census :censuses="censuses">
		</Census>
	</div>
</template>

<script>
// the Javascript for our component
// We will export a Vue component options object here
import store from "./store";
import Census from "./components/Census.vue";
import eventHub from "./shared/EventHub";

export default {
  components: {
    Census
  },

  data() {
    return {
      censuses: {},
      selectedCensus: ""
    };
  },
  beforeMount() {
    this.updateListings();
  },
  mounted() {
    store.on("data-updated", this.updateListings);
    eventHub.$on("filter-by-title", this.filterByTitle);
  },
  methods: {
    updateListings() {
      store.getCensuses((err, censuses) => {
        if (err) {
        } else {
          this.censuses = censuses;
        }
      });
    }
  }
};
</script>
