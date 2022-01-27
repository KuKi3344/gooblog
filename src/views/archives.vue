<template>
	<div>
		<el-container>

			<el-aside class="me-area">
				<ul class="me-month-list">
					<li v-for="a in archives" @click="changeArchive(a.year, a.month)" :key="a.year + a.month"
						class="me-month-item">
						<a>{{`${a.year}年${a.month}月(${a.count})`}}</a>
					</li>
				</ul>

			</el-aside>


			<el-main class="me-articles">

				<div class="me-month-title">{{currentArchive}}</div>
				<articlescrollpage v-bind="article"></articlescrollpage>

			</el-main>
		</el-container>
	</div>

</template>

<script>
	import articlescrollpage from '../components/common/articlescrollpage'
	import {
		getallarchives
	} from '../api/article'

	export default {
		name: "archives",
		components: {
			articlescrollpage
		},
		created() {
			this.listArchives()
			setTimeout(() => {
				document.title = this.currentArchive + ' - 文章归档'
			}, 300)
		},
		watch: {
			'$route'() {
				if (this.$route.params.year && this.$route.params.month) {
					this.article.query.year = this.$route.params.year
					this.article.query.month = this.$route.params.month
				}
			}
		},
		data() {
			return {
				article: {
					query: {
						month: this.$route.params.month,
						year: this.$route.params.year
					}
				},
				archives: []
			}
		},
		computed: {
			currentArchive() {
				if (this.article.query.year && this.article.query.month) {
					return `${this.article.query.year}年${this.article.query.month}月`
				}
				return '全部'
			}
		},
		methods: {

			changeArchive(year, month) {
				this.article.query.year = year
				this.article.query.month = month
			},
			listArchives() {
				getallarchives().then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到文章归档',
								type: 'error'
							})
						} else {
							this.archives = resp.data.data;
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
	.el-container {
		margin-top: 60px;
		margin-left: 20px;
		margin-right: 20px;
		justify-content: center;
	}

	.el-aside {
		min-width: 150px;
		max-width: 240px;
		flex: 1;
		margin:50px;
	}

	.el-aside ul {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 0;
	}

	.el-main {
		padding: 0px;
		line-height: 16px;
	}

	.me-month-list {
		border-radius: 25px;
		background-color: #fff;
		box-shadow: 0 10px 15px rgba(212, 212, 212, 0.8);
		margin: 10px;
		text-align: center;
		list-style-type: none;
	}

	.me-month-item {
		display: inline-block;
		width: 40%;
		padding: 5px;
		font-size: 13px;
		color: #5FB878;
		margin:10px;
	}

	.me-order-list {
		float: right;
	}

	.me-month-title {
		margin-left: 4px;
		margin-bottom: 12px;
		margin-top: 40px;
		background-color: #fff;
		color: #4da161;
		letter-spacing: 2px;
		font-size: 13px;
		border-radius: 30px;
		width: 100px;
		height: 30px;
		border: 1px solid #6db565;
		text-align: center;
		line-height: 30px;
		opacity: 0.9;
	}
	.me-month-item a:hover{
		 text-decoration: underline;
	}

	.el-button {
		border-radius: 15px;
	}

	.me-articles {
		max-width: 900px;
		min-width: 500px;
		margin:20px;
	}
</style>
