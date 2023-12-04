<template>
  <v-app>
    <v-main>
      <div class="particle-background"></div>
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