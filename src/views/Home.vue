<template>
  <v-container>
    <!-- Trending Movies Carousel -->

    <h1>Trending Movies</h1>

    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedTrendingMovies"
        :key="index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Trending Series Carousel -->
    <h1>Trending Series</h1>

    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedTrendingSeries"
        :key="index">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="series in group"
            :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Latest Movies Carousel -->
    <h1>Latest Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedLatestMovies"
        :key="index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Latest Series Carousel -->
    <h1>Latest Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedLatestSeries"
        :key="index">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="series in group"
            :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Highest Rated Movies Carousel -->
    <h1>Top Rated Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedTopRatedMovies"
        :key="index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Top Rated Series Carousel -->
    <h1>Top Rated Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedTopRatedSeries"
        :key="index">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="series in group"
            :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
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
        trendingMovies: [],
        latestMovies: [],
        topRatedMovies: [],
        trendingSeries: [],
        latestSeries: [],
        topRatedSeries: [],
        screenWidth: window.innerWidth,
      };
    },
    computed: {
      chunkedTrendingMovies() {
        return this.chunkArray(this.trendingMovies, this.computeChunks());
      },
      chunkedLatestMovies() {
        return this.chunkArray(this.latestMovies, this.computeChunks());
      },
      chunkedTopRatedMovies() {
        return this.chunkArray(this.topRatedMovies, this.computeChunks());
      },
      chunkedTrendingSeries() {
        return this.chunkArray(this.trendingSeries, this.computeChunks());
      },
      chunkedLatestSeries() {
        return this.chunkArray(this.latestSeries, this.computeChunks());
      },
      chunkedTopRatedSeries() {
        return this.chunkArray(this.topRatedSeries, this.computeChunks());
      },
    },
    created() {
      window.addEventListener("resize", this.handleResize);
      this.fetchTrendingMovies();
      this.fetchLatestMovies();
      this.fetchTopRatedMovies();
      this.fetchTrendingSeries();
      this.fetchLatestSeries();
      this.fetchTopRatedSeries();
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize);
    },
    methods: {
      handleResize() {
        this.screenWidth = window.innerWidth;
      },
      computeChunks() {
        if (this.screenWidth > 1024) return 3; // Large screens
        else if (this.screenWidth > 600) return 2; // Medium screens
        return 1; // Small screens
      },
      async fetchLatestMovies() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
          );
          this.latestMovies = response.data.results.filter(
            (movie) => movie.vote_average > 0
          );
        } catch (error) {
          console.error("Error fetching latest movies:", error);
        }
      },
      async fetchTopRatedMovies() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
          );
          this.topRatedMovies = response.data.results.filter(
            (movie) => movie.vote_average > 0
          );
        } catch (error) {
          console.error("Error fetching top-rated movies:", error);
        }
      },
      async fetchTrendingSeries() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          this.trendingSeries = response.data.results.filter(
            (series) => series.vote_average > 0
          );
        } catch (error) {
          console.error("Error fetching trending series:", error);
        }
      },
      async fetchLatestSeries() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
          );
          this.latestSeries = response.data.results.filter(
            (series) => series.vote_average > 0
          );
        } catch (error) {
          console.error("Error fetching latest series:", error);
        }
      },
      async fetchTopRatedSeries() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
          );
          this.topRatedSeries = response.data.results.filter(
            (series) => series.vote_average > 0
          );
        } catch (error) {
          console.error("Error fetching top-rated series:", error);
        }
      },
      chunkArray(array, size) {
        let result = [];
        for (let i = 0; i < array.length; i += size) {
          result.push(array.slice(i, i + size));
        }
        return result;
      },
    },
  };
</script>

<style scoped>
  .movie-card {
    max-width: 325px; /* Adjust as needed */
    height: auto;
    overflow: hidden; /* Ensure the overlay fits within the card */
    margin-left: 6%;
  }
  .series-card {
    max-width: 325px; /* Adjust as needed */
    height: auto;
    overflow: hidden; /* Ensure the overlay fits within the card */
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
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s;
    opacity: 0; /* Initially hidden */
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
