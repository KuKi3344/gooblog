<template>
	<div style="display: flex;justify-content: center;background:rgba(255, 255, 255, 0.8);min-height: 550px;">
		<el-container>

			<div class="me-area">
				<div class="input">
					<el-autocomplete class="inline-input" v-model="condition" :fetch-suggestions="search" clearable
						placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
					<el-button icon="el-icon-search" size="small" @click="filterall"></el-button>
				</div>
			</div>
			<el-main class="me-articles">
					<searcharticle :condition="$route.params.id"></searcharticle>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import {
			searchall
		} from '../api/article.js'
		import  searcharticle from '../components/common/searcharticle'
	export default {
		name: 'search',
		data() {
			return {
				condition: this.$route.params.id,
				page: 1,
				searchlist: [],
			}
		},
		mounted() {
			setTimeout(() => {
				document.title = `查找${this.condition}相关文章的结果	-	GOOBLOG`;
			}, 500)
		},
		components:{
			searcharticle
		},
		methods: {
			search(queryString, cb) {
				var that = this;
				let params = {
					condition: this.condition,
					page: 1,
					pageSize: 6
				}
				searchall(params).then(resp => {
					if (resp.data.data.length > 0) {
						this.searchlist = resp.data.data;
						this.searchlist.forEach(function(value, index, array) {
							that.searchlist[index].value = value.title
						})
						var list = this.searchlist
						cb(list)
					} else {
						let list2 = [{
							value: '暂无'
						}]
						cb(list2)
					}

				})
			},
			handleSelect(item) {
				this.$router.push(`/article/${item.id}`)
			},
			filterall() {
				if (this.condition != '') {
					this.$router.push(`/search/${this.condition}`);
				}

			}
		}
	}
</script>

<style scoped="scoped">
	.me-area {
		border-bottom: 1px solid #efefef;
		z-index: 0 !important;
		padding: 20px 0 10px 0;
		display: flex;
		justify-content: center;
	}

	.el-container {
		margin-top: 20px;
		margin-left: 10px;
		margin-right: 10px;
		justify-content: center;
		flex-direction: column;
	}

	.me-articles {
		min-width: 280px;
		margin-right: 10px;
		margin-top: 10px;
		width: 100%;
		background: rgba(255, 255, 255, 0.9);
		padding: 0;
	}

	.el-button {
		border-bottom-right-radius: 18px;
		border-top-right-radius: 18px;
		border: none;
	}

	.input {
		width: 80%;
		margin-top: 20px;
		margin-bottom: 20px;
		background-color: #fff;
		border-radius: 18px;
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.el-autocomplete {
		flex: 1;
		color: #000000;
	}

	::v-deep .el-input__inner {
		border-top-left-radius: 18px;
		border-bottom-left-radius: 18px;
		border: none;
	}
</style>
