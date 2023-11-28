<template>
  <v-container>
    <h1>Watch {{ movieTitle }}</h1>
    <div v-if="magnetLink">
      <div id="player" v-if="videoLoaded"></div>
      <v-btn @click="loadVideo" color="var(--primary-color)" :disabled="videoLoaded">Stream Movie</v-btn>
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
        imdbId: null,
        magnetLink: null,
        videoLoaded: false,
        genres: [],
        similarMovies: [],
        screenWidth: window.innerWidth,
      };
    },
    computed: {
      chunkedSimilarMovies() {
        const columns = this.computeColumns(); // Calculate the number of columns
        return this.chunkArray(this.similarMovies, columns);
      },
    },
    async created() {
      window.addEventListener("resize", this.handleResize);
      await this.fetchMovieDetails();
      await this.fetchImdbId();
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize);
    },
    watch: {
      async imdbId(newImdbId) {
        if (newImdbId) {
          await this.fetchMagnetLink(newImdbId);
        }
      },
    },
    methods: {
      computeColumns() {
        if (this.screenWidth > 1024) return 3; // Large screens
        else if (this.screenWidth > 600) return 2; // Medium screens
        return 1; // Small screens and below
      },
      async fetchMovieDetails() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          this.movieTitle = response.data.title;
          this.genres = response.data.genres.map((genre) => genre.id);
          await this.fetchSimilarMovies();
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      },
      async fetchImdbId() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${this.movieId}/external_ids?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          this.imdbId = response.data.imdb_id;
        } catch (error) {
          console.error("Error fetching IMDb ID:", error);
        }
      },
      async fetchMagnetLink(imdbId) {
        try {
          const response = await axios.get(
            `https://yts.mx/api/v2/list_movies.json?query_term=${imdbId}`
          );
          if (
            response.data.data.movies &&
            response.data.data.movies.length > 0
          ) {
            const movieData = response.data.data.movies[0];
            const torrentHash = movieData.torrents[0].hash;
            const encodedMovieName = encodeURIComponent(movieData.title);

            this.magnetLink = `magnet:?xt=urn:btih:${torrentHash}&dn=${encodedMovieName}`;
            const trackers = [
              "http://track.one:1234/announce",
              "udp://track.two:80",
              "udp://open.demonii.com:1337/announce",
              "udp://tracker.openbittorrent.com:80",
              "udp://tracker.coppersurfer.tk:6969",
              "udp://glotorrents.pw:6969/announce",
              "udp://tracker.opentrackr.org:1337/announce",
              "udp://torrent.gresille.org:80/announce",
              "udp://p4p.arenabg.com:1337",
              "udp://tracker.leechers-paradise.org:6969",
            ];
            this.magnetLink += trackers
              .map((tracker) => `&tr=${encodeURIComponent(tracker)}`)
              .join("");
          }
        } catch (error) {
          console.error("Error fetching magnet link from YTS:", error);
        }
      },
      async fetchSimilarMovies() {
        try {
          if (this.genres.length > 0) {
            const genreId = this.genres[0];
            const response = await axios.get(
              `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&with_genres=${genreId}`
            );
            this.similarMovies = response.data.results;
          }
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
      loadVideo() {
        this.loadWebtorScript();
        this.videoLoaded = true;
      },
      loadWebtorScript() {
        const existingScript = document.getElementById("webtor-script");
        if (existingScript) {
          existingScript.remove();
        }
        const script = document.createElement("script");
        script.id = "webtor-script";
        script.src =
          "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
        script.async = true;
        script.onload = this.initializeWebtor;
        document.body.appendChild(script);
      },
      initializeWebtor() {
        window.webtor = window.webtor || [];
        window.webtor.push({
          id: "player",
          magnet: this.magnetLink,
          on: this.handleEvents,
          width: "100%",
          title: this.movieTitle,
          features: {
            continue: false,
            embed: false,
            title: false,
            p2pProgress: false,
            settings: false,
            download: true,
          },
        });
      },
      handleEvents(e) {
        console.log(e);
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