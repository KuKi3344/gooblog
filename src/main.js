import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import {
	getCookieValue,
	setCookieValue,
	clearCookie
} from './assets/js/cookie.js'
 
Vue.prototype.$axios = axios;
Vue.prototype.getCookieValue = getCookieValue;
Vue.prototype.setCookieValue = setCookieValue;
Vue.prototype.clearCookie = clearCookie;
Vue.use(VueAxios,axios)
Vue.use(ElementUI);
import {formatTime} from './utils/time'

Vue.config.productionTip = false;

//请求拦截器
axios.interceptors.request.use(config=>{
	//如果存在token，请求携带这个token
	if(window.sessionStorage.getItem('Authorization')){
		config.headers['Authorization'] = window.sessionStorage.getItem('Authorization');
	}
	return config;
},error=>{
	console.log(error);
})

Vue.filter('format',formatTime)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

