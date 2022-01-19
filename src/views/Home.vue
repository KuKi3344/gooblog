<template>
	<div class="home">
	<homeheader :avtiveIndex="activeIndex"></homeheader>
		<div class="homeimg"></div>
		<el-container>
			<el-main class="me-articles">
				<articlescrollpage></articlescrollpage>
			</el-main>
			<el-aside>
				<homeaside></homeaside>
			</el-aside>
		</el-container>
		<homefooter v-show="footerShow"></homefooter>
	</div>
</template>

<script>
	import homeheader from '../components/header/homeheader'
	import homefooter from '../components/footer/homefooter'
	import homeaside from '../components/aside/homeaside'
	import articlescrollpage from '../components/common/articlescrollpage'
	export default {
		name: 'Home',
		components: {
			articlescrollpage,
			homeheader,
			homefooter,
			homeaside
		},
		data() {
			return {
				activeIndex:"/",
				footerShow:false
			}
		}
	}
</script>

<style scoped="scoped">
	*,
	html{
		margin: 0;
		padding: 0;
	}
	.el-container {
		height: auto;
		display: flex;
		justify-content: space-around;
		min-width:700px;
	}

	.el-aside {
		width: 250px;
		min-width: 200px;
		margin-left: 20px;
		box-shadow: 0 15px 25px rgba(212, 212, 212, 0.8);
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.el-main {
		padding: 0px;
		line-height: 16px;
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
		max-width: 600px;
	}
	.homeimg{
		height:40vw;
		min-height: 300px;
		width:100vw;
		min-width:720px;
		background: url(../assets/img/v2-09ea7304a416d1a5561a9f82fd1d2bcd_r.jpg);
		background-position-x: 50%;
		background-position-y: center;
		background-size: cover;
		transform: translateX(-10px);
		margin-bottom: 50px;
		
	}
</style>
