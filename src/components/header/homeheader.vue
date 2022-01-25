<template>
	<div class="head">
		<div class="left">
			<span id="name">GOO BLOG</span>
			<el-menu :router=true menu-trigger="click" active-text-color="#8bbc69" :default-active="avtiveIndex"
			         mode="horizontal">
			  <el-menu-item index="/home">首页</el-menu-item>
			  <el-menu-item index="/category/all">文章分类</el-menu-item>
			  <el-menu-item index="/tag/all">标签</el-menu-item>
			  <el-menu-item index="/archives">文章归档</el-menu-item>
			 <el-menu-item index="/write" class="write"><i class="el-icon-edit"></i>写文章</el-menu-item>
			</el-menu>
		</div>
		<div class="right">
			  <el-button type="text" v-if="!islogin" @click="tologin">登录</el-button>
			  <el-button type="text" v-if="!islogin" @click="toregist">注册</el-button>
			  <el-dropdown class="userInfo" @command="commandHandler" v-else>
			  	<span class="el-dropdown-link">
			  		<i> <img :src="user.face"> </i>
			  	</span>
			  	<el-dropdown-menu slot="dropdown" class="dropmenu">
			  		<el-dropdown-item disabled class="username">{{user.nickname}}</el-dropdown-item>
			  		<el-dropdown-item command="logout">退出登录</el-dropdown-item>
					<el-dropdown-item disabled class="lasttime">上次登录:{{user.lastLoginDate}}</el-dropdown-item>
			  	</el-dropdown-menu>
			  </el-dropdown>
		</div>
	</div>
</template>

<script>
	import {logout} from '../../api/article.js'
	export default{
		name:'homeheader',
		props:{
			avtiveIndex:String,
		},
		data(){
			return{
				user:JSON.parse(window.sessionStorage.getItem('user')),
				islogin:false
			}
		},
		created(){
			if(this.user){
				this.islogin = true
			}
		},
		watch:{
			 '$route' (to, from) {
			        this.$router.go(0);
			    }
		},
		methods:{
			tologin(){
				this.$router.push('/login');
			},
			toregist(){
				this.$router.push('/regist')
			},
			commandHandler(command){
					if(command=='logout'){
						this.$confirm('此操作将注销登录, 是否继续?', '提示', {
						          confirmButtonText: '确定',
						          cancelButtonText: '取消',
						          type: 'warning'
						        }).then(() => {
									//注销登录
						         logout();
						          //清空用户信息
								  this.clearCookie('Authorization');
						          window.sessionStorage.removeItem('user');
								  //清除vuex中保存的路由，这样保证路由一直是当前用户拥有的
						         this.$router.go(0) 
								  
						        }).catch(() => {
						          this.$message({
						            type: 'info',
						            message: '已取消'
						          });          
						        });				
					}
			},
		}
	}
</script>

<style scoped="scoped">
	html{
		padding:0;
		font-size: 15px;
	}
	.head{
		position: absolute;
		display: flex;
		height:50px;
		width:100%;
		min-width: 800px;
		z-index:100;
		background-color: #fff;
		overflow: hidden;
		justify-content: space-between;
		box-shadow: 0 2px 2px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
	}
	.left{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.right{
		min-width:20px;
	}
	#name{
		color:#242635;
		font-size: 1.8vw;
		display: inline-block;
		font-weight: 600;
		font-family:"bodoni mt";
		margin-left:20px;
		margin-right:2vw;
		line-height: 50px;
		flex:1
		}
		.el-menu-item{
			font-size:0.8vw;
			height:49px !important;
			line-height:49px !important;
			margin-right:1vw !important;
		}

		.write{
			margin-left:1.5vw !important;
		}
		.el-button{
			margin-right:2vw;
			font-size: 0.8vw;
			float: left;
			height: 100%;
		}
		.el-dropdown-link{
			margin-right: 40px;
				height:50px;
				width:50px;
				padding:auto;
		}
		.el-dropdown-link img{
			height:45px;
			width:45px;
			border-radius: 50%;
			border:1px solid #b9e598;
		}
		.el-dropdown-menu{
			text-align: center;
		}
		.username{
			color:#35495b !important;
		}
		.lasttime{
			color: #9aadbd;
			font-size: 12px;
		}
</style>

