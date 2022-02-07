<template>
	<div style="display: flex;justify-content: center;background:rgba(255, 255, 255, 0.8);">
		<el-container>

			<div class="me-area">
				<ul class="me-category-list">
					<li class="choose">选择类别:</li>
					<li v-for="t in category" @click="changecategory(t.id,t.categoryName)" :key="t.id"
						class="me-category-item">
						<a>{{t.categoryName}}</a>
					</li>
				</ul>

			</div>
			<el-main class="me-articles">

				<div class="me-category-title">{{currentcategory}}</div>
				<articlescrollpage :category="$route.params.id"></articlescrollpage>

			</el-main>
		</el-container>
	</div>

</template>

<script>
	import articlescrollpage from '../components/common/articlescrollpage'
	import {
		getallcategory
	} from '../api/article'

	export default {
		name: "category",
		components: {
			articlescrollpage
		},
		created() {
			if (this.$route.query.name) {
				setTimeout(() => {
					document.title = `${this.$route.query.name} 类别 -GOOBLOG`
				}, 500)
			}

			this.listcategory();
		},
		data() {
			return {
				category: []
			}
		},
		computed: {
			currentcategory() {
				if (this.$route.query.name) {
					document.title = `${this.$route.query.name} 类别 -GOOBLOG`
					return this.$route.query.name;
				}
				return '全部类别'
			},
		},
		methods: {

			changecategory(id, name) {
				this.$router.replace({
					path: `/category/all/${id}`,
					query: {
						name: name
					}
				})
			},
			listcategory() {
				getallcategory().then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到文章归档',
								type: 'error'
							})
						} else {
							this.category = resp.data.data;
						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			}
		}
	}
</script>

<style scoped>
	.me-area {
		border-bottom: 1px solid #efefef;
		z-index: 0 !important;
		padding: 20px;
		padding-left: 10px;
	}

	.choose {
		font-size: 14px;
		color: #52816f;
		width: 80px;
		margin: 10px;
		padding: 5px;
		font-weight: 640;
	}

	.el-container {
		margin-top: 20px;
		margin-left: 10px;
		margin-right: 10px;
		justify-content: center;
		flex-direction: column;
	}

	.me-category-list {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 0;
		margin: 10px;
		text-align: center;
		list-style-type: none;
		background: rgba(251, 255, 255, 0.8);
		border-radius: 15px;
	}


	.me-category-item {
		display: inline-block;
		min-width: 50px;
		padding: 10px;
		font-size: 14px;
		color: #649172;
		margin: 5px;
	}

	.me-order-list {
		float: right;
	}

	.me-category-title {
		margin-left: 4px;
		margin-bottom: 12px;
		margin-top: 10px;
		background: rgba(251, 255, 255, 0.8);
		color: #5f8d82;
		font-weight: 600;
		letter-spacing: 2px;
		font-size: 16px;
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		opacity: 0.9;
		box-shadow: 0 3px 6px rgba(212, 212, 212, 0.8);
		border-radius: 8px;
	}

	.me-category-item a:hover {
		text-decoration: underline;
	}

	.el-button {
		border-radius: 15px;
	}

	.me-articles {
		min-width: 280px;
		margin-right: 10px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.9);
	}
</style>
