<template>
	<div style="display: flex;justify-content: center;z-index: 99 !important;">
		<el-container>
			<el-main class="me-intro">
				<div class="head">
					<div class="img">
						<img :src="user.face" v-if="user.face">
						<img :src="imgsrc" v-else>
						<div class="head-title">
							<div class="name">
								{{user.nickname}}
							</div>
						</div>

					</div>

				</div>
				<div class="body">
					<div class="main-head">
						<div class="head-right" v-if="this.$store.state.id == user.id">
							<el-badge :value="comment" :max="99" class="item" v-show="comment>0">
								<el-button size="small" @click="view()">评论/回复</el-button>
							</el-badge>
							<el-button size="small" @click="view" v-show="comment<1">评论/回复</el-button>
							<el-button size="small" @click="tomodify" v-show="!modify">修改密码</el-button>
							<el-button size="small" @click="modifypwd" v-show="modify">确认修改</el-button>
						</div>
					</div>
					<div class="main-body" v-show="!isupdate">
						<div class="bodyitem"><span class="label"><b>用户名:</b></span>&ensp;&ensp;{{user.account}}</div>
						<div class="bodyitem"><span class="label"><b>昵称:</b></span>&ensp;&ensp;{{user.nickname}}</div>
						<div class="bodyitem"><span class="label"><b>手机号:</b></span>&ensp;&ensp;{{user.phoneNumber}}
						</div>
						<div class="bodyitem"><span class="label"><b>邮箱:</b></span>&ensp;&ensp;{{user.email}}</div>
						<div class="bodyitem"><span class="label"><b>用户创建时间:</b></span>&ensp;&ensp;{{user.gmtCreate}}
						</div>
						<div class="bodyitem"><span class="label"><b>上次修改时间:</b></span>&ensp;&ensp;{{user.gmtModified}}
						</div>
					</div>
					<div class="inputpwd" v-show="modify">
					<el-form :rules="rules"	ref="pwd" :model="pwd">
						<el-form-item prop="oldPassword">
							<label>旧密码:</label><el-input type="password" v-model="pwd.oldPassword" placeholder="请输入旧密码" size="small">
							</el-input>
						</el-form-item>
						<el-form-item prop="newPasswordForInput">
							<label>新密码:</label><el-input type="password" auto-complete="false" v-model="pwd.newPasswordForInput" placeholder="请输入密码" size="small">
							</el-input>
						</el-form-item>
						<el-form-item prop="newPasswordForLastInput">
							<label>确认密码:</label><el-input type="password" auto-complete="false" v-model="pwd.newPasswordForLastInput" placeholder="请输入确认密码" size="small">
							</el-input>
						</el-form-item>				
					</el-form>
					</div>
					<div class="myarticles">
						<div class="title">
							<div style="width: 100%;">{{user.nickname}}的文章:</div>
							<!-- 种类选择 -->
							<el-select v-model="category" placeholder="请选择种类" size="mini" clearable>
								<el-option v-for="item in allcategory" :key="item.id" :label="item.categoryName"
									:value="item.id+''">
								</el-option>
							</el-select>
							<!-- 标签选择 -->
							<el-select v-model="tag" placeholder="请选择标签" size="mini" clearable>
								<el-option v-for="item in alltag" :key="item.id" :label="item.tagName"
									:value="item.id+''">
								</el-option>
							</el-select>
							<!-- 日期选择 -->
							<el-select v-model="time" placeholder="请选择日期" size="mini" clearable>
								<el-option v-for="item in alltime" :key="item.year+'-'+item.month"
									:label="item.year+'-'+item.month" :value="item.year+'-'+item.month">
								</el-option>
							</el-select>
						</div>
						<myarticles ref="myarticle" :tag="tag" :time="time" :category="category"></myarticles>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import myarticles from '../../components/common/myarticles'
	import {
		getuserbyid,
		getnoreadmes,
		getallarchives,
		getalltag,
		getallcategory,
		modifypwd
	} from '../../api/article.js'
	import {
		upload
	} from '../../api/upload.js'
	export default {
		name: 'userinfo',
		
		data() {
			const checkpwd = (rule, value, cb) => {
				if (value.length > 5) {
					var modes = 0;
					//正则表达式验证符合要求的
					if (/\d/.test(value)) modes++; //数字
					if (/[A-z]/.test(value)) modes++; //小写
					if (/\W/.test(value)) modes++; //特殊字符					
					if (modes == 1) {
						cb(new Error('密码强度过低,请包含大小写字母、数字、特殊字符中两种及以上'))
					}
					return cb();
				} else {
					cb(new Error('请确保密码长度在6位以上'))
				}
			}
			const newPasswordForLastInput = (rule, value, cb) => {
				if (value != this.pwd.newPasswordForInput) {
					cb(new Error('两次密码输入不同，请重新输入'))
				}
				return cb();
			}
			
			return {
				userid: this.$route.params.id,
				user: '',
				comment: 0,
				talk: 0,
				isupdate: false,
				time: '',
				tag: '',
				category: '',
				alltag: '',
				alltime: '',
				allcategory: '',
				updateuser: '',
				// imgUrl: '',
				modify: false,
				pwd: {
					oldPassword: '',
					newPasswordForInput: '',
					newPasswordForLastInput: '',
				},
				rules: {
					oldPassword:[
						{
							required: true,
							message: '请输入旧密码',
							trigger: 'blur'
						}
					],
					newPasswordForInput: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							validator: checkpwd,
							trigger: ['blur', 'change'],
						}
					],
				
					newPasswordForLastInput: [{
							required: true,
							message: '请二次输入密码',
							trigger: 'blur'
						},
						{
							validator: newPasswordForLastInput,
							trigger: ['blur', 'change'],
						}
				
					],
				
				}
			}
		},
		components: {
			myarticles
		},
		created() {
			if (this.$store.state.id) {
				this.getnoread();
			}

			getuserbyid(this.userid).then(resp => {
				if (resp.data.code == 200) {
					this.user = resp.data.data;
				} else {
					this.$router.go(-1);
					this.$message.warning('获取用户信息错误');
				}

			})
			this.getalltag();
			this.getalltime();
			this.getallcategory();
		},
		mounted() {
			setTimeout(() => {
				document.title = `${this.user.nickname}的主页	-	GOOBLOG`;
			}, 500)
		},
		methods: {
			// onfilechange(e) {

			// 	var file = e.target.files[0];
			// 	let formdata = new FormData();
			// 	formdata.append('image', file);
			// 	const imgType = ['image/jpeg', 'image/png'];
			// 	const isLt2M = file.size / 1024 / 1024 < 2;
			// 	if (!imgType.includes(file.type)) {
			// 		this.$message.error('上传头像图片仅支持JPG、PNG格式，请重新上传!');
			// 	} else if (!isLt2M) {
			// 		this.$message.error('上传头像图片大小不能超过 2MB，请重新上传!');
			// 	} else {
			// 		upload(formdata).then(resp => {
			// 			if (resp.data.code == 200) {
			// 				this.imgUrl = 'http://' + resp.data.data;
			// 			} else {
			// 				that.$message({
			// 					message: `resp.data.message`,
			// 					type: 'error',
			// 					showClose: true
			// 				})
			// 			}

			// 		}).catch(err => {
			// 			that.$message({
			// 				message: err,
			// 				type: 'error',
			// 				showClose: true
			// 			});
			// 		})
			// 	}

			// },
			view() {
				this.$router.push('/mycomment');
			},
			// updateinfo() {
			// 	this.updateuser = this.user;
			// 	if (this.user.face) {
			// 		this.imgUrl = this.user.face;
			// 	} else {
			// 		this.imgUrl = this.imgsrc;
			// 	}
			// 	this.isupdate = true;
			// },
			// update(){
			// 	this.updateuser.face = this.imgUrl;
			// },
			getnoread() {
				getnoreadmes().then(resp => {
					if (resp.data.code == 200) {
						this.comment = resp.data.data.length;
					} else {
						this.$message.info('暂无新消息');
					}
				}).catch(err => {
					this.$message.error('获取新消息失败')
				})
			},
			getalltag() {
				getalltag().then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到文章归档',
								type: 'error'
							})
						} else {
							this.alltag = resp.data.data;
						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			getalltime() {
				getallarchives().then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到文章归档',
								type: 'error'
							})
						} else {
							this.alltime = resp.data.data;
							this.alltime.forEach(function(item, index) {
								if (item.month < 10) {
									item.month = '0' + item.month;
								}
							})
						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			getallcategory() {
				getallcategory().then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到文章归档',
								type: 'error'
							})
						} else {
							this.allcategory = resp.data.data;
						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			tomodify() {
				this.modify = true
			},
			modifypwd(){
				this.$refs.pwd.validate((valid) => {
					if (valid) {
						modifypwd(this.pwd).then(resp=>{
							if(resp.data.code == 200){
								this.$message.success('修改成功，请重新登录');
								this.modify = false;
								this.clearCookie('Authorization');
								window.sessionStorage.removeItem('user');
								//清除vuex中保存的路由，这样保证路由一直是当前用户拥有的
								this.$router.replace('/login')
							}else{
								this.$message.error('修改失败，请稍后再试');
							}
						}).catch(err=>{
							this.$message.warning('操作失败，请稍后再试')
						})
					} else {
						this.$message.error('密码输入格式错误，请检查！')
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.el-container {
		margin-top: 20px;
		margin-left: 5px;
		margin-right: 5px;
		justify-content: center;
		flex-direction: column;
	}

	.body .el-button {
		margin-left: 5px;
		border-radius: 18px;
		padding: 10px 20px;
		margin-bottom: 5px;
	}

	.inputpwd {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.input {
		margin-top: 10px;
	}

	.inputpwd .el-input {
		width: 40%;
		min-width: 150px;
		margin-left: 15px;
	}

	.tips {
		font-size: 12px;
		color: #d86567;
	}

	.me-intro {
		min-width: 280px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 10px;
		padding: 5px;
		padding-right: 20px;
	}
 .el-form label{
	 font-weight: 600;
	 color:#4b4b4b;
 }
	.head {
		margin: 10px;
		background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.3dmgame.com%2Fuploads%2Fimages%2Fnews%2F20200706%2F1594022924_312694.jpg&refer=http%3A%2F%2Fimg.3dmgame.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646881661&t=86531d31067d8ed7e1bea6d6c1ae1239);
		width: 100%;
		height: 250px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		opacity: 0.95;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.head-title .el-button {
		padding: 5px 15px;
		width: 80px;
	}

	.head-title {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.body {
		width: 100%;
		margin: 5px;
		padding: 5px;
		border-bottom: 1px dashed #e7f1f0;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.main-head {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-right: 20px;

	}

	.head-right {
		float: right;
		display: flex;
		justify-content: space-around;
	}

	.main-body {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}

	.main-body .el-input {
		max-width: 400px;
		margin: 10px;
		flex: 1;
	}

	.el-input__inner {
		border-radius: 20px !important;
	}

	.item {
		font-size: 15px;
	}

	.bodyitem {
		font-size: 15px;
		margin: 12px 15px;
		color: #464646;
	}

	.label {
		 color:#4b4b4b;
	}

	.bodyinput {
		font-size: 15px;
		color: #464646;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-left: 15px;
	}

	.img {
		margin: 20px 30px;
		float: left;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.img img {
		width: 75px;
		height: 75px;
		border-radius: 50%;
		border: 2px solid #fff;
		margin-right: 15px;
	}

	.name {
		text-align: center;
		font-size: 20px;
		font-weight: 600;
		letter-spacing: 1px;
		color: #ffffff;
		margin: 5px;
		margin-bottom: 10px;
	}

	.myarticles {
		width: 100%;
		border-top: 1px solid #e6e6e6;
		padding-top: 15px;
	}

	.myarticles .title {
		color: #393e46;
		font-weight: 600;
		font-size: 14px;
		letter-spacing: 2px;
		margin: 15px 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.el-select {
		margin: 10px 10px 5px 0;
		min-width: 80px;
		flex: 1;
	}

	@media screen and (max-width:520px) {

		.el-container {
			margin-top: 60px;
		}

		.img img {
			width: 45px;
			height: 45px;
			margin-right: 5px;
		}

		.name {
			font-size: 12px;
			margin-bottom: 5px;
		}

		.head {
			height: 150px;
		}

		.img {
			margin: 5px;
			margin-left: 15px !important;
		}

		.body .el-button {
			padding: 5px 10px;
			font-size: 12px;
		}

		.bodyitem {
			font-size: 12px;
			margin: 8px 5px;
		}

		.head-title .el-button {
			font-size: 12px;
			padding: 3px 8px;
			width: 50px;
		}

		.myarticles {
			font-size: 12px;
		}
	}
</style>
