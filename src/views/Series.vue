<template>
  <v-container>
    <h1>All Series</h1>

    <!-- Sorting Controls -->
    <v-row class="mb-3">
      <v-col>
        <v-btn color="var(--primary-color)" dark rounded @click="toggleAlphabeticalSort">
          Sort Alphabetically {{ alphabeticalSortOrder }}
        </v-btn>

        <v-menu v-model="showCalendar" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="var(--primary-color)" rounded dark v-bind="attrs" v-on="on">Choose Year</v-btn>
          </template>
          <v-date-picker v-model="selectedYear" @input="sortByYear" :allowed-dates="allowedDates" color="var(--primary-color)" reactive type="year">
            <v-spacer></v-spacer>
            <v-btn text color="var(--primary-color)" @click="clearDate">Clear</v-btn>
          </v-date-picker>
        </v-menu>
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
        <v-btn color="var(--accent-color-light)" rounded dark @click="loadMoreSeries" :disabled="loading">Load More</v-btn>
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
      sortType: "alpha",
      alphabeticalSortOrder: "A-Z",
      isFlipped: false,
      totalPages: 0,
      currentPage: 1,
      loading: false,
      seriesPerPage: 20,
      calendarSearchActive: false,
      showScrollButton: false,
      showCalendar: false,
      selectedYear: null,
      minYear: 1900,
      maxYear: new Date().getFullYear(),
    };
  },
  created() {
    this.fetchSeriesPage();
  },
  methods: {
    async fetchSeriesPage() {
      if (this.currentPage > this.totalPages && this.totalPages !== 0) return;
      if (this.calendarSearchActive) return;

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
      this.displayedSeries = this.allSeries
    .filter((series) => series.vote_average > 0)
    .slice(0, this.currentPage * this.seriesPerPage);


      this.sortSeries();
    },
    loadMoreSeries() {
  if (this.calendarSearchActive) {
    // Logic to load more series based on the calendar search
  } else {
    this.fetchSeriesPage();
  }
},
    toggleAlphabeticalSort() {
      this.isFlipped = !this.isFlipped;
      this.alphabeticalSortOrder = this.isFlipped ? "Z-A" : "A-Z";
      this.sortSeries();
    },
    async sortByYear() {
      if (!this.selectedYear) return;
      this.calendarSearchActive = true;

      const selectedDate = new Date(this.selectedYear);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      let queryURL = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&sort_by=first_air_date.asc`;

      if (day !== 1 || month !== 1) {
        const monthStr = month.toString().padStart(2, "0");
        const dayStr = day.toString().padStart(2, "0");
        queryURL += `&first_air_date.gte=${year}-${monthStr}-${dayStr}&first_air_date.lte=${year}-${monthStr}-${dayStr}`;
      } else {
        queryURL += `&first_air_date_year=${year}`;
      }

      this.loading = true;
      try {
        const response = await axios.get(queryURL);
        this.displayedSeries = response.data.results;
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        this.loading = false;
      }
    },
    clearDate() {
      this.selectedYear = null;
      this.showCalendar = false;
      this.calendarSearchActive = false;
      this.fetchSeriesPage();
    },
    sortSeries() {
      if (this.sortType === "alpha") {
        this.displayedSeries.sort((a, b) => 
          this.isFlipped ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
        );
      }
    },
    allowedDates(val) {
      const year = new Date(val).getFullYear();
      return year >= this.minYear && year <= this.maxYear;
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
