<template>
	<div @click="totop" v-show="topshow" class="me-to-top">
		<i class = "el-icon-caret-top"></i>
	</div>
</template>

<script>
	export default{
		name:'gotop',
		data(){
			return{
				topshow:false,
			}
		},
		methods:{
			totop(){
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				this.topShow = false;
			},
			needToTop(){
				let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
				if(curHeight > 400){
					this.topshow = true;
				}else{
					this.topshow = false;
				}
			}
		},
		mounted(){
			//等到整个视图都渲染完毕
			this.$nextTick(function(){
				window.addEventListener('scroll',this.needToTop);
			})
		}
	}
</script>

<style>
	.me-to-top{
		background-color: #fff;
		position: fixed;
		right:100px;
		bottom:150px;
		width:40px;
		height:40px;
		border-radius: 20px;
		cursor: pointer;
		transition:all 1s linear;
		box-shadow: 0 0 6px rgba(0,0,0,.12);
		z-index:5;
	}
	.me-to-top i{
		color:#7cd1a9;
		display:block ;
		line-height: 40px;
		text-align: center;
		font-size: 18px;
	}
</style>
