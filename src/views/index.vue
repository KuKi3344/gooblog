<template>
	<div>
		<div class="homeimg"></div>
		<el-container>
			<el-main class="me-articles">
				<articlescrollpage></articlescrollpage>
			</el-main>
			<el-aside>
				<homeaside></homeaside>
				<tagaside></tagaside>
			</el-aside>
		</el-container>
	</div>
</template>

<script>
	import homeaside from '../components/aside/homeaside'
	import tagaside from '../components/aside/tagaside'
	import articlescrollpage from '../components/common/articlescrollpage'
	export default{
		name:'home',
		data(){
			return{
				
			}
		},
		components:{
			homeaside,
			articlescrollpage,
			tagaside
		}
	}
</script>

<style scoped="scoped">
	.el-container {
		height: auto;
		display: flex;
		justify-content: space-around;
		min-width:700px;
	}
	
	.el-aside {
		width: 310px !important;
		margin-left: 20px;
		margin-top: 10px;
		border-radius: 10px;
		margin-bottom: 20px;
		overflow: hidden;
	}

	.el-card {
		border-radius: 0;
	}
	
	.el-card:not(:first-child) {
		margin-top: 20px;
	}
	.me-articles{
		display:flex;
		flex-direction: column;
		min-width:400px;
		max-width: 700px;
		padding: 0px;
		line-height: 16px;
		margin-top: 30px;
	}
	.homeimg{
		height:40vw;
		min-height: 300px;
		width:100vw;
		min-width:740px;
		background: url(../assets/img/v2-09ea7304a416d1a5561a9f82fd1d2bcd_r.jpg);
		background-position-x: 50%;
		background-position-y: center;
		background-size: cover;
		transform: translateX(-10px);
		margin-bottom: 50px;
		
	}
</style>
