import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Index from './views/Index.vue';
import Welcome2 from './views/Welcome2.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/welcome2',
      name: 'welcome2',
      component: Welcome2,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/power-consumption',
      name: 'power-consumption',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/electricity/PowerConsumption.vue'),
    },
    {
      path: '/water-consumption',
      name: 'water-consumption',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/water/WaterConsumption.vue'),
    },
    {
      path: '/traveling-consumption',
      name: 'traveling-consumption',
      component: () => import(/* webpackChunkName: "about" */ './views/traveling/TravelingConsumption.vue'),
    },
  ],
});
