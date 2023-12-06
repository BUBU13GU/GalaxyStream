<template>
    <v-container>
      <h1>All Series</h1>
  
      <!-- Sorting Controls -->
      <v-row class="mb-3">
        <v-col>
          <v-btn color="var(--primary-color)" rounded @click="toggleAlphabeticalSort">
            Sort Alphabetically {{ alphabeticalSortOrder }}
          </v-btn>
  
          <v-menu v-model="showCalendar" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="var(--primary-color)" rounded v-bind="attrs" v-on="on">Choose Year</v-btn>
            </template>
            <v-date-picker v-model="selectedYear" @input="showCalendar = false" @change="sortByYear" :allowed-dates="allowedDates"></v-date-picker>
          </v-menu>
  
          <v-btn color="var(--primary-color)" rounded @click="flipOrder">Flip Order</v-btn>
        </v-col>
      </v-row>
  
      <!-- Series List -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="series in displayedSeries" :key="series.id">
          <series-card :series="series"></series-card>
        </v-col>
      </v-row>
  
      <!-- Go to Top Button -->
      <v-btn fab dark fixed bottom right color="var(--primary-color)" v-show="showScrollButton" @click="scrollTop" class="elevation-12">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
  
      <!-- Load More Button -->
      <v-row>
        <v-col class="text-center">
          <v-btn color="secondary" @click="loadMoreSeries" :disabled="loading">Load More</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import axios from "axios";
import SeriesCard from "@/components/SeriesCard.vue";

export default {
  components: {
    SeriesCard,
  },
  data() {
    return {
      allSeries: [],
      displayedSeries: [],
      sortType: 'alpha',
      alphabeticalSortOrder: 'A-Z',
      isFlipped: false,
      totalPages: 0,
      currentPage: 1,
      loading: false,
      seriesPerPage: 20,
      showScrollButton: false,
      showCalendar: false,
      selectedYear: new Date().getFullYear(),
    };
  },
  computed: {
    sortedSeries() {
      // Sorting logic remains the same
      return this.displayedSeries;
    },
  },
  methods: {
    async fetchSeriesPage() {
      if (this.currentPage > this.totalPages && this.totalPages !== 0) return;

      this.loading = true;
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=${this.currentPage}`
        );
        this.allSeries = [...this.allSeries, ...response.data.results];
        this.updateDisplayedSeries();
        this.totalPages = response.data.total_pages;
        this.currentPage++;
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        this.loading = false;
      }
    },
    updateDisplayedSeries() {
      this.displayedSeries = this.allSeries.slice(0, this.currentPage * this.seriesPerPage);
      this.sortSeries();
    },
    loadMoreSeries() {
      this.fetchSeriesPage();
    },
    toggleAlphabeticalSort() {
      this.isFlipped = !this.isFlipped;
      this.alphabeticalSortOrder = this.isFlipped ? 'Z-A' : 'A-Z';
      this.sortSeries();
    },
    sortByYear() {
      this.sortType = "year";
      this.sortSeries();
    },
    sortSeries() {
      if (this.sortType === 'alpha') {
        this.displayedSeries.sort((a, b) => this.isFlipped ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
      } else {
        this.displayedSeries.sort((a, b) => a.first_air_date.localeCompare(b.first_air_date));
        if (this.selectedYear) {
          this.displayedSeries = this.displayedSeries.filter(series => new Date(series.first_air_date).getFullYear() === this.selectedYear);
        }
      }
    },
    allowedDates(val) {
      return val <= new Date().getFullYear();
    },
    flipOrder() {
      this.displayedSeries.reverse();
    },
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
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
  .mb-3 {
    margin-bottom: 1rem;
  }
  button {
    margin: 10px;
  }
  </style>
  