import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path:'/login',
		name:'登录',
		component: r=>require.ensure([],()=>r(require('../views/login')),
		'login')
	},
	{
		path:'/regist',
		name:'注册',
		component: r=>require.ensure([],()=>r(require('../views/regist')),
		'regist')
	},
	{
		path:'/write/:id?',
		name:'写文章',
		component:r=>require.ensure([],()=>r(require('../views/Blog/Blogwrite')),
		'Blogwrite')
	},
  {
    path: '/',
    name: '首页',
    component: Home,
	redirect:'/home',
	children:[
		{
			path:'/home',
			name:'首页',
			component: r=>require.ensure([],()=>r(require('../views/index')),
			'index')
		},
		{
			path:'/category/all',
			name:'文章分类',
			component:r=>require.ensure([],()=>r(require('../views/category')),
			'category')
		},
		{
			path:'/tag/all',
			name:'所有标签',
			component:r=>require.ensure([],()=>r(require('../views/tag')),
			'tag')
		},
		{
			path:'/archives',
			name:'文章归档',
			component:r=>require.ensure([],()=>r(require('../views/archives')),
			'archives')
		},
		{
			path:'article/:id',
			name:'查看文章',
			component:r=>require.ensure([],()=>r(require('../views/Blog/articleview')),'articleview')
		},
	]
  }
]

const router = new VueRouter({
  routes
})

export default router
