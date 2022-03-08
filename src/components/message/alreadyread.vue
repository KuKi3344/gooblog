<template>
	<div>
		<mesitem :message="alreadymes"  @getreadmes="getreadmes" v-if="alreadymes!=''"></mesitem>
		<el-empty description="暂无消息" v-else></el-empty>
	</div>
</template>

<script>
	import {getreadmes} from '../../api/article.js'
	import mesitem from './mesitem'
	export default{
		name:'alreadyread',
		components:{
			mesitem
		},
		created(){
			getreadmes().then(resp=>{
				if(resp.data.data.length>0){
					this.alreadymes = resp.data.data;
				}else{
					this.$message.info('暂无已读消息')
				}
			}).catch(err => {
					this.$message.error('获取已读消息失败')
				})
		},
		data(){
			return{
				alreadymes:'',
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
