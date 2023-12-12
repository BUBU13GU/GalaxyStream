<template>
  <v-form @submit.prevent="submitSearch" class="search-form">
    <v-text-field
      v-model="searchQuery"
      label="Search"
      single-line
      outlined
      rounded
      dark
      color="var(--primary-color)"
      dense
      hide-details
      clearable
      @input="fetchSuggestions"
      @blur="hideSuggestions"
      class="search-input">
      <template v-slot:append>
        <v-icon class="custom-icon-color">mdi-magnify</v-icon>
      </template>
    </v-text-field>
    <v-list v-if="showSuggestions" class="suggestions-list">
      <v-list-item
        v-for="suggestion in searchSuggestions"
        :key="suggestion.id"
        @click="selectSuggestion(suggestion)"
        class="suggestion-item">
        <v-list-item-title>{{ suggestion.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-form>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        searchQuery: "",
        searchSuggestions: [],
        isLoading: false,
        showSuggestions: false,
        debounceTimer: null,
      };
    },
    methods: {
      fetchSuggestions() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(async () => {
          if (!this.searchQuery.trim()) {
            this.searchSuggestions = [];
            this.showSuggestions = false;
            return;
          }

          this.isLoading = true;
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/search/multi?api_key=${
                process.env.VUE_APP_TMDB_API_KEY
              }&query=${encodeURIComponent(this.searchQuery)}`
            );

            const normalizedInput = this.searchQuery.toLowerCase().replace(/\s+/g, "");

            this.searchSuggestions = response.data.results
              .filter(
                (item) => item.media_type === "movie" || item.media_type === "tv"
              )
              .map((item) => ({
                name: item.title || item.name,
                id: item.id,
              }))
              .reduce((unique, item) => {
                const normalizedItemName = item.name.toLowerCase().replace(/\s+/g, "");
                if (!unique.some(suggestion => suggestion.name.toLowerCase().replace(/\s+/g, "") === normalizedItemName)) {
                  unique.push(item);
                }
                return unique;
              }, [])
              .filter((item) => item.name.toLowerCase().replace(/\s+/g, "").includes(normalizedInput));

            this.showSuggestions = this.searchSuggestions.length > 0;
          } catch (error) {
            console.error("Error fetching suggestions:", error);
          } finally {
            this.isLoading = false;
          }
        }, 300);
      },
      submitSearch() {
        if (this.searchQuery) {
          this.$router.push({
            path: "/search",
            query: { q: this.searchQuery },
          });
        } else {
          this.$router.push({ path: "/" });
        }
      },
      selectSuggestion(suggestion) {
        this.searchQuery = suggestion.name;
        this.submitSearch();
      },
      hideSuggestions() {
        setTimeout(() => {
          this.showSuggestions = false;
        }, 300);
      },
    },
  };
</script>

<style scoped>
  .custom-icon-color {
    color: var(--primary-color);
  }

  .search-form {
    position: relative;
  }

  .suggestions-list {
    position: absolute;
    width: 100%;
    z-index: 10;
    margin-top: 2px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-top: none;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12);
  }

  .suggestion-item {
    color: var(--primary-text-color);
    cursor: pointer;
  }

  .suggestion-item:hover {
    background-color: var(--light-primary-color);
  }
</style>
