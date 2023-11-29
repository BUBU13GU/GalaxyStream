<template>
  <v-card class="movie-card" @mouseover="showDetails = true" @mouseleave="showDetails = false">
    <div class="image-container">
      <v-img 
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        class="movie-poster"
        aspect-ratio="0.675">
        <template v-slot:placeholder>
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </template>
      </v-img>
      <div class="details-overlay" v-show="showDetails">
        <div class="details-text">
          <h3>{{ movie.title }}</h3>
          <p>Rating: {{ movie.vote_average }} / 10</p>
          <v-btn color="var(--primary-color) " rounded @click="goToMovieDetails(movie.id)">Details</v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

  
<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDetails: false
    };
  },
  methods: {
    goToMovieDetails(movieId) {
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
    }
  }
};
</script>
  
<style scoped>
.movie-card {
  max-width: 200px; /* Adjust as needed */
  overflow: hidden; /* Ensure the overlay fits within the card */
}

.image-container {
  position: relative;
}

.movie-poster {
  width: 100%;
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