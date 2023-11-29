<template>
  <v-container>
    <!-- Action Movies Carousel -->
    <h1>Action Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedActionMovies" :key="'action-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Action Series Carousel -->
    <h1>Action Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedActionSeries" :key="'actionSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Adventure Movies Carousel -->
    <h1>Adventure Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedAdventureMovies" :key="'adventure-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Adventure Series Carousel -->
    <h1>Adventure Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedAdventureSeries" :key="'adventureSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Animation Movies Carousel -->
    <h1>Animation Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedAnimationMovies" :key="'animation-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Animation Series Carousel -->
    <h1>Animation Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedAnimationSeries" :key="'animationSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

        <!-- Comedy Movies Carousel -->
        <h1>Comedy Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedComedyMovies" :key="'comedy-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Comedy Series Carousel -->
    <h1>Comedy Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedComedySeries" :key="'comedySeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Crime Movies Carousel -->
    <h1>Crime Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedCrimeMovies" :key="'crime-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Crime Series Carousel -->
    <h1>Crime Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedCrimeSeries" :key="'crimeSeries-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Documentary Movies Carousel -->
    <h1>Documentary Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedDocumentaryMovies" :key="'documentary-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Documentary Series Carousel -->
    <h1>Documentary Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedDocumentarySeries" :key="'documentarySeries-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

     <!-- Drama Movies Carousel -->
     <h1>Drama Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedDramaMovies" :key="'drama-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Drama Series Carousel -->
    <h1>Drama Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedDramaSeries" :key="'dramaSeries-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Family Movies Carousel -->
    <h1>Family Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedFamilyMovies" :key="'family-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Family Series Carousel -->
    <h1>Family Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedFamilySeries" :key="'familySeries-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Fantasy Movies Carousel -->
    <h1>Fantasy Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedFantasyMovies" :key="'fantasy-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Fantasy Series Carousel -->
    <h1>Fantasy Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedFantasySeries" :key="'fantasySeries-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

     <!-- History Movies Carousel -->
     <h1>History Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedHistoryMovies" :key="'history-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- History Series Carousel -->
    <h1>History Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedHistorySeries" :key="'historySeries-' + index">
        <v-row>
          <v-col cols="12" sm="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Horror Movies Carousel -->
    <h1>Horror Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedHorrorMovies" :key="'horror-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Horror Series Carousel -->
    <h1>Horror Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedHorrorSeries" :key="'horrorSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Music Movies Carousel -->
    <h1>Music Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedMusicMovies" :key="'music-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Music Series Carousel -->
    <h1>Music Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedMusicSeries" :key="'musicSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

      <!-- Mystery Movies Carousel -->
      <h1>Mystery Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedMysteryMovies" :key="'mystery-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Mystery Series Carousel -->
    <h1>Mystery Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedMysterySeries" :key="'mysterySeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Romance Movies Carousel -->
    <h1>Romance Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedRomanceMovies" :key="'romance-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Romance Series Carousel -->
    <h1>Romance Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedRomanceSeries" :key="'romanceSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Science Fiction Movies Carousel -->
    <h1>Science Fiction Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedScienceFictionMovies" :key="'scienceFiction-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Science Fiction Series Carousel -->
    <h1>Science Fiction Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedScienceFictionSeries" :key="'scienceFictionSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

     <!-- Thriller Movies Carousel -->
     <h1>Thriller Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedThrillerMovies" :key="'thriller-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Thriller Series Carousel -->
    <h1>Thriller Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedThrillerSeries" :key="'thrillerSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <h1>War Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedWarSeries" :key="'warSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Western Movies Carousel -->
    <h1>Western Movies</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedWesternMovies" :key="'western-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="movie in group" :key="movie.id">
            <movie-card :movie="movie"></movie-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <!-- Western Series Carousel -->
    <h1>Western Series</h1>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(group, index) in chunkedWesternSeries" :key="'westernSeries-' + index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
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
      actionMovies: [], actionSeries: [],
      adventureMovies: [], adventureSeries: [],
      animationMovies: [], animationSeries: [],
      comedyMovies: [], comedySeries: [],
      crimeMovies: [], crimeSeries: [],
      documentaryMovies: [], documentarySeries: [],
      dramaMovies: [], dramaSeries: [],
      familyMovies: [], familySeries: [],
      fantasyMovies: [], fantasySeries: [],
      historyMovies: [], historySeries: [],
      horrorMovies: [], horrorSeries: [],
      musicMovies: [], musicSeries: [],
      mysteryMovies: [], mysterySeries: [],
      romanceMovies: [], romanceSeries: [],
      scienceFictionMovies: [], scienceFictionSeries: [],
      thrillerMovies: [], thrillerSeries: [],
      warMovies: [], warSeries: [],
      westernMovies: [], westernSeries: [],
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    chunkedActionMovies() { return this.chunkArray(this.actionMovies, this.computeChunks()); },
    chunkedActionSeries() { return this.chunkArray(this.actionSeries, this.computeChunks()); },
    chunkedAdventureMovies() { return this.chunkArray(this.adventureMovies, this.computeChunks()); },
    chunkedAdventureSeries() { return this.chunkArray(this.adventureSeries, this.computeChunks()); },
    chunkedAnimationMovies() { return this.chunkArray(this.animationMovies, this.computeChunks()); },
    chunkedAnimationSeries() { return this.chunkArray(this.animationSeries, this.computeChunks()); },
    chunkedComedyMovies() { return this.chunkArray(this.comedyMovies, this.computeChunks()); },
    chunkedComedySeries() { return this.chunkArray(this.comedySeries, this.computeChunks()); },
    chunkedCrimeMovies() { return this.chunkArray(this.crimeMovies, this.computeChunks()); },
    chunkedCrimeSeries() { return this.chunkArray(this.crimeSeries, this.computeChunks()); },
    chunkedDocumentaryMovies() { return this.chunkArray(this.documentaryMovies, this.computeChunks()); },
    chunkedDocumentarySeries() { return this.chunkArray(this.documentarySeries, this.computeChunks()); },
    chunkedDramaMovies() { return this.chunkArray(this.dramaMovies, this.computeChunks()); },
    chunkedDramaSeries() { return this.chunkArray(this.dramaSeries, this.computeChunks()); },
    chunkedFamilyMovies() { return this.chunkArray(this.familyMovies, this.computeChunks()); },
    chunkedFamilySeries() { return this.chunkArray(this.familySeries, this.computeChunks()); },
    chunkedFantasyMovies() { return this.chunkArray(this.fantasyMovies, this.computeChunks()); },
    chunkedFantasySeries() { return this.chunkArray(this.fantasySeries, this.computeChunks()); },
    chunkedHistoryMovies() { return this.chunkArray(this.historyMovies, this.computeChunks()); },
    chunkedHistorySeries() { return this.chunkArray(this.historySeries, this.computeChunks()); },
    chunkedHorrorMovies() { return this.chunkArray(this.horrorMovies, this.computeChunks()); },
    chunkedHorrorSeries() { return this.chunkArray(this.horrorSeries, this.computeChunks()); },
    chunkedMusicMovies() { return this.chunkArray(this.musicMovies, this.computeChunks()); },
    chunkedMusicSeries() { return this.chunkArray(this.musicSeries, this.computeChunks()); },
    chunkedMysteryMovies() { return this.chunkArray(this.mysteryMovies, this.computeChunks()); },
    chunkedMysterySeries() { return this.chunkArray(this.mysterySeries, this.computeChunks()); },
    chunkedRomanceMovies() { return this.chunkArray(this.romanceMovies, this.computeChunks()); },
    chunkedRomanceSeries() { return this.chunkArray(this.romanceSeries, this.computeChunks()); },
    chunkedScienceFictionMovies() { return this.chunkArray(this.scienceFictionMovies, this.computeChunks()); },
    chunkedScienceFictionSeries() { return this.chunkArray(this.scienceFictionSeries, this.computeChunks()); },
    chunkedThrillerMovies() { return this.chunkArray(this.thrillerMovies, this.computeChunks()); },
    chunkedThrillerSeries() { return this.chunkArray(this.thrillerSeries, this.computeChunks()); },
    chunkedWarMovies() { return this.chunkArray(this.warMovies, this.computeChunks()); },
    chunkedWarSeries() { return this.chunkArray(this.warSeries, this.computeChunks()); },
    chunkedWesternMovies() { return this.chunkArray(this.westernMovies, this.computeChunks()); },
    chunkedWesternSeries() { return this.chunkArray(this.westernSeries, this.computeChunks()); },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.fetchMoviesByGenre(28, 'actionMovies'); // Action
    this.fetchSeriesByGenre(10759, 'actionSeries'); // Action
    this.fetchMoviesByGenre(12, 'adventureMovies'); // Adventure
    this.fetchSeriesByGenre(10759, 'adventureSeries'); // Adventure
    this.fetchMoviesByGenre(16, 'animationMovies'); // Animation
    this.fetchSeriesByGenre(10759, 'animationSeries'); // Animation
    this.fetchMoviesByGenre(35, 'comedyMovies'); // Comedy
    this.fetchSeriesByGenre(10759, 'comedySeries'); // Comedy
    this.fetchMoviesByGenre(80, 'crimeMovies'); // Crime
    this.fetchSeriesByGenre(10759, 'crimeSeries'); // Crime
    this.fetchMoviesByGenre(99, 'documentaryMovies'); // Documentary
    this.fetchSeriesByGenre(10759, 'documentarySeries'); // Documentary
    this.fetchMoviesByGenre(18, 'dramaMovies'); // Drama
    this.fetchSeriesByGenre(10759, 'dramaSeries'); // Drama
    this.fetchMoviesByGenre(10751, 'familyMovies'); // Family
    this.fetchSeriesByGenre(10759, 'familySeries'); // Family
    this.fetchMoviesByGenre(14, 'fantasyMovies'); // Fantasy
    this.fetchSeriesByGenre(10759, 'fantasySeries'); // Fantasy
    this.fetchMoviesByGenre(36, 'historyMovies'); // History
    this.fetchSeriesByGenre(10759, 'historySeries'); // History
    this.fetchMoviesByGenre(27, 'horrorMovies'); // Horror
    this.fetchSeriesByGenre(10759, 'horrorSeries'); // Horror
    this.fetchMoviesByGenre(10402, 'musicMovies'); // Music
    this.fetchSeriesByGenre(10759, 'musicSeries'); // Music
    this.fetchMoviesByGenre(9648, 'mysteryMovies'); // Mystery
    this.fetchSeriesByGenre(10759, 'mysterySeries'); // Mystery
    this.fetchMoviesByGenre(10749, 'romanceMovies'); // Romance
    this.fetchSeriesByGenre(10759, 'romanceSeries'); // Romance
    this.fetchMoviesByGenre(878, 'scienceFictionMovies'); // Science Fiction
    this.fetchSeriesByGenre(10759, 'scienceFictionSeries'); // Science Fiction
    this.fetchMoviesByGenre(53, 'thrillerMovies'); // Thriller
    this.fetchSeriesByGenre(10759, 'thrillerSeries'); // Thriller
    this.fetchMoviesByGenre(10752, 'warMovies'); // War
    this.fetchSeriesByGenre(10759, 'warSeries'); // War
    this.fetchMoviesByGenre(37, 'westernMovies'); // Western
    this.fetchSeriesByGenre(10759, 'westernSeries'); // Western
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
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
    async fetchMoviesByGenre(genreId, targetArrayName) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&with_genres=${genreId}`);
        this[targetArrayName] = response.data.results;
      } catch (error) {
        console.error(`Error fetching movies for genre ${genreId}:`, error);
      }
    },
    async fetchSeriesByGenre(genreId, targetArrayName) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.VUE_APP_TMDB_API_KEY}&with_genres=${genreId}`);
        this[targetArrayName] = response.data.results;
      } catch (error) {
        console.error(`Error fetching series for genre ${genreId}:`, error);
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
