<template>
	<div class="home">
		<homeheader :avtiveIndex="activeIndex" class="homeheader"></homeheader>
		<homeheaderrow :avtiveIndex="activeIndex" class="homeheaderrow"></homeheaderrow>
		<div class="main">
			<router-view></router-view>
		</div>
		<homefooter v-show="footerShow"></homefooter>
	</div>
</template>

<script>
	import homeheader from '../components/header/homeheader'
	import homeheaderrow from '../components/header/homeheaderrow'
	import homefooter from '../components/footer/homefooter'
	export default {
		name: 'Home',
		components: {
			homeheader,
			homefooter,
			homeheaderrow
		},
		data() {
			return {
				activeIndex: "/home",
				footerShow: true,
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.activeIndex = to.path;
			})
		},
		beforeRouteUpdate(to, from, next) {
			if (to.path == '/') {
				this.footerShow = true;
			} else {
				this.footerShow = false;
			}
			this.activeIndex = to.path;
			next();
		}
	}
</script>

<style scoped="scoped">
	*,
	html {
		margin: 0;
		padding: 0;
	}
	.homeheader {
		height:100%;
		max-width:300px;
		width:auto;
		min-width:80px;
	}
		
	.homeheaderrow{
		width:100%;
		min-width:280px;
		max-height:40px;
	}
	.main{
		margin-left:220px;
	}
@media screen and (max-width: 1140px) {
    .main {
       margin-left: 110px;
    }
}
@media screen and (max-width: 400px) {
    .main {
       margin-left: 135px;
    }
}
@media screen and (max-width:520px) {
    .homeheader {
       display: none;
    }
	.homeheaderrow{
		display: block;
	}
	.main {
	   margin-left: 20px;
	   margin-right: 20px;
	}
}
@media screen and (min-width:520px) {
    .homeheaderrow {
       display: none;
    }
	.homeheader{
		display: block;
	}
	body{
		font-size: 12px;
	}
}
</style>
