import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import {getuser} from './api/article.js'
import SlideVerify from 'vue-monoplasty-slide-verify';
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
Vue.use(SlideVerify)
import {formatTime} from './utils/time'

Vue.config.productionTip = false;

//请求拦截器
axios.interceptors.request.use(config=>{
	//如果存在token，请求携带这个token
	if(getCookieValue('Authorization')){
		config.headers['Authorization'] = getCookieValue('Authorization');
	}
	return config;
},error=>{
	console.log(error);
})

router.beforeEach((to,from,next)=>{
	document.title=`${to.name}	-	GOOBLOG`;
	if(getCookieValue('Authorization')){
			getuser().then(resp=>{
					if(resp.data.data!=null){
						console.log(resp.data.data)
						window.sessionStorage.setItem('user',JSON.stringify(resp.data.data));
						this.$store.state.id = resp.data.data.id;
						next();
					}else{
						clearCookie('Authorization');
						this.$message.error("登陆超时，请重新登录");
						next();
					}
			})

	}
	if(!getCookieValue('Authorization')){
		//如果没有token就拦截，如果去登录页面不拦截，如果去别的就给调到404页面
		if(to.path=='/dawdwa'||to.path=='/ddddd'){
			this.$message.warning("请先登录")
			next({ path: '/login' })
		}
		else{
			next();
		}
	}
	next();
})
//路由导航守卫，token用cookie存储，而user信息用sessionstorge存储，每次跳转之前，都要判断有无token
//如果又token但是没有用户信息就去获取，没有token就是没登陆

Vue.filter('format',formatTime)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

