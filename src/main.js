import Vue from './vue.js';

import router from './router.js';
import store from './store.js';

import Layout from './Layout.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(Layout)
}).$mount('#app');
