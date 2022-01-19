import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)
Vue.use(ElementUI);
import {formatTime} from './utils/time'

Vue.config.productionTip = false;



Vue.filter('format',formatTime)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

