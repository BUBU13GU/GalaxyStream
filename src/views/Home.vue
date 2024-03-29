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
        trendingMovies: [],
        latestMovies: [],
        topRatedMovies: [],
        trendingSeries: [],
        latestSeries: [],
        topRatedSeries: [],
        screenWidth: window.innerWidth,
        showScrollButton: false,
        filterZeroRated: false, // Added to enable filtering
      };
    },
    computed: {
      chunkedTrendingMovies() {
        return this.chunkArray(
          this.filterData(this.trendingMovies),
          this.computeChunks()
        );
      },
      chunkedLatestMovies() {
        return this.chunkArray(
          this.filterData(this.latestMovies),
          this.computeChunks()
        );
      },
      chunkedTopRatedMovies() {
        return this.chunkArray(
          this.filterData(this.topRatedMovies),
          this.computeChunks()
        );
      },
      chunkedTrendingSeries() {
        return this.chunkArray(
          this.filterData(this.trendingSeries),
          this.computeChunks()
        );
      },
      chunkedLatestSeries() {
        return this.chunkArray(
          this.filterData(this.latestSeries),
          this.computeChunks()
        );
      },
      chunkedTopRatedSeries() {
        return this.chunkArray(
          this.filterData(this.topRatedSeries),
          this.computeChunks()
        );
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
        if (this.screenWidth > 1024) return 3;
        else if (this.screenWidth > 600) return 2;
        return 1;
      },
      async fetchTrendingMovies() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        this.trendingMovies = response.data.results;
      },
      async fetchLatestMovies() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        this.latestMovies = response.data.results;
      },
      async fetchTopRatedMovies() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        this.topRatedMovies = response.data.results;
      },
      async fetchTrendingSeries() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        this.trendingSeries = response.data.results;
      },
      async fetchLatestSeries() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        this.latestSeries = response.data.results;
      },
      async fetchTopRatedSeries() {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        this.topRatedSeries = response.data.results;
      },
      scrollTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      handleScroll() {
        this.showScrollButton = window.scrollY > 200;
      },
      chunkArray(array, size) {
        let result = [];
        for (let i = 0; i < array.length; i += size) {
          result.push(array.slice(i, i + size));
        }
        return result;
      },
      filterData(data) {
        return this.filterZeroRated
          ? data.filter((item) => item.vote_average !== 0)
          : data;
      },
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
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
