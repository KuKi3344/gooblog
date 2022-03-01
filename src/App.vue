<template>
  <div id="app">
	
	<router-view></router-view>
	<!-- 加载动画 -->
	<div id="loader-wrapper">
	    <div id="loader"></div>
	    <div class="loader-section section-left"></div>
	    <div class="loader-section section-right"></div>
	    <div class="load_title">LOADING......<br><span>GOO BLOG</span></div>
	</div>
  </div>
</template>
<script>
	export default {
		name:'app',
		data(){
			return{

			}
		},
		mounted(){
			var box = document.querySelector("#loader-wrapper");
			setTimeout(()=>{
				box.remove();
			},1000)
			
		}
	}
</script>
<style>
	html{
		touch-action: pan-y;
	}


	@import url("./assets/css/loader.css");
	body{
		padding:0;
		margin:0;
		cursor: url(https://blog-static.cnblogs.com/files/lucas--liu/cat9.ico),auto;/* 鼠标样式 */
	}
	
::-webkit-scrollbar
{
    width:10px;
    height:10px;
    background-color:#ffffff;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(61, 61, 61, 0.2);
    border-radius:10px;
    background-color:#ffffff;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(59, 59, 59, 0.2);
    background-color:#dddddd;
}
	@media screen and (max-width:520px) {
	::-webkit-scrollbar
	{
	   display: none;
	}
	.el-message-box{
		width:250px !important;
		font-size: 12px !important;
	}
		
	
	}

</style>
