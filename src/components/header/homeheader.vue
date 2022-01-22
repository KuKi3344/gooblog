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
			  <el-button type="text">登录</el-button>
			  <el-button style="color:#57b3dd" type="text">注册</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'homeheader',
		props:{
			avtiveIndex:String,
		},
		data(){
			return{
				user:{
					login:false,
					avatar:'',//头像
				}
			}
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
		min-width: 960px;
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
		font-size: 25px;
		display: inline-block;
		font-weight: 600;
		font-family:"bodoni mt";
		margin-left:20px;
		margin-right:2vw;
		line-height: 50px;
		flex:1
		}
		.el-menu-item{
			font-size:13px;
			height:49px !important;
			line-height:49px !important;
			margin-right:1vw !important;
		}

		.write{
			margin-left:1.5vw !important;
		}
		.el-button{
			margin-right:2vw;
			font-size: 14px;
			float: left;
			height: 100%;
		}
</style>

