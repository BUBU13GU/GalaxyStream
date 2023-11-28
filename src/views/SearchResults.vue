<template>
  <v-container>
    <!-- Search Results -->
    <h2>Search Results for "{{ query }}"</h2>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="movie in searchResults"
        :key="movie.id">
        <movie-card :movie="movie"></movie-card>
      </v-col>
    </v-row>
    <p v-if="searchResults.length === 0">No results found.</p>
  </v-container>
</template>

<script>
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      searchResults: [],
      query: "",
    };
  },
  watch: {
    // Watch for changes in the route's query parameter 'q'
    '$route.query.q': {
      immediate: true,
      handler(newQuery) {
        this.query = newQuery;
        this.fetchSearchResults();
      }
    }
  },
  methods: {
    async fetchSearchResults() {
      // Ensure there is a query present before making an API call
      if (this.query) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&query=${encodeURIComponent(this.query)}`
          );
          this.searchResults = response.data.results;
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        // If there is no query, clear the search results
        this.searchResults = [];
      }
    }
  }
};
</script>

<style scoped>
.movie-card {
  max-width: 325px; /* Adjust as needed */
  height: auto;
  overflow: hidden; /* Ensure the overlay fits within the card */
  margin-left: 6%;
}
</style>