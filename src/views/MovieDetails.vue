<template>
  <v-container>
    <!-- Display Movie Details from TMDb API -->
    <v-row v-if="movie">
      <!-- Movie Poster -->
      <v-col cols="12" md="4">
        <v-img 
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          aspect-ratio="0.675"
          class="movie-poster"
        ></v-img>
      </v-col>

      <!-- Movie Information -->
      <v-col cols="12" md="8">
        <v-row>
        <h2>{{ movie.title }}</h2>
      </v-row>
        <v-row>
        <v-card>
          <v-card-text>
            <p><strong>Genres:</strong> {{ movie.genres.map(genre => genre.name).join(', ') }}</p>
            <p><strong>Year:</strong> {{ movie.release_date.split('/')[0] }}{{ movie.release_date.split('/')[2] }}{{ movie.release_date.split('/')[1]}}</p>
            <p><strong>Rating:</strong> {{ movie.vote_average }} / 10</p>
            <p><strong>Description:</strong> {{ movie.overview }}</p>
          </v-card-text>
        </v-card>
      </v-row>
      
        <!-- Buttons -->
        <v-row>
        <v-btn color="var(--primary-color)" rounded @click="goToWatchMoviePage">Watch Movie</v-btn>
        <v-btn color="var(--accent-color-light)" rounded @click="showTrailer">Show Trailer</v-btn>
      </v-row>
      </v-col>
    </v-row>

    <div v-else>
      Loading movie details...
    </div>

    <!-- Trailer Modal -->
    <v-dialog v-model="showTrailerModal" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ movie.title }} - Trailer</span>
        </v-card-title>
        <v-card-text>
          <iframe
            v-if="trailerUrl"
            width="800"
            height="450"
            :src="trailerUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="var(--accent-color-light)" rounded @click="closeTrailer">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movie: null,
      showTrailerModal: false,
      trailerUrl: null
    };
  },
  async created() {
    await this.fetchMovieDetails();
  },
  methods: {
    async fetchMovieDetails() {
      try {
        const movieId = this.$route.params.id;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`);
        this.movie = response.data;
      } catch (error) {
        console.error('Error fetching movie details from TMDb:', error);
      }
    },
    goToWatchMoviePage() {
      this.$router.push({ name: 'WatchMovie', params: { id: this.movie.id } });
    },
    async showTrailer() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.movie.id}/videos?api_key=${process.env.VUE_APP_TMDB_API_KEY}`);
        const trailer = response.data.results.find(video => video.type === 'Trailer');
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
          this.showTrailerModal = true;
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    },
    closeTrailer() {
      this.showTrailerModal = false;
      this.trailerUrl = null;
    }
  }
};
</script>

<style scoped>
.movie-poster {
  width: 100%;
  height: auto;
}
</style>
