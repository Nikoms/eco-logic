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
    { path: '/electricity', name: 'electricity', component: () => import('./electricity/views/Home.vue') },
    { path: '/water', name: 'water', component: () => import('./water/views/Home.vue') },
    { path: '/traveling', name: 'traveling', component: () => import('./traveling/views/Home.vue') },
    { path: '/fuel-oil', name: 'fuel-oil', component: () => import('./fuel-oil/views/Home.vue') },
  ],
});
