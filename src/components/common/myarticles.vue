<template>
	<div>
		<scroll-page :loading="loading" :offset="offset" :no-data="noData" @load="load" class="main"
			v-if="articles.length>0">
			<articleitem v-for="article in articles" v-bind="article" :key="article.id"
				style="flex:1;margin-bottom: 10px;z-index: 99;">
			</articleitem>
		</scroll-page>
		<el-empty description="暂无" v-else></el-empty>
	</div>
</template>

<script>
	import scrollpage from '../scrollpage/index'
	import articleitem from '../articles/articleitem'
	import {
		getmyarticles
	} from '../../api/article.js'
	export default {
		name: 'myarticles',
		data() {
			return {
				loading: false,
				noData: false,
				offset: 0,
				articles: [],
				innerPage: {
					page: 1,
					pageSize: 9,
				},
				canRun: true,
			}
		},
		props: {
			time: String,
			tag: String,
			category: String,
		},
		components: {
			"scroll-page": scrollpage,
			"articleitem": articleitem
		},
		created() {
			this.getmyArticles();
		},
		watch: {
			time() {
				this.articles = [];
				this.innerPage.page = 1;
				this.getmyArticles();
			},
			tag() {
				this.articles = [];
				this.innerPage.page = 1;
				this.getmyArticles();
			},
			category() {
				this.articles = [];
				this.innerPage.page = 1;
				this.getmyArticles();
			},
		},
		methods: {
			load() {
				//如果触发分页，需要调用接口加载文章列表
				//这里用了节流思想
				if (this.canRun) {
					this.canRun = false;
					this.getmyArticles();
					setTimeout(() => {
						this.canRun = true;
					}, 500)
				}
			},
			getmyArticles() {
				this.loading = true;
				var run = false;
				this.innerPage.date = this.time;
				this.innerPage.tagId = this.tag;
				this.innerPage.categoryId = this.category;
				getmyarticles(this.innerPage).then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.noData = true;
							this.$message({
								showClose: true,
								message: '没有更多文章惹qwq',
								type: 'warning'
							})
						} else {
							this.articles = this.articles.concat(resp.data.data);
							this.innerPage.page += 1;
						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败qvq')
				})
				this.loading = false;
			}
		},
	}
</script>

<style scoped="scoped">
	.main {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
</style>
