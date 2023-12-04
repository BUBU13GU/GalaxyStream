<template>
    <v-card class="series-card" @mouseover="showDetails = true" @mouseleave="showDetails = false">
      <div class="image-container">
        <v-img 
          :src="'https://image.tmdb.org/t/p/w500' + series.poster_path"
          class="series-poster"
          aspect-ratio="0.675">
          <template v-slot:placeholder>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </template>
        </v-img>
        <div class="details-overlay" v-show="showDetails">
          <div class="details-text">
            <h3>{{ series.name }}</h3>
            <p>Rating: {{ Math.round(series.vote_average) }} / 10</p>
            <v-btn color="var(--primary-color)" rounded @click="goToSeriesDetails(series.id)">Details</v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </template>

  <script>
  export default {
    props: {
      series: {
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
      goToSeriesDetails(seriesId) {
        this.$router.push({ name: 'SeriesDetails', params: { id: seriesId } });
      }
    }
  };
  </script>
  <script>
export default {
  props: {
    series: {
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
    goToSeriesDetails(seriesId) {
      this.$router.push({ name: 'SeriesDetails', params: { id: seriesId } });
    }
  }
};
</script>

<style scoped>
.series-card {
  max-width: 200px;
  overflow: hidden;
}

.image-container {
  position: relative;
}

.series-poster {
  width: 100%;
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

.series-card:hover .series-poster {
  filter: blur(2px);
}
</style>
