import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './axios';
import QS from 'qs';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.config = {
  disableFlushToken: true
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
