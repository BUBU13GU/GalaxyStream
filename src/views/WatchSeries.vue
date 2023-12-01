<template>
  <!-- ... existing template content ... -->

  <!-- Button to trigger the test method -->
  <v-btn @click="testFetchMediaInfo">Test Fetch Media Info</v-btn>
</template>

<script>
import { MOVIES } from "@consumet/extensions";

export default {
  data() {
    return {
      FlixHQ: null,
      seriesId: null,
      seriesTitle: "",
      seriesInfo: null,
      isLoading: false,
      errorMessage: "No Data Found",
    };
  },
  async created() {
    this.FlixHQ = new MOVIES.FlixHQ();
    this.seriesId = this.$route.params.id; // If you have seriesId from route
    this.seriesTitle = this.$route.params.seriesTitle; // If you have seriesTitle from route
  },
  methods: {
    async testFetchMediaInfo() {
    try {
      // Hardcoded media ID for testing
      const testMediaId = "tv/watch-vincenzo-67955";

      // Fetch media info using the hardcoded ID
      const data = await this.FlixHQ.fetchMediaInfo(testMediaId);
      console.log(data);

    } catch (error) {
      console.error("Error testing fetchMediaInfo:", error);
    }
  },
},
};
</script>

<style scoped>
  /* Your styles */
</style>
