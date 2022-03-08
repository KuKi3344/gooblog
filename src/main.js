import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import {
	Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import {
	getuser
} from './api/article.js'
import SlideVerify from 'vue-monoplasty-slide-verify';
import {
	getCookieValue,
	setCookieValue,
	clearCookie
} from './assets/js/cookie.js'
import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/googlecode.css'  

Vue.prototype.$axios = axios;
Vue.prototype.getCookieValue = getCookieValue;
Vue.prototype.setCookieValue = setCookieValue;
Vue.prototype.clearCookie = clearCookie;
Vue.prototype.imgsrc = "https://img0.baidu.com/it/u=2869476812,1505860764&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.use(SlideVerify)
import {
	formatTime
} from './utils/time'

Vue.config.productionTip = false;

//请求拦截器
axios.interceptors.request.use(config => {
	//如果存在token，请求携带这个token
	if (getCookieValue('Authorization')) {
		config.headers['Authorization'] = getCookieValue('Authorization');
	}
	return config;
}, error => {
	console.log(error);
})

router.beforeEach((to, from, next) => {

	if (getCookieValue('Authorization')) {
		getuser().then(resp => {
			if (resp.data.data != null) {
				window.sessionStorage.setItem('user', JSON.stringify(resp.data.data));
				store.state.id = resp.data.data.id;
				store.state.login = true;
				document.title = `${to.name}	-	GOOBLOG`;
				next();
			} else {
				clearCookie('Authorization');
				Message.error("登陆超时，请重新登录");
			}
		})

	}
	if (!getCookieValue('Authorization')) {
		//如果没有token就拦截，如果去登录页面不拦截，如果去别的就给调到404页面
		if (to.name == '写文章') {
			Message.warning("请先登录")
		} else {
			document.title = `${to.name}	-	GOOBLOG`;
			next();
		}
	}
})
//路由导航守卫，token用cookie存储，而user信息用sessionstorge存储，每次跳转之前，都要判断有无token
//如果又token但是没有用户信息就去获取，没有token就是没登陆
Vue.filter('format', formatTime)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
