import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './app/router';
import store from './store';
import './registerServiceWorker';
import { initListeners } from '@eco/infrastructure/src/initListeners';
import DomainFactoryPlugin from '@/infrastructure/DomainPlugins';

Vue.config.productionTip = false;
initListeners();
Vue.use(DomainFactoryPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
