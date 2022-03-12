<template>
	<div style="display: flex;justify-content: center;background:rgba(255, 255, 255, 0.8);">
		<el-container>

			<div class="me-area">
				<ul class="me-month-list">
					<div class="li-list">
						<li class="choose">选择日期:</li>
						<li v-for="a in archives" @click="changeArchive(a.year, a.month)" :key="a.year + a.month"
							class="me-month-item">
							<a :style="randomRgb()">{{`${a.year}年${a.month}月(${a.count})`}}</a>
						</li>
					</div>

					<div style="width: 100%;">
						<el-pagination small layout="prev, pager, next" :page-count="pagesum" :current-page.sync="pager" :hide-on-single-page="value"
							@current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</ul>

			</div>
			<el-main class="me-articles">

				<div class="me-month-title">{{currentArchive}}</div>
				<articlescrollpage :time="$route.params.id"></articlescrollpage>

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
			if (this.$route.params.id) {
				setTimeout(() => {
					document.title = `${this.$route.params.id} 文章归档 -GOOBLOG`
				}, 300)
				 window.scrollTo(0,0);
			}

		},
		data() {
			return {
				archives: [],
				allarchives:[],
				pagesum: 1,
				pager: 1,
				value:false
			}
		},
		computed: {
			currentArchive() {
				if (this.$route.params.id) {
					document.title = `${this.$route.params.id} 文章归档 -GOOBLOG`
					return `${this.$route.params.id} 档案`
				}
				return '全部档案'
			},
		},
		methods: {
			randomRgb() {
				var str = ['#7eb497', '#30beae', '#63b0cc', '#40cfa7', '#5b98c6'];
				let t = str[Math.floor(Math.random() * str.length)];

				return {
					color: `${t} !important`,
				};
			},
			changeArchive(year, month) {
				if (month < 10) {
					month = '0' + month;
				}
				var time = year + '-' + month
				this.$router.push(`/archives/${time}`)

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
							this.allarchives = resp.data.data;
							this.pagesum = Math.ceil(this.allarchives.length / 8)
							if(this.pagesum < 2){
								this.value = true;
							}
							this.getcurrentachives();
						}
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			getcurrentachives(){
				let pager = this.pager;
				this.archives = this.allarchives.filter(function(value, index, array) {
					return (index >= (pager - 1) * 8 && index < pager * 8)
				})
			},
			handleCurrentChange(val) {
				this.pager = val;
				this.getcurrentachives();
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

	.me-month-list {	
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		padding: 0;
		text-align: center;
		list-style-type: none;
		background: rgba(255, 255, 255, 1);
		border-radius: 8px;
		margin-bottom: 5px;
		align-items: flex-start;
	}


	.li-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.me-month-item {
		display: inline-block;
		width: 100px;
		padding: 10px 5px;
		font-size: 13px;
		color: #649172;
		margin: 5px;
		font-weight: 600;
	}

	.me-order-list {
		float: right;
	}

	.me-month-title {
		margin: 20px 0 !important;
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

	.me-month-item a:hover {
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
		padding: 0;
	}

	@media screen and (max-width:520px) {
		.choose {
			font-size: 12px;
			padding: 5px;
		}

		.me-month-item {
			font-size: 12px;
		}
	}
</style>
