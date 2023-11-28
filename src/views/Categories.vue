<template>
  <v-container>
    <!-- Action Movies Carousel -->
    <h1>Action Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedActionMovies"
        :key="'action-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Adventure Movies Carousel -->
    <h1>Adventure Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedAdventureMovies"
        :key="'adventure-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Animation Movies Carousel -->
    <h1>Animation Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedAnimationMovies"
        :key="'animation-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Comedy Movies Carousel -->
    <h1>Comedy Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedComedyMovies"
        :key="'comedy-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Crime Movies Carousel -->
    <h1>Crime Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedCrimeMovies"
        :key="'crime-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Documentary Movies Carousel -->
    <h1>Documentary Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedDocumentaryMovies"
        :key="'documentary-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Drama Movies Carousel -->
    <h1>Drama Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedDramaMovies"
        :key="'drama-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Family Movies Carousel -->
    <h1>Family Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedFamilyMovies"
        :key="'family-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Fantasy Movies Carousel -->
    <h1>Fantasy Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedFantasyMovies"
        :key="'fantasy-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- History Movies Carousel -->
    <h1>History Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedHistoryMovies"
        :key="'history-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Horror Movies Carousel -->
    <h1>Horror Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedHorrorMovies"
        :key="'horror-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Music Movies Carousel -->
    <h1>Music Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedMusicMovies"
        :key="'music-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Mystery Movies Carousel -->
    <h1>Mystery Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedMysteryMovies"
        :key="'mystery-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Romance Movies Carousel -->
    <h1>Romance Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedRomanceMovies"
        :key="'romance-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Science Fiction Movies Carousel -->
    <h1>Science Fiction Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedScienceFictionMovies"
        :key="'scienceFiction-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- TV Movie Carousel -->
    <h1>TV Movie</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedTVMovies"
        :key="'tvMovie-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Thriller Movies Carousel -->
    <h1>Thriller Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedThrillerMovies"
        :key="'thriller-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- War Movies Carousel -->
    <h1>War Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedWarMovies"
        :key="'war-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Western Movies Carousel -->
    <h1>Western Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(group, index) in chunkedWesternMovies"
        :key="'western-' + index">
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
    components: {
      MovieCard,
    },
    data() {
      return {
        actionMovies: [],
        adventureMovies: [],
        animationMovies: [],
        comedyMovies: [],
        crimeMovies: [],
        documentaryMovies: [],
        dramaMovies: [],
        familyMovies: [],
        fantasyMovies: [],
        historyMovies: [],
        horrorMovies: [],
        musicMovies: [],
        mysteryMovies: [],
        romanceMovies: [],
        scienceFictionMovies: [],
        tvMovies: [],
        thrillerMovies: [],
        warMovies: [],
        westernMovies: [],
        screenWidth: window.innerWidth
      };
    },
    computed: {
      chunkedActionMovies() {
        return this.chunkArray(this.actionMovies, this.computeChunks());
      },
      chunkedAdventureMovies() {
        return this.chunkArray(this.adventureMovies, this.computeChunks());
      },
      chunkedAnimationMovies() {
        return this.chunkArray(this.animationMovies, this.computeChunks());
      },
      chunkedComedyMovies() {
        return this.chunkArray(this.comedyMovies, this.computeChunks());
      },
      chunkedCrimeMovies() {
        return this.chunkArray(this.crimeMovies, this.computeChunks());
      },
      chunkedDocumentaryMovies() {
        return this.chunkArray(this.documentaryMovies, this.computeChunks());
      },
      chunkedDramaMovies() {
        return this.chunkArray(this.dramaMovies, this.computeChunks());
      },
      chunkedFamilyMovies() {
        return this.chunkArray(this.familyMovies, this.computeChunks());
      },
      chunkedFantasyMovies() {
        return this.chunkArray(this.fantasyMovies, this.computeChunks());
      },
      chunkedHistoryMovies() {
        return this.chunkArray(this.historyMovies, this.computeChunks());
      },
      chunkedHorrorMovies() {
        return this.chunkArray(this.horrorMovies, this.computeChunks());
      },
      chunkedMusicMovies() {
        return this.chunkArray(this.musicMovies, this.computeChunks());
      },
      chunkedMysteryMovies() {
        return this.chunkArray(this.mysteryMovies, this.computeChunks());
      },
      chunkedRomanceMovies() {
        return this.chunkArray(this.romanceMovies, this.computeChunks());
      },
      chunkedScienceFictionMovies() {
        return this.chunkArray(this.scienceFictionMovies, this.computeChunks());
      },
      chunkedTVMovies() {
        return this.chunkArray(this.tvMovies, this.computeChunks());
      },
      chunkedThrillerMovies() {
        return this.chunkArray(this.thrillerMovies, this.computeChunks());
      },
      chunkedWarMovies() {
        return this.chunkArray(this.warMovies, this.computeChunks());
      },
      chunkedWesternMovies() {
        return this.chunkArray(this.westernMovies, this.computeChunks());
      },
    },
    created() {
      window.addEventListener('resize', this.handleResize);
      this.fetchMoviesByGenre(28, "actionMovies");
      this.fetchMoviesByGenre(12, "adventureMovies");
      this.fetchMoviesByGenre(16, "animationMovies");
      this.fetchMoviesByGenre(35, "comedyMovies");
      this.fetchMoviesByGenre(80, "crimeMovies");
      this.fetchMoviesByGenre(99, "documentaryMovies");
      this.fetchMoviesByGenre(18, "dramaMovies");
      this.fetchMoviesByGenre(10751, "familyMovies");
      this.fetchMoviesByGenre(14, "fantasyMovies");
      this.fetchMoviesByGenre(36, "historyMovies");
      this.fetchMoviesByGenre(27, "horrorMovies");
      this.fetchMoviesByGenre(10402, "musicMovies");
      this.fetchMoviesByGenre(9648, "mysteryMovies");
      this.fetchMoviesByGenre(10749, "romanceMovies");
      this.fetchMoviesByGenre(878, "scienceFictionMovies");
      this.fetchMoviesByGenre(10770, "tvMovies");
      this.fetchMoviesByGenre(53, "thrillerMovies");
      this.fetchMoviesByGenre(10752, "warMovies");
      this.fetchMoviesByGenre(37, "westernMovies");
    },
    beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
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
      async fetchMoviesByGenre(genreId, targetArrayName) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&with_genres=${genreId}`
          );
          this[targetArrayName] = response.data.results;
        } catch (error) {
          console.error(`Error fetching movies for genre ${genreId}:`, error);
        }
      },
      chunkArray(array, size) {
      let result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
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
