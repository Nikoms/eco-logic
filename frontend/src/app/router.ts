import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/app/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', redirect: '/home' },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/electricity',
      name: 'electricity',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './electricity/views/Home.vue'),
    },
    {
      path: '/water',
      name: 'water',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './water/views/Home.vue'),
    },
    {
      path: '/traveling',
      name: 'traveling',
      component: () => import(/* webpackChunkName: "about" */ './traveling/views/Home.vue'),
    },
  ],
});
