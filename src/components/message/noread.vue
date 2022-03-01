<template>
	<div>
		<mesitem :message="noreadmes" @getmes="getnoread" v-if="noreadmes!=''"></mesitem>
		<div v-else><el-empty description="暂无消息"></el-empty></div>
	</div>
</template>

<script>
	import {
		getnoreadmes
	} from '../../api/article.js'
	import mesitem from './mesitem'
	export default {
		name: 'noread',
		components: {
			mesitem
		},
		created() {
			this.getnoread();
		},
		data() {
			return {
				noreadmes: '',
			}
		},
		methods:{
			getnoread() {
				getnoreadmes().then(resp => {
					if (resp.data.data.length > 0) {
						this.noreadmes = resp.data.data;
					} else {
						 this.$message({
						          showClose: true,
						          message: '暂无新消息'
						        });
								this.noreadmes = resp.data.data;
					}
				}).catch(err => {
					this.$message.error('获取未读消息失败')
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.el-empty{
		min-height: 550px;
	}
	@media screen and (max-width: 520px) {
		
		.el-empty{
		min-height: 450px;
	}
	}
</style>
