<template>
  <v-container>
    <h1>Watch {{ seriesTitle }}</h1>
    <div v-if="episodeLoaded">
      <iframe :src="episodeUrl" width="100%" height="700px" frameborder="0" allowfullscreen></iframe>
    </div>
    <div v-else>Loading...</div>

    <!-- Season and Episode Selection -->
    <v-row>
      <v-col cols="12" sm="6">
        <v-select v-model="selectedSeason" :items="seasons" label="Select Season" @change="onSeasonChange"></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select v-model="selectedEpisode" :items="episodes" label="Select Episode" @change="onEpisodeChange"></v-select>
      </v-col>
    </v-row>

    <!-- Similar Series Carousel -->
    <h2 v-if="similarSeries.length > 0">Similar Series</h2>
    <v-carousel hide-delimiters v-if="similarSeries.length > 0">
      <v-carousel-item v-for="(group, index) in chunkedSimilarSeries" :key="index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <Series-card :series="series"></Series-card>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import axios from "axios";
import SeriesCard from '../components/SeriesCard.vue';

export default {
  name: "WatchSeries",
  components: {
    SeriesCard,
  },
  data() {
    return {
      seriesId: this.$route.params.id,
      seriesTitle: this.$route.params.title,
      episodeLoaded: false,
      episodeUrl: "",
      similarSeries: [],
      screenWidth: window.innerWidth,
      seasons: [],
      episodes: [],
      selectedSeason: null,
      selectedEpisode: null,
    };
  },
  computed: {
    chunkedSimilarSeries() {
      const columns = this.computeColumns();
      return this.chunkArray(this.similarSeries, columns);
    },
  },
  async created() {
    window.addEventListener("resize", this.handleResize);
    await this.fetchSeriesDetails();
    await this.fetchSimilarSeries();
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
    async fetchSeriesDetails() {
      try {
        // Fetch series details including seasons from your API
        const response = await axios.get(`[Your API Endpoint]/${this.seriesId}`);
        this.seriesTitle = response.data.title; // Set series title
        this.seasons = response.data.seasons; // Set seasons
        // Optionally set initial season and episode
      } catch (error) {
        console.error("Error fetching series details:", error);
      }
    },
    async fetchSimilarSeries() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${this.seriesId}/similar?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        this.similarSeries = response.data.results;
      } catch (error) {
        console.error("Error fetching similar series:", error);
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
    onSeasonChange() {
      // Update episodes based on selected season
      // Set selectedEpisode to null or first episode of the new season
    },
    onEpisodeChange() {
      // Update the embed URL based on selected episode
      if (this.selectedSeason && this.selectedEpisode) {
        this.episodeUrl = `https://vidsrc.xyz/embed/tv?tmdb=${this.seriesId}&season=${this.selectedSeason}&episode=${this.selectedEpisode}`;
        this.episodeLoaded = true;
      }
    },
  },
};
</script>

<style scoped>
  .series-card {
    max-width: 325px;
    height: auto;
    overflow: hidden;
    margin-left: 6%;
  }

  .image-container {
    position: relative;
  }

  .series-poster {
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

  .series-card:hover .series-poster {
    filter: blur(2px);
  }
</style>
