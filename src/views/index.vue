<template>
	<div style="max-width: 1540px;">
		<div class="homeimg">
		<video src="../assets/img/bkmv.mp4" autoplay="autoplay" preload="auto" loop="loop" muted="muted"></video>
		</div>
		<el-container>
			<el-main class="me-articles">
				<articlescrollpage></articlescrollpage>
			</el-main>
			<el-aside>
				<homeaside></homeaside>
				<tagaside></tagaside>
				<articleside cardHeader="热门文章" :articles="hotArticles"></articleside>
				<articleside cardHeader="最新文章" :articles="newArticles"></articleside>
				<Archiveaside  cardHeader="文章归档" :archives="articlearchives"></Archiveaside>
			</el-aside>
		</el-container>
	</div>
</template>

<script>
	import {hotArticles, newArticles,getallarchives} from '../api/article.js'
	import homeaside from '../components/aside/homeaside'
	import tagaside from '../components/aside/tagaside'
	import articlescrollpage from '../components/common/articlescrollpage'
	import articleside from '../components/aside/articleside'
	import Archiveaside from '../components/aside/Archiveaside'
	export default {
		name: 'home',
		data() {
			return {
				hotArticles:[],
				newArticles:[],
				articlearchives:[],
			}
		},
		components: {
			homeaside,
			articlescrollpage,
			tagaside,
			articleside,
			Archiveaside,
		},
		created() {
			this.gethotArticles();
			this.getnewArticles();
			this.getarchives();
		},
		methods: {
			gethotArticles() {
				hotArticles(5).then(resp=>{
				if(resp.data.code == 200){
						if(resp.data.data.length<=0){
							this.$message({
								showClose: true,
								message: '找不到热门文章了',
								type: 'error'
							})
						}else{
							this.hotArticles = resp.data.data;
						}
					}else{
							this.$message.error(resp.data.message)
					}
				}).catch(err => {
						this.$message.error('加载失败')
					})
			},
			getnewArticles(){
				newArticles().then(resp=>{
					if(resp.data.code == 200){
							if(resp.data.data.length<=0){
								this.$message({
									showClose: true,
									message: '找不到最新文章',
									type: 'error'
								})
							}else{
								this.newArticles = resp.data.data;
								this.newArticles = this.newArticles.filter(item=>item.id<5)
							}
						}else{
								this.$message.error(resp.data.message)
						}
					}).catch(err => {
							this.$message.error('加载失败')
						})
				
			},
			getarchives(){
				getallarchives().then(resp=>{
			if(resp.data.code == 200){
					if(resp.data.data.length<=0){
						this.$message({
							showClose: true,
							message: '找不到文章归档',
							type: 'error'
						})
					}else{
						this.articlearchives = resp.data.data;
						
					}
				}else{
					this.$message.error(resp.data.message)
				}
			}).catch(err => {
					this.$message.error('加载失败')
				})
			}
		},
	}
</script>

<style scoped="scoped">
	.el-container {
		height: auto;
		display: flex;
		justify-content:center;
		min-width: 800px;
		flex-wrap: nowrap;
		background-color: #fff;
	}

	.el-aside {
		width: 310px !important;
		margin-left: 20px;
		margin-top: 40px;
		border-radius: 10px;
		margin-bottom: 20px;
		overflow: hidden;
	}

	.el-card {
		border-radius: 0;
	}

	.el-card:not(:first-child) {
		margin-top: 20px;
	}

	.me-articles {
		display: flex;
		flex-direction: column;
		min-width: 400px;
		max-width: 700px;
		padding: 0px;
		line-height: 16px;
		margin-top:50px !important;
		margin-right: 20px;
	}

	.homeimg {
		width: 100%;
		min-width:800px;
		max-height:600px;
		overflow: hidden;
	}
	.homeimg video{
		width:100%;
		min-width:800px;
		min-height:500px;
		transform: translateY(-2%);
	}
</style>
