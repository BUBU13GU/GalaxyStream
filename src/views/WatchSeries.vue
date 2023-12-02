<template>
  <v-container>
    <h1>Watch:{{ seriesTitle }} Episode {{ currentEpisode ? currentEpisode.episode_number : '' }}: {{ currentEpisode ? currentEpisode.name : '' }}</h1>
    
    <iframe v-if="currentEpisode" :src="embedUrl" frameborder="0" width="100%" height="500px" allowfullscreen></iframe>
    <div v-else>Loading...</div>
    <div v-if="episodes.length > 0">
      <v-btn color="var(--primary-color)" rounded v-for="episode in episodes" :key="episode.id" @click="setCurrentEpisode(episode)">
        Episode {{ episode.episode_number }}
      </v-btn>
    </div>
       <!-- Similar Series Carousel -->
       <h2 v-if="similarSeries.length > 0">Similar Series</h2>
    <v-carousel hide-delimiters v-if="similarSeries.length > 0">
      <v-carousel-item
        v-for="(group, index) in chunkedSimilarSeries"
        :key="index">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="series in group" :key="series.id">
            <series-card :series="series"></series-card> <!-- Use the SeriesCard component -->
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
      tmdbId: this.$route.params.tmdbId,
      seasonNumber: this.$route.params.season,
      seriesTitle: "",
      episodes: [],
      currentEpisode: null,
      similarSeries: [], 
    };
  },
  computed: {
    embedUrl() {
      if (!this.currentEpisode) return '';
      const baseUrl = 'https://vidsrc.xyz/embed/tv';
      return `${baseUrl}?tmdb=${this.tmdbId}&season=${this.seasonNumber}&episode=${this.currentEpisode.episode_number}`;
    }
  },
  async created() {
    await this.fetchSeriesTitle();
    await this.fetchSeasonEpisodes();
    await this.fetchSimilarSeries(); 
  },
  methods: {
    async fetchSeriesTitle() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${this.tmdbId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        this.seriesTitle = response.data.name;
      } catch (error) {
        console.error("Error fetching series title:", error);
      }
    },
    async fetchSeasonEpisodes() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${this.tmdbId}/season/${this.seasonNumber}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        this.episodes = response.data.episodes;
        this.setCurrentEpisode(this.episodes[0]); // Load the first episode by default
      } catch (error) {
        console.error('Error fetching season episodes:', error);
      }
    },
    setCurrentEpisode(episode) {
      this.currentEpisode = episode;
    },
  },
    async fetchSimilarSeries() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${this.tmdbId}/similar?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
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
  };
</script>

<style scoped>
  /* Add styles for your episode buttons and video player here */
  button {
    margin: 5px;
  }
  .series-card { /* Rename .movie-card to .series-card */
    max-width: 325px;
    height: auto;
    overflow: hidden;
    margin-left: 6%;
  }

  .image-container { /* Rename .image-container */
    position: relative;
  }

  .series-poster { /* Rename .movie-poster to .series-poster */
    width: 100%;
    height: auto;
    transition: filter 0.3s;
  }

  .details-overlay { /* Rename .details-overlay */
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

  .details-text { /* Rename .details-text */
    color: white;
    text-align: center;
  }

  .series-card:hover .series-poster { /* Rename .movie-card:hover to .series-card:hover and .movie-poster to .series-poster */
    filter: blur(2px);
  }
</style>