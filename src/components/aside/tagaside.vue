<template>
	<div class="card2">
		<span class="tagtitle">最热标签</span>
		<div class="line"></div>
	<div class="list">
		<el-tag type="success" v-for="t in datalist" :key="t.id">{{t.tagName}}</el-tag>
	</div>
	</div>
</template>

<script>
	import {gethottag} from '../../api/article.js'
	export default {
		name: 'tagaside',
		data() {
			return {
				datalist:''
			}
		},
		created(){
			this.gettag();
		},
		methods:{
			gettag(){
				gethottag().then(resp=>{
					if(resp.data.code == 200){
						if(resp.data.data.length<=0){
							this.$message({
								showClose: true,
								message: '找不到热门标签了',
								type: 'error'
							})
						}else{
							this.datalist = resp.data.data;
						}
					}else{
						this.$message.error(resp.data.msg)
					}
				}).catch(err => {
						this.$message.error('加载失败')
					})
			}
		}
	}
</script>

<style scoped="scoped">
	.card2 >>>{
		box-shadow: 0 10px 15px rgba(212, 212, 212, 0.8);
		border-radius: 5px;
		margin:15px;
		margin-top: 50px;
	}
	.tagtitle{
		display: inline-block;
		width:100%;
		height:30px;
		text-align: center;
		font-size: 14px;
		letter-spacing: 5px;
		color:#294154;
		margin-top:20px;
		margin-bottom:5px;
	}
	.line{
		height:0.5px;
		width:200px;
		background-color: #cfdde6;
		margin:5px auto;
	}
	.list{
		margin-top: 30px;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
	}
	.list .el-tag{
		margin-right: 30px;
		margin-bottom: 30px;
		margin-left: 20px;
		min-width:80px ;
		text-align: center;
	}

</style>
