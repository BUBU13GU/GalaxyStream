<template>
  <v-container>
    <div class="title-switch-container">
      <h1>Watch: {{ movieTitle }}</h1>
      <!-- Player Button -->
      <div class="player-switch">
        <v-btn
          :color="
            useAlternativePlayer
              ? 'var(--primary-color)'
              : 'var(--primary-color-dark)'
          "
          @click="switchPlayer"
          small>
          {{ useAlternativePlayer ? "Alternative Player" : "Default Player" }}
        </v-btn>
      </div>
    </div>
    <div v-if="movieLoaded">
      <iframe
        :src="videoUrl"
        width="100%"
        height="550px"
        overflow-y="hidden"
        frameborder="0"
        allowfullscreen></iframe>
    </div>
    <div v-else>Loading...</div>
    <!-- Dropdown for Franchise Movies -->
    <div class="dropdown-container">
      <v-btn
        color="var(--primary-color-dark)"
        rounded
        dark
        @click="toggleFranchiseDropdown">
        Select Movie
      </v-btn>
      <div v-if="showFranchiseDropdown">
        <!-- Franchise Movies Dropdown -->
        <div class="franchise-dropdown">
          <v-btn
            v-for="(movie, index) in franchiseMovies"
            :key="movie.id"
            color="var(--secondary-color)"
            dark
            @click="loadMovie(movie.id)"
            rounded>
            Movie {{ index + 1 }}: {{ movie.title }}
          </v-btn>
        </div>
      </div>
    </div>
    <!-- Similar Movies Carousel -->
    <h1 v-if="similarMovies.length > 0">Similar Movies</h1>
    <v-carousel hide-delimiters v-if="similarMovies.length > 0">
      <v-carousel-item
        v-for="(group, index) in chunkedSimilarMovies"
        :key="index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
  import axios from "axios";
  import MovieCard from "../components/MovieCard.vue";

  export default {
    name: "WatchMovie",
    components: {
      MovieCard,
    },
    data() {
      return {
        movieId: this.$route.params.id, // TMDb movie ID from route parameter
        movieTitle: "",
        movieLoaded: false,
        videoUrl: "",
        similarMovies: [],
        franchiseMovies: [],
        showFranchiseDropdown: false,
        useAlternativePlayer: false,
        screenWidth: window.innerWidth,
      };
    },
    computed: {
      chunkedSimilarMovies() {
        const columns = this.computeColumns();
        return this.chunkArray(this.similarMovies, columns);
      },
    },
    async created() {
      window.addEventListener("resize", this.handleResize);
      await this.fetchMovieDetails();
      this.embedMovie();
      await this.fetchSimilarMovies();
      await this.fetchFranchiseMovies();
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize);
    },
    mounted() {
      window.addEventListener("resize", this.handleResize);
      this.handleResize(); // Call it once initially to set screenWidth
    },

    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize);
    },
    methods: {
      computeColumns() {
        if (this.screenWidth > 1024) return 3;
        else if (this.screenWidth > 600) return 2;
        return 1;
      },
      handleResize() {
        this.screenWidth = window.innerWidth;
      },
      async fetchMovieDetails() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          this.movieTitle = response.data.title; // Update the movie title here
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      },
      async fetchImdbId(tmdbId) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}/external_ids?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          return response.data.imdb_id;
        } catch (error) {
          console.error("Error fetching IMDb ID:", error);
          return null;
        }
      },

      // Updated embedMovie method
      async embedMovie() {
        const imdbId = await this.fetchImdbId(this.movieId);
        if (!imdbId) {
          console.error("Failed to retrieve IMDb ID");
          return;
        }

        if (this.useAlternativePlayer) {
          this.videoUrl = `https://www.2embed.cc/embed/${imdbId}`;
        } else {
          this.videoUrl = `https://multiembed.mov/directstream.php?video_id=${this.movieId}&tmdb=1`;
        }
        this.movieLoaded = true;
      },

      switchPlayer() {
        this.useAlternativePlayer = !this.useAlternativePlayer;
        this.embedMovie();
      },
      toggleFranchiseDropdown() {
        this.showFranchiseDropdown = !this.showFranchiseDropdown;
      },
      async fetchFranchiseMovies() {
        try {
          const movieDetailsResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          if (movieDetailsResponse.data.belongs_to_collection) {
            const collectionId =
              movieDetailsResponse.data.belongs_to_collection.id;
            const collectionResponse = await axios.get(
              `https://api.themoviedb.org/3/collection/${collectionId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
            );
            this.franchiseMovies = collectionResponse.data.parts;
          }
        } catch (error) {
          console.error("Error fetching franchise movies:", error);
        }
      },
      loadMovie(movieId) {
        // Logic to load the selected movie
        this.movieId = movieId;
        this.embedMovie();
        this.fetchMovieDetails();
        this.fetchSimilarMovies();
        this.fetchFranchiseMovies();
      },
      async fetchSimilarMovies() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${this.movieId}/similar?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          this.similarMovies = response.data.results;
        } catch (error) {
          console.error("Error fetching similar movies:", error);
        }
      },
      chunkArray(array, size) {
        let result = [];
        for (let i = 0; i < array.length; i += size) {
          result.push(array.slice(i, i + size));
        }
        return result;
      },
      handleResize() {
        this.screenWidth = window.innerWidth;
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

  .image-container {
    position: relative;
  }

  .movie-poster {
    width: 100%;
    height: auto;
    transition: filter 0.3s;
  }

  .details-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s;
    opacity: 0;
  }

  .details-overlay:hover {
    opacity: 1;
  }

  .details-text {
    color: white;
    text-align: center;
  }

  .movie-card:hover .movie-poster {
    filter: blur(2px);
  }
  .title-switch-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .franchise-movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }

  .franchise-movies .v-btn {
    margin: 5px;
  }
  .dropdown-container {
    margin-top: 20px;
    text-align: left;
  }

  .franchise-dropdown {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }

  .franchise-dropdown .v-btn {
    margin: 5px;
  }
</style>
