import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './app/router';
import store from './store';
import './registerServiceWorker';
import { initListeners } from '@eco/infrastructure/src/initListeners';
import TravelingFactoryPlugin from '@/infrastructure/DomainPlugins';

Vue.config.productionTip = false;
initListeners();
Vue.use(TravelingFactoryPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
