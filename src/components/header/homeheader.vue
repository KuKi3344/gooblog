<template>
	<div class="head">
		<div v-show="!isCollapse"
			style="display: flex;flex-direction: column;justify-content: space-between;width:100%;height:100%;">
			<div class="left">
				<span id="name">GOO BLOG</span>
				<div v-if="this.$store.state.login" style="width: 100%;">
					<span class="el-dropdown-link">
						<div class="mypic">
							<img :src="user.face" v-if="user.face">
							<img :src="imgsrc" v-else>
						</div>

					</span>
					<span class="username">{{user.nickname}}</span>
				</div>
				<el-menu :router=true menu-trigger="click" active-text-color="#28352c" :default-active="avtiveIndex">
					<el-menu-item index="/home"><i class="el-icon-s-home"></i>首页</el-menu-item>
					<el-menu-item index="/category/all"><i class="el-icon-menu"></i>文章分类</el-menu-item>
					<el-menu-item index="/tag/all"><i class="el-icon-s-flag"></i>标签</el-menu-item>
					<el-menu-item index="/archives"><i class="el-icon-collection"></i>文章归档</el-menu-item>
					<el-menu-item index="/write" class="write"><i class="el-icon-edit"></i>写文章</el-menu-item>
					<el-menu-item :index="'/userinfo/'+user.id" class="person" v-if="user"><i
							class="el-icon-user-solid"></i>
						<el-badge :value="msg" :max="99" class="item" v-show="msg!=0">个人中心</el-badge><span
							v-show="msg==0">个人中心</span>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="right" v-if="!this.$store.state.login">
				<el-button round @click="tologin" size="small" type="text">登录</el-button>
			</div>
			<div class="right" v-else>
				<el-button round @click="logout" type="text" size="small">退出登录</el-button>
			</div>
		</div>

		<div v-show="isCollapse"
			style="display: flex;flex-direction: column;justify-content: space-between;width:100%;height:100%;">
			<div class="fleft">
				<el-menu :router=true menu-trigger="click" active-text-color="#28352c" :default-active="avtiveIndex">
					<el-menu-item index="/home"><i class="el-icon-s-home"></i></el-menu-item>
					<el-menu-item index="/category/all"><i class="el-icon-menu"></i></el-menu-item>
					<el-menu-item index="/tag/all"><i class="el-icon-s-flag"></i></el-menu-item>
					<el-menu-item index="/archives"><i class="el-icon-collection"></i></el-menu-item>
					<el-menu-item index="/write" class="write"><i class="el-icon-edit"></i></el-menu-item>
					<el-menu-item :index="'/userinfo/'+user.id" class="person" v-if="user">
						<el-badge :value="msg" :max="99" class="item" v-show="msg!=0"><i class="el-icon-user-solid"></i>
						</el-badge><i class="el-icon-user-solid" v-show="msg==0"></i>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="fright" v-if="!this.$store.state.login">
				<el-button round @click="tologin" size="small" type="text">登录</el-button>
			</div>
			<div class="fright" v-else>
				<el-button round @click="logout" size="small" type="text" style="font-size: 18px !important; "><i
						class="el-icon-s-promotion"></i></el-button>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		logout,
		getnoreadmes
	} from '../../api/article.js'
	export default {
		name: 'homeheader',
		props: {
			avtiveIndex: String,
		},
		data() {
			return {
				user: JSON.parse(window.sessionStorage.getItem('user')),
				islogin: false,
				isCollapse: false,
				screenWidth: document.body.clientWidth,
				msg: 0
			}
		},
		created() {
			this.screenWidth = document.body.clientWidth;
			if (this.screenWidth < 1140) {
				this.isCollapse = true;
			}
			

		},
		mounted() {
			const that = this
			window.onresize = () => {
				return (() => {
					window.screenWidth = document.body.clientWidth;
					that.screenWidth = window.screenWidth;
				})();
			}
			if (this.$store.state.id) {
				this.getnoread();
				var inc = 10000;
				setInterval(this.getnoread, inc);
			}
		},
		beforeDestroy(){
			clearInterval();
		},
		watch: {
			/* 监听*/
			screenWidth(val) {
				this.screenWidth = val;
				if (val < 1140) {
					this.isCollapse = true;
				} else {
					this.isCollapse = false;
				}
			}
		},
		methods: {
			getnoread() {
				getnoreadmes().then(resp => {
					if (resp.data.code == 200) {
						this.msg = resp.data.data.length;
					}
				}).catch(err => {
					this.$message.error('获取新消息失败')
				})
			},
			tologin() {
				this.$router.push('/login');
			},
			logout() {
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
	html {
		padding: 0;
		font-size: 15px;
	}

	.el-icon-s-home {
		color: #01cec4 !important;
	}

	.el-icon-menu {
		color: #30b3da !important;
	}

	.el-icon-s-flag {
		color: #da6b6d !important;
	}

	.el-icon-collection {
		color: #48c774 !important;
	}

	.el-icon-edit {
		color: #d6b06e !important;
	}

	.el-icon-s-promotion {
		color: #669886;
	}

	.el-icon-user-solid {
		color: #6ea1a1 !important;
	}

	.head {
		position: fixed;
		display: flex;
		height: 100%;
		width: 180px;
		min-width: 10vw;
		z-index: 999;
		flex-direction: column;
		justify-content: space-between;
		box-shadow: 0 2px 2px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
	}

	.left,
	.fleft {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: flex-start;
	}

	.left,
	.right {
		width: 180px !important;
	}

	.right,
	.fright {
		min-height: 100px;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fleft {
		margin-top: 20px;
	}

	.right button {
		font-size: 15px;
	}

	.fright {
		flex-direction: column;
	}

	#name {
		color: #434343;
		width: 100%;
		text-align: center;
		font-size: 18px;
		display: inline-block;
		font-weight: 600;
		font-family: "DM Sans", sans-serif;
		margin-bottom: 30px;
		line-height: 50px;
		flex: 1
	}

	.el-badge .el-button {
		margin: 5px;
	}

	.el-menu {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 20px;
		background: none !important;
	}

	.el-menu-item {
		font-size: 13px;
		color: #595959 !important;
		width: 100%;
		height: 52px !important;
		line-height: 52px !important;
		margin-bottom: 2vh;
		padding-left: 30px !important;
	}

	.person {
		line-height: 30px !important;
		padding: 9px;
	}

	.fold {
		width: 80px;
	}

	.el-button {
		margin-right: 2vw;
		font-size: 0.9vw;
		float: left;
		height: 100%;
	}

	.el-dropdown-link {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		height: 50px;
		width: 50px;
		padding: auto;
	}
	.mypic{
		 width: 55px;
		 height: 55px;
		 border-radius: 50%;
		 border: 1px solid #b9e598;
		 display: flex;
		 justify-content: center;
		 overflow: hidden;
	}
	.el-dropdown-link img {
		height: 55px;
		width: auto;
	}

	.el-dropdown-menu {
		text-align: center;
	}

	.username {
		color: #49545b !important;
		font-size: 13px;
		display: block;
		width: 100%;
		text-align: center;
		margin-top: 70px;
		margin-bottom: 10px;
	}

	.lasttimebefore {
		display: block;
		color: #7a8a96;
		width: 100%;
		text-align: center;
		font-size: 12px;
	}

	.lasttime {
		display: block;
		color: #8798a5;
		width: 100%;
		text-align: center;
		font-size: 12px;
	}

	.el-button {
		height: 30px;
		font-size: 13px !important;
		margin: 10px;
	}
</style>
