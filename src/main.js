import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
import {formatTime} from './utils/time'

Vue.directive('title',function(el,binding){
	document.title = el.dataset.title
})

Vue.filter('format',formatTime)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
