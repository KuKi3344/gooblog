<template>
	<scroll-page :loading="loading" :offset="offset" :no-data="noData" @load="load" class="main">
		<articleitem v-for="article in articles" v-bind="article" :key="article.id" style="flex:1;margin-bottom: 40px;">
		</articleitem>
	</scroll-page>
</template>

<script>
	import scrollpage from '../scrollpage/index'
	import articleitem from '../articles/articleitem'
	import {
		getarticles
	} from '../../api/article.js'
	export default {
		name: 'articlescrollpage',
		data() {
			return {
				loading: false,
				noData: false,
				offset: 0,
				articles: [],
				innerPage: {
					page: 1,
					pageSize: 5
				},
				canRun: true,
			}
		},
		components: {
			"scroll-page": scrollpage,
			"articleitem": articleitem
		},
		created() {
			this.getArticles();
		},
		methods: {
			load() {
				//如果触发分页，需要调用接口加载文章列表
				//这里用了节流思想
				if (this.canRun) {
					this.canRun = false;
					this.getArticles();
					setTimeout(() => {
						this.canRun = true;
					}, 1000)
				}
			},
			getArticles() {
				this.loading = true;
				var run = false;
				getarticles(this.innerPage).then(resp => {
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
						this.$message.error(resp.data.msg)
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
	.main{
		animation-name: ease;
		animation-duration: 1s;
	}
	@keyframes ease{
		0%{
			opacity: 0.2;
			transform:translateX(-50px)
		}
		100%{
			opacity: 1;
		}
	}
</style>
