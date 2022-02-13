<template>
	<div style="min-height: 430px;">
		<scroll-page :loading="loading" :offset="offset" :no-data="noData" @load="load" class="main"  v-if="articles.length>0">
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
		searchall
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
					pageSize: 10,
				},
				canRun: true
			}
		},
		props:{
			condition:String
		},
		watch:{
			condition(){
				this.articles = [];
				this.innerPage.page = 1;
				this.getArticles();
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
					}, 500)
				}
			},
			getArticles() {
				this.loading = true;
				var run = false;		
				this.innerPage.condition = this.condition;
				searchall(this.innerPage).then(resp => {
					if (resp.data.code == 200) {
							this.articles = this.articles.concat(resp.data.data);	
							this.innerPage.page += 1;
					} else {
						this.$message.error(resp.data.message)
					}
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
