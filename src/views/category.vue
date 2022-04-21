<template>
	<div style="display: flex;justify-content: center;">
		<el-container>

			<div class="me-area">
				<ul class="me-category-list">
					<li class="choose">选择类别:</li>
					<li v-for="t in category" @click="changecategory(t.id,t.categoryName)" :key="t.id"
						class="me-category-item">
						<a :style="randomRgb()">{{t.categoryName}}</a>
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
				 window.scrollTo(0,0);
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
		randomRgb(){
				var str = ['#7eb497','#2fbe96','#60a1cc','#e18384','#e39770','#39bc95','#7fa0d5','#f0a146'];
				let t = str[Math.floor(Math.random()*str.length)];
	
				 return {
					   color:`${t} !important`,
						       };
			},
			changecategory(id, name) {
				this.$router.push({
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
		padding: 20px 0 10px 0;
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
		text-align: center;
		list-style-type: none;
		background: rgba(251, 255, 255, 0.8);
		border-radius: 15px;
	}


	.me-category-item {
		display: inline-block;
		min-width: 30px;
		padding: 5px;
		font-size: 14px;
		font-weight: 600;
		color: #649172;
		margin: 10px 5px;
	}

	.me-order-list {
		float: right;
	}
	
	.me-category-title {
		margin: 20px 0;
		background: rgba(251, 255, 255, 0.8);
		color: #5f8d82;
		font-weight: 600;
		letter-spacing: 2px;
		font-size: 14px;
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
		padding: 0;
	}
	@media screen and (max-width:520px) {
		.choose{
			font-size: 12px;
			padding: 5px;
		}
		.me-category-item{
			font-size: 12px;
		}
	}
</style>
