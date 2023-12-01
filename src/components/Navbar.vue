<template>
  <div>
    <v-app-bar app class="navbar">
      <!-- Logo and Toggle Button for Drawer -->
      <v-btn icon @click.stop="toggleDrawer" class="navbar-logo-button">
        <img src="@/assets/logo.png" alt="Logo" class="navbar-logo" />
      </v-btn>
      
      <v-toolbar-title v-if="title" class="hidden-sm-and-down">
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <search-bar @search="handleSearch" ></search-bar>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app class="drawer">
      <img src="@/assets/logo.png" alt="Logo" class="drawer-logo" />
      <v-list dense>
        <v-list-item @click="goToHome" class="drawer-item">
          <v-list-item-icon>
            <v-icon color="var(--primary-color)">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goToCategories" class="drawer-item">
          <v-list-item-icon>
            <v-icon color="var(--primary-color)">mdi-view-list</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Categories</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      title: "GALAXY STREAM",
      drawer: false,
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    goToCategories() {
      this.$router.push("/Categories");
    },
    handleSearch(searchTerm) {
      console.log("Search Term:", searchTerm);
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },
};
</script>

<style scoped>
/* Navigation Bar Styles */
.navbar {
  background-color:var(--accent-color-dark)!important;/* Gray background using RGB */
}


/* Title color */
.navbar .v-toolbar__title {
  color: var(--primary-color) !important; /* Force purple color for title */
}

/* Icon colors */
.navbar .v-icon {
  color: var(--primary-color) !important; /* Force purple color for icons */
}

/* Text color within buttons */
.navbar a, .navbar .v-btn__content {
  color: var(--primary-color) !important; /* Force purple color for button text */
}
/* Logo Styles */
.navbar-logo-button {
  padding: 8px; /* Existing padding */
}

.navbar-logo {
  max-width: 69px;
  max-height: 69px;
  border-radius: 50%;
}
.drawer-logo
{
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
}
/* Navigation Drawer Styles */
.drawer {
  color: var(--primary-color)!important; /* Light Gray for text */
  background-color: var(--accent-color-dark)!important; /* Darker Gray for background */
}

/* List item styles in navigation drawer */
.drawer-item {
  color: var(--primary-color); /* Black for text */
  border-bottom: 1px solid var(--accent-color-light); /* Lighter Gray border */
}

.drawer-item:hover {
  background-color: var(--primary-color-light); /* Light Purple on hover */
}

/* Responsive Styles */
@media only screen and (max-width: 960px) {
  .hidden-sm-and-down {
    display: none;
  }

  .navbar-logo-button {
    padding: 6px; /* Adjust padding for smaller screens */
  }

  .navbar-logo {
    max-width: 40px;
    max-height: 40px;
  }
}
</style>



