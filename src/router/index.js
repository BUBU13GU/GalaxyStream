import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SearchResults from '../views/SearchResults.vue';
import MovieDetails from '../views/MovieDetails.vue';
import SeriesDetails from '../views/SeriesDetails.vue';
import WatchMovie from '../views/WatchMovie.vue';
import Categories from '../views/Categories.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
  },
  {
    path: '/series/:id',
    name: 'SeriesDetails',
    component: SeriesDetails,
  },
  {
    path: '/watch-movie/:id',
    name: 'WatchMovie',
    component: WatchMovie
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
