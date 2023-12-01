<template>
  <v-form @submit.prevent="submitSearch">
    <v-text-field
      v-model="searchQuery"
      label="Search"
      single-line
      outlined
      rounded
      dense
      hide-details
    >
      <!-- Use the slot for the append icon -->
      <template v-slot:append>
        <v-icon class="custom-icon-color">
          mdi-magnify
        </v-icon>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  watch: {
    searchQuery(newValue) {
      if (newValue === '') {
        this.$router.push('/');
      }
    }
  },
  methods: {
    submitSearch() {
      if (this.searchQuery && this.$route.query.q !== this.searchQuery) {
        this.$router.push({ path: '/search', query: { q: this.searchQuery } });
      }
    }
  }
};
</script>

<style scoped>
.custom-icon-color {
  color: var(--primary-color);
}

</style>
