<template>
  <v-container>
    <!-- Display Series Details from TMDb API -->
    <v-row v-if="series">
      <!-- Series Poster -->
      <v-col cols="12" md="4">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${series.poster_path}`"
          aspect-ratio="0.675"
          class="series-poster"></v-img>
      </v-col>

      <!-- Series Information -->
      <v-col cols="12" md="8">
        <h2>{{ series.name }}</h2>
        <v-card>
          <v-card-text>
            <p>
              <strong>Genres:</strong>
              {{ series.genres.map((genre) => genre.name).join(", ") }}
            </p>
            <p><strong>First Air Date:</strong> {{ series.first_air_date }}</p>
            <p><strong>Rating:</strong> {{ Math.round(series.vote_average) }} / 10</p>
            <p><strong>Description:</strong> {{ series.overview }}</p>
          </v-card-text>
        </v-card>

        <!-- Season Selection Dropdown Button -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="var(--primary-color)" rounded v-bind="attrs" v-on="on">
              Select a Season
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="season in validSeasons"
              :key="season.season_number"
              @click="goToWatchSeries(season.season_number)">
              <v-list-item-title
                >Season {{ season.season_number }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- Buttons -->
        <v-btn color="var(--accent-color-light)" rounded @click="showTrailer">Show Trailer</v-btn>
      </v-col>
    </v-row>

    <div v-else>Loading series details...</div>

    <!-- Trailer Modal -->
    <v-dialog v-model="showTrailerModal" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ series.name }} - Trailer</span>
        </v-card-title>
        <v-card-text>
          <iframe
            v-if="trailerUrl"
            width="800"
            height="450"
            :src="trailerUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen></iframe>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeTrailer">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        series: null,
        showTrailerModal: false,
        trailerUrl: null,
        validSeasons: [],
      };
    },
    async created() {
      await this.fetchSeriesDetails();
    },
    methods: {
      async fetchSeriesDetails() {
        try {
          const seriesId = this.$route.params.id;
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          this.series = response.data;
          // Filter out season 0
          this.validSeasons = this.series.seasons.filter(
            (season) => season.season_number !== 0
          );
        } catch (error) {
          console.error("Error fetching series details from TMDb:", error);
        }
      },
      goToWatchSeries(seasonNumber) {
    if (!seasonNumber) return;
    this.$router.push({
      name: 'WatchSeries',
      params: {
        tmdbId: this.series.id,
        season: seasonNumber,
        seriesTitle: this.series.name
      }
    });
  },

      async showTrailer() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${this.series.id}/videos?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          const trailer = response.data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailer) {
            this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
            this.showTrailerModal = true;
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      },
      closeTrailer() {
        this.showTrailerModal = false;
        this.trailerUrl = null;
      },
    },
  };
</script>

<style scoped>
  .series-poster {
    width: 100%;
    height: auto;
  }
  button {
    margin: 10px;
  }
</style>
