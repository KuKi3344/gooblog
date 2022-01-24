<template>
	<div class="main">
							<div class="title">GOO BLOG</div>
		<el-form :rules="rules" v-loading="loading" element-loading-text="努力登录中..."
			element-loading-spinne="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.6)"
			ref="userLoginParam" :model="userLoginParam" class="loginbox">
			<el-form-item prop="username">
				<el-input type="text" v-model="userLoginParam.account" placeholder="请输入手机号/邮箱/用户名">
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" auto-complete="false" v-model="userLoginParam.password" placeholder="请输入密码">
				</el-input>
			</el-form-item>
			<div style="display: flex;justify-content: space-around;">
				<el-button type="primary" size="small" style="width:40%;margin-top:15px" @click="toRegist" round>注册</el-button>
				<el-button type="primary" size="small" style="width:40%;margin-top:15px" @click="doSubmit" round>登录</el-button>
			</div>
		
		</el-form>
		
		<div class="verify" v-if="toverify">
			<slide-verify ref="slideblock" @again="onAgain" @success="onSuccess" @fail="onFail" :accuracy="accuracy"
				:slider-text="text"></slide-verify>
		</div>
	</div>
</template>

<script>
	import {tologin} from '../api/article.js'
	export default {
		name: "login",
		data() {
			return {
				userLoginParam: {
					phoneNumber: '',
					email: '',
					account:'',
					password: '',
				},
				submitParam:{
					phoneNumber: '',
					email: '',
					account:'',
					password: '',
				},
				checked: true,
				text: '向右滑',
				accuracy: 4,
				toverify: false,
				succeed: false,
				loading: false,
				rules: {
					account: [{
							required: true,
							message: '请输入您得手机号、邮箱或用户名',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 20,
							message: '账号必须为6-20个字符',
							trigger: ['blur', 'change']
						}
					],

					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							message: '密码必须为6位以上',
							trigger: ['blur', 'change']
						}
					],
				}
			}
		},
		methods: {
			onSuccess: function() {
				this.$message({
					type: 'success',
					message: '验证通过',
				});
				this.succeed = true;
				this.toverify = false;
			},
			onFail: function() {
				this.$message.error('验证失败');
			},
			onAgain: function() {
				this.$message({
					message: '请求错误，请重试',
					type: 'warning'
				});
				// 刷新
				this.$refs.slideblock.reset();
			},
			toRegist: function() {
				this.$router.push('/regist');
			},
			doSubmit: function() {
				this.$refs.userLoginParam.validate((valid) => {
					if (valid) {
						if (this.succeed) {
							var regemail =/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
							var regphone = /^1[34578]\d{9}$/;
							if(regemail.test(this.userLoginParam.account)) {
								this.submitParam.email = this.userLoginParam.account;
								this.submitParam.password = this.userLoginParam.password;
								this.submitParam.account = '';
								this.submitParam.phoneNumber = '';
							}
							else if(regphone.test(this.userLoginParam.account)){
								this.submitParam.phoneNumber = this.userLoginParam.account;
								this.submitParam.password = this.userLoginParam.password;
								this.submitParam.account = '';
								this.submitParam.email = '';
							}else{
								this.submitParam.account = this.userLoginParam.account
								this.submitParam.password = this.userLoginParam.password;
								this.submitParam.email = '';
								this.submitParam.phoneNumber = '';
							}

							this.loading = true;
							//没有用封装的方法是因为路由特殊所以需要单独写
							tologin(this.submitParam).then(resp => {
								this.loading = false;
								if (resp.data) {
									this.setCookieValue("Authorization",resp.data.data);
									//跳转首页
									this.$message({
										message: '登录成功',
										type: 'success'
									});
									this.$router.go (-1);
								}

							})
						} else {
							this.$message({
								message: '请先通过验证后再次点击登录',
								type: 'warning'
							});
							this.toverify = true;
						}
					} else {
						this.$message.error('输入格式错误，请检查！')
					}
				})
				// }
			},

		},

	}
</script>

<style scoped="scoped">
	.main{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		max-width: 1528px;
		min-width:650px;
		margin: 0 auto;
	}
	.loginbox{
		border-radius:15px;
		background-clip: padding-box;
		margin:10px auto;
		margin-top: 30px;
		width:260px;
		height:150px;
		padding: 50px;
		background-color:#ffffff;
		box-shadow: 0 15px 25px rgba(212, 212, 212, 0.8);
	}
	.verify{
		position:absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		padding:30px 10px 10px 20px;
		background-color: #ffffff;
		border-radius:5px;
		box-shadow: 0 15px 25px rgba(212, 212, 212, 0.8);
		z-index:100;
	}
	.el-form-item__content{
		display:flex;
		align-items: center;
	}
	.title{
		font-size: 40px;
		margin-top: 180px;
		width:100%;
		text-align: center;
		color:#424954;
		letter-spacing: 2px;
		font-weight: 600;
		font-family:"bodoni mt";
	}
</style>
