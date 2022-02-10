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
							<el-button size="mini" v-if="this.$store.state.id != user.id" round>私信</el-button>
						</div>

					</div>

				</div>
				<div class="body">
					<div class="main-head">
						<div class="head-left" v-if="this.$store.state.id == user.id">
							<el-button type="primary" round size="small" @click="updateinfo" v-show="!isupdate">修改信息
							</el-button>
							<el-button type="success" round size="small" v-show="isupdate">提交信息</el-button>
							<el-button type="primary" round size="small" v-show="isupdate">修改密码</el-button>
						</div>
						<div class="head-right" v-if="this.$store.state.id == user.id">
							<el-badge :value="comment" :max="99" class="item" v-show="comment>0">
								<el-button size="small" @click="view()">评论/回复</el-button>
							</el-badge>
							<el-badge :value="talk" :max="99" class="item" v-show="talk>0">
								<el-button size="small">聊天</el-button>
							</el-badge>
							<el-button size="small" @click="view" v-show="comment<1">评论/回复</el-button>
							<el-button size="small" v-show="talk<1">聊天</el-button>
						</div>
					</div>
					<div class="main-body" v-show="!isupdate">
						<div class="bodyitem"><b>用户名:</b>&ensp;&ensp;{{user.account}}</div>
						<div class="bodyitem"><b>昵称:</b>&ensp;&ensp;{{user.nickname}}</div>
						<div class="bodyitem"><b>手机号:</b>&ensp;&ensp;{{user.phoneNumber}}</div>
						<div class="bodyitem"><b>邮箱:</b>&ensp;&ensp;{{user.email}}</div>
						<div class="bodyitem"><b>用户创建时间:</b>&ensp;&ensp;{{user.gmtCreate}}</div>
						<div class="bodyitem"><b>上次修改时间:</b>&ensp;&ensp;{{user.gmtModified}}</div>
					</div>
					<div class="main-body" v-show="isupdate">
						<div class="bodyinput" style="display: flex;">
							<div><b>头像：</b></div>
							<input type="file" name="photo" id="photo" @change="onfilechange" style="width:150px;">
							<img :src="imgUrl" style="width: 30px;height:30px;border-radius: 50%;">
						</div>
						<div class="bodyinput">
							<div><b>用户名:</b></div>
							<el-input v-model="updateuser.account" size="small"></el-input>
						</div>
						<div class="bodyinput">
							<div><b>昵称:</b></div>
							<el-input v-model="updateuser.nickname" size="small"></el-input>
						</div>
						<div class="bodyinput">
							<div><b>手机号:</b></div>
							<el-input v-model="updateuser.phoneNumber" size="small"></el-input>
						</div>
						<div class="bodyinput">
							<div><b>邮箱:</b></div>
							<el-input v-model="updateuser.email" size="small"></el-input>
						</div>
						<div class="bodyitem"><b>用户创建时间:</b>&ensp;&ensp;{{updateuser.gmtCreate}}</div>
						<div class="bodyitem"><b>上次修改时间:</b>&ensp;&ensp;{{updateuser.gmtModified}}</div>
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
		getallcategory
	} from '../../api/article.js'
	import {
		upload
	} from '../../api/upload.js'
	export default {
		name: 'userinfo',
		data() {
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
				imgUrl: '',
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
			onfilechange(e) {

				var file = e.target.files[0];
				let formdata = new FormData();
				formdata.append('image', file);
				const imgType = ['image/jpeg', 'image/png'];
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!imgType.includes(file.type)) {
					this.$message.error('上传头像图片仅支持JPG、PNG格式，请重新上传!');
				} else if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB，请重新上传!');
				} else {
					upload(formdata).then(resp => {
						if (resp.data.code == 200) {
							this.imgUrl = 'http://' + resp.data.data;
						} else {
							that.$message({
								message: `resp.data.message`,
								type: 'error',
								showClose: true
							})
						}

					}).catch(err => {
						that.$message({
							message: err,
							type: 'error',
							showClose: true
						});
					})
				}

			},
			view() {
				this.$router.push('/mycomment');
			},
			updateinfo() {
				this.updateuser = this.user;
				if (this.user.face) {
					this.imgUrl = this.user.face;
				} else {
					this.imgUrl = this.imgsrc;
				}
				this.isupdate = true;
			},
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

	.me-intro {
		min-width: 280px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 10px;
		padding: 5px;
		padding-right: 20px;
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
		justify-content: space-between;

	}

	.main-body {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		flex-wrap: wrap;
		margin-top: 20px;
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
