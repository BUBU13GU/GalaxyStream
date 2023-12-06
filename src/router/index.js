import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Categories from '../views/Categories.vue'
import Movies from '../views/Movies.vue';
import Series from '../views/Series.vue';
import SearchResults from '../views/SearchResults.vue';
import MovieDetails from '../views/MovieDetails.vue';
import SeriesDetails from '../views/SeriesDetails.vue';
import WatchMovie from '../views/WatchMovie.vue';
import WatchSeries from '../views/WatchSeries.vue';


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
    path: '/movies',
    name: 'Movies',
    component: Movies,
  },
  {
    path: '/series',
    name: 'Series',
    component: Series,
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
  {
    path: '/watch-series/:tmdbId/season/:season',
    name: 'WatchSeries',
    component: WatchSeries,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
