<template>
  <v-container>
    <h1>Watch {{ movieTitle }}</h1>
    <div v-if="movieLoaded">
      <iframe :src="videoUrl" width="100%" height="500px" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-else>Loading...</div>

    <!-- Similar Movies Carousel -->
    <h2 v-if="similarMovies.length > 0">Similar Movies</h2>
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
import MovieCard from '../components/MovieCard.vue';

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
    async fetchMovieDetails() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`);
        this.movieTitle = response.data.title;
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    embedMovie() {
      this.videoUrl = `https://vidsrc.me/embed/movie?tmdb=${this.movieId}`;
      this.movieLoaded = true;
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
</style> 