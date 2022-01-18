<template>
	<div class="home">
		<el-container>
			<el-main class="me-articles">
				<articleitem v-for="article in articles" v-bind="article" :key="article.id" style="flex:1;margin-bottom: 10px;"></articleitem>
			</el-main>
			<el-aside>Aside</el-aside>
		</el-container>
	</div>
</template>

<script>
	import articleitem from '../components/articles/articleitem'

	export default {
		name: 'Home',
		components: {
			articleitem
		},
		data() {
			return {
				articles: [{
						id: "1",
						weight: 1,
						title: "我是小王璐",
						commentCounts: 123,
						viewCounts: 123,
						summary: "概要11",
						author: "王璐",
						tags: [{
							"tagName": "vue"
						}],
						createDate: "2022-01-18 00:00:00"
					},
					{
						id: "2",
						weight: 1,
						title: "我是小力民",
						commentCounts: 99,
						viewCounts: 66,
						summary: "概要21",
						author: "赵力民",
						tags: [{
							"tagName": "java"
						}],
						createDate: "2022-01-18 12:00:00"
					}
				]
			}
		}
	}
</script>

<style scoped="scoped">
	.el-container {
		height: auto;
	}

	.el-aside {
		width: 260px;
		margin-left: 20px;
	}

	.el-main {
		padding: 0px;
		line-height: 16px;
	}

	.el-card {
		border-radius: 0;
	}

	.el-card:not(:first-child) {
		margin-top: 20px;
	}
	.me-articles{
		display:flex;
		flex-direction: column;
		min-width:300px;
	}

</style>
