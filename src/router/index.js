import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
	redirect:'/home',
	children:[
		{
			path:'/home',
			name:'home',
			component: r=>require.ensure([],()=>r(require('../views/index')),
			'index')
		},
		{
			path:'/category/all',
			name:'category',
			component:r=>require.ensure([],()=>r(require('../views/category')),
			'category')
		},
		{
			path:'/tag/all',
			name:'/tag',
			component:r=>require.ensure([],()=>r(require('../views/tag')),
			'tag')
		},
		{
			path:'/archives',
			name:'archives',
			component:r=>require.ensure([],()=>r(require('../views/archives')),
			'archives')
		},
		{
			path:'/write',
			name:'write',
			component:r=>require.ensure([],()=>r(require('../views/write')),
			'write')
		},
		{
			path:'article/:id',
			name:'view',
			component:r=>require.ensure([],()=>r(require('../views/articleview')),'article')
		},
	]
  }
]

const router = new VueRouter({
  routes
})

export default router
