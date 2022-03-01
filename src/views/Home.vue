<template>
	<div class="home">
		<div>
			<img src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2058086203,2012000159&fm=26&gp=0.jpg"
				class="img">
		</div>
		<homeheader :avtiveIndex="activeIndex" class="homeheader"></homeheader>
		<homeheaderrow :avtiveIndex="activeIndex" class="homeheaderrow"></homeheaderrow>
		<div class="main">
			<el-container>
				<el-main class="me-articles">

					<router-view></router-view>
					<gotop></gotop>
							<homefooter></homefooter>
				</el-main>
				<el-aside>
					<div class="aside">
						<homeaside></homeaside>
						<notice></notice>
						<tagaside></tagaside>
						<articleside cardHeader="热门文章" :articles="hotArticles"></articleside>
						<articleside cardHeader="最新文章" :articles="newArticles"></articleside>
						<Archiveaside cardHeader="文章归档" :archives="articlearchives"></Archiveaside>
					</div>
				</el-aside>
			</el-container>
		</div>
	</div>
</template>

<script>
	import {
		hotArticles,
		newArticles,
		getallarchives,
	} from '../api/article.js'
	import gotop from '../components/gotop/gotop'
	import homeaside from '../components/aside/homeaside'
	import tagaside from '../components/aside/tagaside'
	import articleside from '../components/aside/articleside'
	import Archiveaside from '../components/aside/Archiveaside'
	import homeheader from '../components/header/homeheader'
	import homeheaderrow from '../components/header/homeheaderrow'
	import homefooter from '../components/footer/homefooter'
	import notice from '../components/aside/notice'
	export default {
		name: 'Home',
		components: {
			homeheader,
			homefooter,
			homeheaderrow,
			homeaside,
			tagaside,
			articleside,
			Archiveaside,
			gotop,
			notice
		},
		data() {
			return {
				activeIndex: "/home",
				hotArticles: [],
				newArticles: [],
				articlearchives: [],
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.activeIndex = to.path;
			})
		},
		beforeRouteUpdate(to, from, next) {
			this.activeIndex = to.path;
			next();
		},
		created() {
			this.gethotArticles();
			this.getnewArticles();
			this.getarchives();
			var time = new Date();
			this.minute = time.getMinutes();
			this.hour = time.getHours();
			if (this.minute < 10) {
				this.minute = '0' + this.minute;
			}
			if (this.hour < 10) {
				this.hour = '0' + this.hour;
			}
		},
		methods: {
			gethotArticles() {
				hotArticles(5).then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到热门文章了',
								type: 'error'
							})
						} else {
							this.hotArticles = resp.data.data;
						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			getnewArticles() {
				newArticles().then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到最新文章',
								type: 'error'
							})
						} else {
							this.newArticles = resp.data.data;
							this.newArticles = this.newArticles.filter(item => item.id < 5)
						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})

			},
			getarchives() {
				getallarchives().then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到文章归档',
								type: 'error'
							})
						} else {
							this.articlearchives = resp.data.data;

						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
		},
	}
</script>

<style scoped="scoped">
	.el-container {
		height: auto;
		display: flex;
		justify-content: center;
		min-width: 300px;
		flex-wrap: nowrap;
	}

	.el-aside {
		width: 310px !important;
		min-width: 80px;
		border-radius: 10px;
		margin-bottom: 20px;
		overflow: hidden;
	}

	.aside {
		position: fixed;
		height: 100%;
		padding-top: 10px;
		overflow: scroll;
	}

	.el-card {
		border-radius: 0;
	}


	.el-card:not(:first-child) {
		margin-top: 20px;
	}


	.me-articles {
		margin: 5px;
		display: flex;
		flex-direction: column;
		min-width:300px;
		padding: 0px;
		line-height: 16px;
		background-color: rgba(255, 255, 255, 0.8);
	}

	@media screen and (max-width: 850px) {
		.el-aside {
			display: none;
		}
	}

	*,
	html {
		margin: 0;
		padding: 0;
	}

	.homeheader {
		height: 100%;
		max-width: 300px;
		width: auto;
		min-width: 80px;
	}

	.homeheaderrow {
		width: 100%;
		min-width: 280px;
		max-height: 40px;
	}

	.main {
		margin-left: 180px;
		z-index: 999;
	}

	.img {
		z-index: 0;
		opacity: 0.3;
		position: fixed;
		width: 100%;
		height:100%;
		filter: blur(10px);
	}

	@media screen and (max-width: 1148px) {
		.main {
			margin-left: 90px;
		}
	}

	@media screen and (max-width: 400px) {
		.main {
			margin-left: 120px;
		}
	}

	@media screen and (max-width:520px) {
		.homeheader {
			display: none;
		}

		.homeheaderrow {
			display: block;
		}

		.main {
			margin-left: 10px;
			margin-right: 10px;
		}
	}

	@media screen and (min-width:520px) {
		.homeheaderrow {
			display: none;
		}

		.homeheader {
			display: block;
		}

		body {
			font-size: 12px;
		}
	}
</style>
