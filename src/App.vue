<template>
  <v-app>
    <div class="particle-background"></div>
    <v-main>
      <Navbar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
};
</script>