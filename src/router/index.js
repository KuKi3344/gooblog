import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push;
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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
			path:'/category/all/:id?',
			name:'文章分类',
			component:r=>require.ensure([],()=>r(require('../views/category')),
			'category')
		},
		{
			path:'/tag/all/:id?',
			name:'所有标签',
			component:r=>require.ensure([],()=>r(require('../views/tag')),
			'tag')
		},
		{
			path:'/archives/:id?',
			name:'所有归档信息',
			component:r=>require.ensure([],()=>r(require('../views/archives')),
			'archives')
		},
		{
			path:'article/:id',
			name:'查看文章',
			component:r=>require.ensure([],()=>r(require('../views/Blog/articleview')),'articleview')
		},
		{
			path:'/userinfo/:id',
			name:'个人中心',
			component:r=>require.ensure([],()=>r(require('../views/message/userinfo')),'userinfo')
		},
		{
			path:'/mycomment',
			name:'我的评论与回复',
			component:r=>require.ensure([],()=>r(require('../views/message/mycomment')),'mycomment')
		}
	]
  }
]

const router = new VueRouter({
  routes
})

export default router
