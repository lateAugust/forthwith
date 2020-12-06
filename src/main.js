import Vue from 'vue';
import App from './App';
import store from './store';

import methods from './utils/methods';

Vue.config.productionTip = false;
Vue.prototype.$methods = methods;

App.mpType = 'app';

const app = new Vue({
  ...App,
  store
});
app.$mount();
