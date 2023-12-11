<template>
  <v-container>
    <!-- Search Results -->
    <h2>Search Results for "{{ query }}"</h2>
    <v-row>
      <!-- Display Movies -->
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="movie in movieSearchResults"
        :key="movie.id">
        <movie-card :movie="movie"></movie-card>
      </v-col>
      <!-- Display Series -->
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="series in seriesSearchResults"
        :key="series.id">
        <series-card :series="series"></series-card>
      </v-col>
    </v-row>
    <p
      v-if="
        movieSearchResults.length === 0 && seriesSearchResults.length === 0
      ">
      No results found.
    </p>
    <!-- Scroll to Top Button -->
    <v-btn
      fab
      dark
      fixed
      bottom
      right
      color="var(--primary-color)"
      v-show="showScrollButton"
      @click="scrollTop"
      class="elevation-12">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  import axios from "axios";
  import MovieCard from "../components/MovieCard.vue";
  import SeriesCard from "../components/SeriesCard.vue";

  export default {
    components: {
      MovieCard,
      SeriesCard,
    },
    data() {
      return {
        movieSearchResults: [],
        seriesSearchResults: [],
        showScrollButton: false,
        query: "",
      };
    },
    watch: {
      "$route.query.q": {
        immediate: true,
        handler(newQuery) {
          this.query = newQuery;
          this.fetchSearchResults();
        },
      },
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
      async fetchSearchResults() {
        if (this.query) {
          try {
            // Fetch movies
            const movieResponse = await axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${
                process.env.VUE_APP_TMDB_API_KEY
              }&query=${encodeURIComponent(this.query)}`
            );
            this.movieSearchResults = this.filterResults(
              movieResponse.data.results
            );

            // Fetch series
            const seriesResponse = await axios.get(
              `https://api.themoviedb.org/3/search/tv?api_key=${
                process.env.VUE_APP_TMDB_API_KEY
              }&query=${encodeURIComponent(this.query)}`
            );
            this.seriesSearchResults = this.filterResults(
              seriesResponse.data.results
            );
          } catch (error) {
            console.error("Error fetching search results:", error);
          }
        } else {
          // Clear the search results if there's no query
          this.movieSearchResults = [];
          this.seriesSearchResults = [];
        }
      },
      handleScroll() {
        console.log("Scrolling...", window.scrollY); // This should log the scroll position
        this.showScrollButton = window.scrollY > 200;
      },
      scrollTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      filterResults(results) {
        return results.filter((item) => item.vote_average > 0);
      },
    },
  };
</script>

<style scoped>
  .movie-card {
    max-width: 325px;
    height: auto;
    overflow: hidden;
    margin-left: 6%;
  }
  .series-card {
    max-width: 325px;
    height: auto;
    overflow: hidden;
    margin-left: 6%;
  }
</style>
