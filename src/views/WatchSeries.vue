<template>
    <v-container>
      <h1>Watch {{ seriesTitle }}</h1>
      <div v-if="torrents.length > 0">
        <!-- Display series torrents here -->
        <div v-for="torrent in torrents" :key="torrent.id">
          {{ torrent.title }} - {{ torrent.size }}
        </div>
      </div>
      <div v-else>Loading...</div>
    </v-container>
  </template>
  
  <script>
    import axios from "axios";
  
    export default {
      data() {
        return {
          tmdbId: this.$route.params.tmdbId,
          seasonNumber: this.$route.params.season,
          seriesTitle: "",
          imdbId: null,
          torrents: [],
        };
      },
      async created() {
        await this.convertTmdbToImdbId();
        await this.fetchSeasonTorrents();
      },
      methods: {
        async convertTmdbToImdbId() {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/tv/${this.tmdbId}/external_ids?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
            );
            this.imdbId = response.data.imdb_id;
            this.fetchSeriesTitle();
          } catch (error) {
            console.error("Error converting TMDb ID to IMDb ID:", error);
          }
        },
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
        async fetchSeasonTorrents() {
    if (!this.imdbId) return;
  
    try {
      const response = await axios.get(`https://eztvx.to/api/get-torrents?imdb_id=${this.imdbId}`);
      const seasonRegex = new RegExp(`S${this.seasonNumber.padStart(2, '0')}E\\d{2}`, 'i');
  
      this.torrents = response.data.torrents.filter(torrent =>
        seasonRegex.test(torrent.title)
      );
    } catch (error) {
      console.error('Error fetching season torrents:', error);
    }
  },
      },
    };
  </script>
  
  <style scoped>
    /* Add your styles here */
  </style>