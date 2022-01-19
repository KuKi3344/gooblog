<template>
  <div id="app">
	  <canvas width="1777" height="841" style="position: fixed; left: 0px; top: 0px; z-index: 2147483647; pointer-events: none;"></canvas>
	<router-view></router-view>
	<gotop></gotop>
  </div>
</template>

<script>
	import gotop from'./components/gotop/gotop'
	export default {
		name:'app',
		components:{
			gotop
		}
	}
</script>

<style>
	body{
		cursor: url(https://files.cnblogs.com/files/wkfvawl/cursor.ico),auto;
	}
	*{
		margin:0;
		padding:0;
	}
::-webkit-scrollbar
{
    width:10px;
    height:10px;
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(61, 61, 61, 0.2);
    border-radius:10px;
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(59, 59, 59, 0.2);
    background-color:#7c7c7c;
}
</style>
