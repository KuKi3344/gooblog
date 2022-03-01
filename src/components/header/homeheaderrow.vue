<template>
	<div class="head">
			<div class="fleft" >
				<el-menu :router=true menu-trigger="click" active-text-color="#6dc374" :default-active="avtiveIndex"  mode="horizontal">
				  <el-menu-item index="/home"><i class="el-icon-s-home"></i></el-menu-item>
				  <el-menu-item index="/category/all"><i class="el-icon-menu"></i></el-menu-item>
				  <el-menu-item index="/tag/all"><i class="el-icon-s-flag"></i></el-menu-item>
				  <el-menu-item index="/archives"><i class="el-icon-collection"></i></el-menu-item>
				 <el-menu-item index="/write" class="write"><i class="el-icon-edit"></i></el-menu-item>
				  <el-menu-item :index="'/userinfo/'+user.id" class="person" v-if="user">
					  <el-badge :value="msg" :max="99" class="item" v-show="msg!=0" ><i class="el-icon-user-solid"></i></el-badge><i class="el-icon-user-solid" v-show="msg==0"></i></el-menu-item>
				</el-menu>
				<div v-if="!this.$store.state.login" class="fright">
					<el-button type="text" round @click="tologin" size="mini">登录</el-button>
				</div>
				<div class="fright" v-else>
					<el-button round  @click="logout" size="mini" type="text" style="font-size: 18px !important; "><i class="el-icon-s-promotion"></i></el-button>
				</div>
			</div>
	</div>
</template>
<script>
	import {logout} from '../../api/article.js'
	export default{
		name:'homeheaderrow',
		props:{
			avtiveIndex:String,
		},
		data(){
			return{
				user:JSON.parse(window.sessionStorage.getItem('user')),
				islogin:false,
				msg:0
			}
		},
		methods:{
			tofold(){
				if(this.screenwid<1140){
					this.fold = true;
				}else{
					this.fold = false;
				}
			},
			tologin(){
				this.$router.push('/login');
			},
				logout(){
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
				
			},
		}
	}
</script>

<style scoped="scoped">
	html{
		padding:0;
		font-size: 15px;
	}
	.el-icon-s-home{
		color:#1eb6a4 !important;
	}
	.el-icon-menu{
		color:#31afdc !important;
	}
	.el-icon-s-flag{
		color:#e76478 !important;
	}
	.el-icon-collection{
		color:#73c761 !important;
	}
	.el-icon-edit{
		color:#ebb331 !important;
	}
	.el-icon-s-promotion{
		color:#669886;
	}
	.el-icon-user-solid{
		color:#77afaf !important;
	}
	.head{
		position:fixed;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height:50px;
		width:100%;
		z-index:999 !important;
		justify-content: space-around;
		background:rgba(217, 224, 226, 0.8);
		box-shadow: 0 2px 2px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
	}
	.fleft{
		display: flex;
		justify-content: center;
		align-items:center;
		flex-direction: row;
		width:100%;
		margin: 0 !important;
		height:40px;
	}
	.fright{
		height:40px;
		width:70px;
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
		margin-right: 10px;
	}
	.fright button{
		width:30px;
	}

		.el-menu{
			width:70%;
			height:100%;
			display: flex;
			flex-direction:row;
			justify-content: center;
			text-align: center;
			background: none;
			
		}
		.el-menu-item{
			font-size:13px;
			color:#939393;
			width:30px !important;
			height:39px !important;
			line-height:30px !important;
			padding:5px;
			margin-right:5px !important; 
			margin-left: 0;
		}
		.fold{
			width:80px;
		}
		.el-button{
			float: left;
			height: 100%;
		}
		.el-dropdown-link{
			position:absolute;
			left:50%;
			transform: translateX(-50%);
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
			color:#5b5b5b !important;
			font-size: 12px;
			display: block;
			width:100%;
			text-align: center;
			margin-top: 80px;
			margin-bottom: 10px;
		}
		.lasttimebefore{
			display: block;
			color: #9aadbd;
			width:100%;
			text-align: center;
			font-size: 12px;
		}
		.lasttime{
			display: block;
			color: #9aadbd;
			width:100%;
			text-align: center;
			font-size: 12px;
		}
		.el-button{
			height:30px;
			font-size: 12px !important;
			margin:5px;
		}
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background:rgba(222, 236, 231, 0.8);
}

</style>

