<template>
	<div style="display: flex;justify-content: center;">
		<el-container>

			<div class="me-area">
				<ul class="me-tag-list">
					<div class="li-list">
						<li class="choose">选择标签:</li>
						<li v-for="t in tags" @click="changetag(t.id,t.tagName)" :key="t.id" class="me-tag-item">
							<el-tag :style="randomRgb()">{{t.tagName}}</el-tag>
						</li>
					</div>

					<div style="width: 100%;">
						<el-pagination small layout="prev, pager, next" :page-count="pagesum" :current-page.sync="pager"
							@current-change="handleCurrentChange">
						</el-pagination>
					</div>

				</ul>


			</div>
			<el-main class="me-articles">

				<div class="me-tag-title">{{currenttag}}</div>
				<tagarticle :tag="$route.params.id"></tagarticle>

			</el-main>
		</el-container>
	</div>

</template>

<script>
	import tagarticle from '../components/common/tagarticle'
	import {
		getalltag
	} from '../api/article'

	export default {
		name: "archives",
		components: {
			tagarticle
		},
		created() {
			if (this.$route.query.name) {
				setTimeout(() => {
					document.title = `${this.$route.query.name} 标签 -GOOBLOG`
				}, 500)
			}
			this.listtags();
			 window.scrollTo(0,0);
		},
		data() {
			return {
				tags: [],
				alltags: [],
				pagesum: 1,
				pager: 1,
			}
		},
		computed: {
			currenttag() {
				if (this.$route.query.name) {
					document.title = `${this.$route.query.name} 标签 -GOOBLOG`
					return this.$route.query.name;
				}
				return '全部标签'
			},
		},
		methods: {
			randomRgb() {
				var str = ['rgba(99, 190, 119, 0.5)', 'rgba(89, 177, 155, 0.5)', 'rgba(211, 146, 147, 0.5)',
					'rgba(67, 154, 171, 0.5)', 'rgba(207, 173, 129, 0.5)'
				];
				let t = str[Math.floor(Math.random() * str.length)];
				return {
					background: `${t} !important`,
					border: `1px solid ${t}`
				};
			},
			changetag(id, name) {
				this.$router.push({
					path: `/tag/all/${id}`,
					query: {
						name: name
					}
				})
			},
			listtags() {
				getalltag().then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到文章归档',
								type: 'error'
							})
						} else {
							this.alltags = resp.data.data;
							this.pagesum = Math.ceil(this.alltags.length / 8)
							this.getcurrenttag();
						}
					} else {
						this.$message.error(resp.data.message)
					}
				})
			},
			getcurrenttag() {
				let pager = this.pager;
				this.tags = this.alltags.filter(function(value, index, array) {
					return (index >= (pager - 1) * 8 && index < pager * 8)
				})
			},
			handleCurrentChange(val) {
				this.pager = val;
				this.getcurrenttag();
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
		margin: 5px;
		padding: 15px;
		font-weight: 640;
	}

	.el-container {
		margin-top: 20px;
		margin-left: 10px;
		margin-right: 10px;
		justify-content: center;
		flex-direction: column;
	}

	.me-tag-list {
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

	.el-tag {
		color: #ffffff;
		border: none;
	}

	.me-tag-item {
		display: inline-block;
		width: auto;
		padding: 5px;
		font-size: 13px;
		color: #649172;
		margin: 4px;
	}

	.me-order-list {
		float: right;
	}

	.el-pagination {
		border-radius: 10px;
		margin-top: 5px;
	}

	.me-tag-title {
		margin: 20px 0 !important;
		background: rgba(251, 255, 255, 0.8);
		color: #549c78;
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

	.me-tag-item a:hover {
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
		.choose {
			font-size: 12px;
			padding: 10px;
		}
	}
</style>
