import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './app/router';
import store from './store';
import './registerServiceWorker';
import factories from './plugins/factories';
import { initListeners } from '@eco/infrastructure/src/initListeners';

Vue.config.productionTip = false;
initListeners();
Vue.use(factories);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
