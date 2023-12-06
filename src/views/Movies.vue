<template>
    <v-container>
      <h1>All Movies</h1>
  
      <!-- Sorting Controls -->
      <v-row class="mb-3">
        <v-col>
          <v-btn color="var(--primary-color)"
              rounded @click="sortAlphabetically">Sort Alphabetically</v-btn>
          <v-btn color="var(--primary-color)"
              rounded @click="sortByYear">Sort by Year</v-btn>
          <v-btn color="var(--primary-color)"
              rounded @click="flipOrder">Flip Order</v-btn>
        </v-col>
      </v-row>
  
      <!-- Movies List -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="movie in sortedMovies" :key="movie.id">
          <movie-card :movie="movie"></movie-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
import axios from 'axios';
import MovieCard from '../components/MovieCard.vue';

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
      sortType: 'alpha', // 'alpha' or 'year'
      isFlipped: false,
    };
  },
  computed: {
    sortedMovies() {
      let sorted = [...this.movies];
      if (this.sortType === 'alpha') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        sorted.sort((a, b) => a.release_date.localeCompare(b.release_date));
      }
      if (this.isFlipped) {
        sorted.reverse();
      }
      return sorted;
    },
  },
  created() {
    this.fetchAllMovies();
  },
  methods: {
    async fetchAllMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        this.movies = response.data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    sortAlphabetically() {
      this.sortType = 'alpha';
    },
    sortByYear() {
      this.sortType = 'year';
    },
    flipOrder() {
      this.isFlipped = !this.isFlipped;
    },
  },
};
</script>

<style scoped>
  /* Existing Styles */
  .movie-card {
    max-width: 325px;
    height: auto;
    overflow: hidden;
    margin-left: 6%;
  }
  /* Additional styles for sorting controls */
  .mb-3 {
    margin-bottom: 1rem;
  }
  button {
    margin: 10px;
  }
</style>
