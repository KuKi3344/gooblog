<template>
	<div>
		<div>
			<img src="../assets/img/bk.png"
				class="img">
		</div>	
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
				<el-button type="primary" size="small" style="width:80%;margin-top:15px" @click="doSubmit" round>登录</el-button>
			</div>
		
		</el-form>
		
		<div class="verify" v-if="toverify">
			<slide-verify ref="slideblock" @again="onAgain" @success="onSuccess" @fail="onFail" :accuracy="accuracy"
				:slider-text="text" :imgs="imglist"></slide-verify>
		</div>
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
				imglist:['https://img.googookuki.cn/86ddd119-df48-4f92-9039-dbba86f9b8d5.png','https://img.googookuki.cn/454fada4-64c7-4484-9498-7664882a635d.jpg','https://img.googookuki.cn/21cefd67-e267-40ba-b9d9-55a39ea0266f.jpg','https://img.googookuki.cn/1704bfef-456e-421a-9519-fb6dde8b913b.jpg'],
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
					message: '请求错误,请检查网络且稍后重试',
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
								if (resp.data.code==200) {
									this.setCookieValue("Authorization",resp.data.data);
									//跳转首页
									this.$message({
										message: '登录成功',
										type: 'success'
									});
									this.$router.go(-1)
								}else{
									this.$message({
										message: '登录超时，请检查账号密码是否正确',
										type: 'error'
									});
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
	left:50%;
	top:50%;
	transform: translate(-50%,-55%);
	}
	
	.img {
		z-index: 0;
		opacity: 0.3;
		position: fixed;
		width: 100%;
		height:100%;
		filter: blur(20px);
	}
	.loginbox{
		border-radius:15px;
		background-clip: padding-box;
		margin:20px auto;
		margin-top: 30px;
		width:260px;
		height:150px;
		padding: 50px;
		background:rgba(255,255,255,0.4);
		box-shadow: 0 15px 25px rgba(212, 212, 212, 0.8);
	}
	.verify{
		position:fixed;
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
	.el-input{
		border-radius: 20px;
		opacity: 0.8;
	}
	::v-deep .el-input__inner {
	        border-radius: 20px;
			background:rgba(255,255,255,0.6);
	      }
	.title{
		font-size: 40px;
		margin-top:10px;
		width:100%;
		text-align: center;
		color:#424954;
		letter-spacing: 2px;
		font-weight: 600;
		font-family:"bodoni mt";
	}
	.el-button{
		background: rgba(255,255,255,0.5);
		border: none;
		box-shadow: 0 2px 4px rgba(232, 232, 232, 0.9); 
		color:#263a5f;
	}
</style>
