<template>
  <v-container>
    <h1>All Movies</h1>

    <!-- Sorting Controls -->
    <v-row class="mb-3">
      <v-col>
        <v-btn
          color="var(--primary-color)"
          rounded
          @click="toggleAlphabeticalSort">
          Sort Alphabetically {{ alphabeticalSortOrder }}
        </v-btn>

        <v-menu
          v-model="showCalendar"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="var(--primary-color)" rounded v-bind="attrs" v-on="on"
              >Choose Year</v-btn
            >
          </template>
          <v-date-picker
            v-model="selectedYear"
            @input="sortByYear"
            :allowed-dates="allowedDates"
            color="var(--primary-color)"
            reactive
            type="year">
            <!-- Changed type to 'year' -->
            <v-spacer></v-spacer>
            <v-btn text color="var(--primary-color)" @click="clearDate"
              >Clear</v-btn
            >
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Movies List -->
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="movie in displayedMovies"
        :key="movie.id">
        <movie-card :movie="movie"></movie-card>
      </v-col>
    </v-row>

    <!-- Go to Top Button -->
    <v-btn
      fab
      dark
      fixed
      bottom
      right
      color="var(--primary-color)"
      v-show="showScrollButton"
      @click="scrollTop"
      class="elevation-12">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>

    <!-- Load More Button -->
    <v-row>
      <v-col class="text-center">
        <v-btn
          color="var(--accent-color-light)"
          rounded
          dark
          @click="loadMoreMovies"
          :disabled="loading"
          >Load More</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from "axios";
  import MovieCard from "@/components/MovieCard.vue";

  export default {
    components: {
      MovieCard,
    },
    data() {
      return {
        allMovies: [],
        displayedMovies: [],
        sortType: "alpha",
        alphabeticalSortOrder: "A-Z",
        isFlipped: false,
        totalPages: 0,
        currentPage: 1,
        loading: false,
        moviesPerPage: 20,
        showScrollButton: false,
        showCalendar: false,
        selectedYear: null,
        minYear: 1900,
        maxYear: new Date().getFullYear(),
      };
    },
    created() {
      this.fetchMoviesPage();
    },
    methods: {
      async fetchMoviesPage() {
        if (this.currentPage > this.totalPages && this.totalPages !== 0) return;

        this.loading = true;
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=${this.currentPage}`
          );
          this.allMovies = [...this.allMovies, ...response.data.results];
          this.updateDisplayedMovies();
          this.totalPages = response.data.total_pages;
          this.currentPage++;
        } catch (error) {
          console.error("Error fetching movies:", error);
        } finally {
          this.loading = false;
        }
      },
      updateDisplayedMovies() {
        // Filter out movies with a vote_average of 0 and then slice for pagination
        this.displayedMovies = this.allMovies
          .filter((movie) => movie.vote_average > 0)
          .slice(0, this.currentPage * this.moviesPerPage);

        // Apply sorting if needed
        this.sortMovies();
      },
      loadMoreMovies() {
        this.fetchMoviesPage();
      },
      toggleAlphabeticalSort() {
        this.isFlipped = !this.isFlipped;
        this.alphabeticalSortOrder = this.isFlipped ? "Z-A" : "A-Z";
        this.sortMovies();
      },
      async sortByYear() {
        if (!this.selectedYear) return;

        const selectedDate = new Date(this.selectedYear);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();

        let queryURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&sort_by=release_date.asc`;

        if (day !== 1 || month !== 1) {
          const monthStr = month.toString().padStart(2, "0");
          const dayStr = day.toString().padStart(2, "0");
          queryURL += `&primary_release_date.gte=${year}-${monthStr}-${dayStr}&primary_release_date.lte=${year}-${monthStr}-${dayStr}`;
        } else {
          queryURL += `&primary_release_year=${year}`;
        }

        this.loading = true;
        try {
          const response = await axios.get(queryURL);
          this.displayedMovies = response.data.results;
        } catch (error) {
          console.error("Error fetching movies:", error);
        } finally {
          this.loading = false;
        }
      },
      clearDate() {
        this.selectedYear = null;
        this.showCalendar = false;
        this.fetchMoviesPage();
      },
      sortMovies() {
        if (this.sortType === "alpha") {
          this.displayedMovies.sort((a, b) =>
            this.isFlipped
              ? b.title.localeCompare(a.title)
              : a.title.localeCompare(b.title)
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
  /* Existing Styles */
  .movie-card {
    max-width: 325px;
    height: auto;
    overflow: hidden;
    margin-left: 6%;
  }
  /* Additional styles for sorting controls */
  .mb-3 {
    margin-bottom: 1rem;
  }
  button {
    margin: 10px;
  }
</style>
