<template>
  <v-container>
    <!-- Series Title and Player Switch -->
    <div class="title-switch-container">
      <h1>
        Watch: {{ seriesTitle }} Season {{ seasonNumber }} - Episode
        {{ currentEpisode ? currentEpisode.episode_number : "" }}:
        {{ currentEpisode ? currentEpisode.name : "Loading..." }}
      </h1>
      <!-- Player Button -->
      <div class="player-switch">
        <v-btn
          :color="
            useAlternativePlayer
              ? 'var(--primary-color)'
              : 'var(--primary-color-dark)'
          "
          @click="togglePlayer"
          small>
          {{ useAlternativePlayer ? "Alternative Player" : "Default Player" }}
        </v-btn>
      </div>
    </div>
    <!-- Video Player -->
    <iframe
      v-if="currentEpisode"
      :src="embedUrl"
      width="100%"
      height="550px"
      frameborder="0"
      scrolling=”no”
      overflow-y="hidden"
      allowfullscreen></iframe>
    <div v-else>Loading...</div>
    <div class="dropdown-container">
      <v-btn
        color="var(--primary-color-dark)"
        rounded
        dark
        @click="toggleTorrentsDropdown">
        Select Torrent
      </v-btn>
      <div v-if="showTorrentsDropdown">
        <div class="torrents-dropdown">
          <v-btn
            v-for="(torrent, index) in torrents"
            :key="index"
            color="var(--secondary-color)"
            dark
            rounded
            @click="openMagnetLink(torrent.magnetLink)">
            {{ torrent.filename }}
          </v-btn>
        </div>
      </div>
    </div>
    <!-- Dropdown for Seasons and Episodes -->
    <div class="dropdown-container">
      <v-btn
        color="var(--primary-color-dark)"
        rounded
        dark
        @click="toggleDropdown"
        >Select Season/Episode</v-btn
      >
      <div v-if="showDropdown">
        <!-- Seasons Dropdown -->
        <div class="seasons-dropdown">
          <v-btn
            v-for="season in totalSeasons"
            :key="season"
            color="var(--primary-color)"
            dark
            @click="changeSeason(season)"
            rounded>
            Season {{ season }}
          </v-btn>
        </div>
        <!-- Episodes Dropdown -->
        <div v-if="seasonNumber" class="episodes-dropdown">
          <v-btn
            v-for="episode in episodes"
            :key="episode.id"
            color="var(--secondary-color)"
            dark
            @click="setCurrentEpisode(episode)"
            rounded>
            Episode {{ episode.episode_number }}: {{ episode.name }}
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Similar Series Carousel -->
    <div>
      <h1 v-if="similarSeries.length > 0">Similar Series</h1>
      <v-carousel hide-delimiters v-if="similarSeries.length > 0">
        <v-carousel-item
          v-for="(group, index) in chunkedSimilarSeries"
          :key="index">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="series in group"
              :key="series.id">
              <series-card :series="series"></series-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-container>
</template>

<script>
  import axios from "axios";
  import SeriesCard from "../components/SeriesCard.vue";

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
        torrents: [],
        showTorrentsDropdown: false,
        torrentsLoaded: false,
        imdbId: "",
        currentEpisode: null,
        similarSeries: [],
        screenWidth: window.innerWidth,
        showDropdown: false,
        useAlternativePlayer: false,
        totalSeasons: [],
      };
    },
    computed: {
      embedUrl() {
        if (!this.currentEpisode) return "";
        if (this.useAlternativePlayer) {
          return `https://vidsrc.to/embed/tv/${this.tmdbId}/${this.seasonNumber}`;
        } else {
          const baseUrl = "https://vidsrc.pro/embed/tv/";
          return `${baseUrl}${this.tmdbId}/${this.seasonNumber}/${this.currentEpisode.episode_number}`;
        }
      },

      chunkedSimilarSeries() {
        return this.chunkArray(this.similarSeries, this.computeColumns());
      },
    },
    mounted() {
      window.addEventListener("resize", this.handleResize);
    },
    async created() {
      await this.fetchImdbId();
      await this.fetchSeriesTitle();
      await this.fetchSeasonEpisodes();
      await this.fetchSimilarSeries();
      await this.fetchTotalSeasons();
      window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize);
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
          if (this.episodes.length > 0) {
            this.setCurrentEpisode(this.episodes[0]);
          }
        } catch (error) {
          console.error("Error fetching season episodes:", error);
        }
      },
      async fetchImdbId() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${this.tmdbId}/external_ids?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          this.imdbId = response.data.imdb_id;
        } catch (error) {
          console.error("Error fetching IMDb ID:", error);
        }
      },
      async fetchTorrents() {
        if (!this.imdbId) {
          console.error("IMDb ID not available");
          return;
        }
        const imdbIdWithoutTT = this.imdbId.replace("tt", "");
        this.torrents = []; // Reset torrents array

        try {
          const totalPages = 30; // Total number of pages you want to fetch
          for (let page = 1; page <= totalPages; page++) {
            const response = await axios.get(
              `https://eztvx.to/api/get-torrents?imdb_id=${imdbIdWithoutTT}&page=${page}`
            );
            if (response.data && response.data.torrents) {
              const seasonRegex = /S\d{2}(?!E\d{2})/; // Regex to match 'Sxx' but not followed by 'Exx'
              const filteredTorrents = response.data.torrents
                .filter((torrent) => seasonRegex.test(torrent.filename))
                .map((torrent) => ({
                  filename: torrent.filename,
                  magnetLink: torrent.magnet_url,
                }));

              this.torrents = this.torrents.concat(filteredTorrents);
            }
          }
          this.torrentsLoaded = true; // Set flag after torrents are loaded
        } catch (error) {
          console.error("Error fetching torrents:", error);
        }
      },
      setCurrentEpisode(episode) {
        this.currentEpisode = episode;
      },
      openMagnetLink(magnetLink) {
        window.open(magnetLink, "_blank");
      },
      togglePlayer() {
        this.useAlternativePlayer = !this.useAlternativePlayer;
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
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
      switchPlayer() {
        this.useAlternativePlayer = !this.useAlternativePlayer;
      },
      toggleTorrentsDropdown() {
        this.showTorrentsDropdown = !this.showTorrentsDropdown;

        // Fetch torrents only once
        if (
          this.showTorrentsDropdown &&
          this.torrents.length === 0 &&
          !this.torrentsLoaded
        ) {
          this.fetchTorrents();
          this.torrentsLoaded = true; // Set the flag after torrents are loaded
        }
      },
      async fetchTotalSeasons() {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${this.tmdbId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
          );
          this.totalSeasons = response.data.seasons
            .map((season) => season.season_number)
            .filter((number) => number !== 0); // Filter out Season 0
        } catch (error) {
          console.error("Error fetching total seasons:", error);
        }
      },
      computeColumns() {
        if (this.screenWidth > 1024) return 3;
        else if (this.screenWidth > 600) return 2;
        return 1;
      },
      handleResize() {
        this.screenWidth = window.innerWidth;
      },
      changeSeason(season) {
        this.seasonNumber = season;
        this.fetchSeasonEpisodes();
        this.showDropdown = false;
      },
    },
  };
</script>

<style scoped>
  /* Add styles for your episode buttons and video player here */
  button {
    margin: 10px;
  }
  .series-card {
    /* Rename .movie-card to .series-card */
    max-width: 325px;
    height: auto;
    overflow: hidden;
    margin-left: 6%;
  }

  .image-container {
    /* Rename .image-container */
    position: relative;
  }

  .series-poster {
    /* Rename .movie-poster to .series-poster */
    width: 100%;
    height: auto;
    transition: filter 0.3s;
  }

  .details-overlay {
    /* Rename .details-overlay */
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
    /* Rename .details-text */
    color: white;
    text-align: center;
  }

  .series-card:hover .series-poster {
    /* Rename .movie-card:hover to .series-card:hover and .movie-poster to .series-poster */
    filter: blur(2px);
  }

  div {
    cursor: pointer;
  }
  .title-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .title-container h1 {
    margin-right: 10px;
  }

  .seasons-dropdown {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .seasons-dropdown .v-btn {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .episode-title-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .episode-title-container h2 {
    margin-right: 10px;
  }

  .episodes-dropdown {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .episodes-dropdown .v-btn {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .title-switch-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .torrents-dropdown {
    display: flex;
    flex-direction: column;
    align-items:  flex-start;
    padding: 10px;
  }

  .torrents-dropdown .v-btn {
    margin-bottom: 5px;
  }
</style>
