<template>
	<div>
		<el-container>
			<el-main class="me-articles">
				<img src="">
				<articlescrollpage></articlescrollpage>
			</el-main>
			<el-aside>
				<div class="aside">
					<homeaside></homeaside>
					<tagaside></tagaside>
					<articleside cardHeader="热门文章" :articles="hotArticles"></articleside>
					<articleside cardHeader="最新文章" :articles="newArticles"></articleside>
					<Archiveaside  cardHeader="文章归档" :archives="articlearchives"></Archiveaside>
				</div>
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
		min-width: 300px;
		flex-wrap: nowrap;
		background-color: #fff;
	}

	.el-aside {
		width: 310px !important;
		min-width:80px;
		border-radius: 10px;
		margin-bottom: 20px;
		overflow: hidden;
	}
	.aside{
		position: fixed;
		height:100%;
			padding-top:10px;
			overflow: scroll;
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
		min-width: 280px;
		padding: 0px;
		line-height: 16px;
		margin-top:50px !important;
		margin-right: 20px;
	}
	@media screen and (max-width: 850px) {
	    .el-aside {
	       display: none;
	    }
	}
</style>
