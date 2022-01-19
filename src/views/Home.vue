<template>
	<div class="home">
	<homeheader :avtiveIndex="activeIndex"></homeheader>
		<router-view></router-view>
		<homefooter v-show="footerShow"></homefooter>
	</div>
</template>

<script>
	import homeheader from '../components/header/homeheader'
	import homefooter from '../components/footer/homefooter'
	export default {
		name: 'Home',
		components: {
			homeheader,
			homefooter,
		},
		data() {
			return {
				activeIndex:"/home",
				footerShow:true
			}
		},
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.activeIndex = to.path;
			})
		},
		beforeRouteUpdate(to,from,next) {
			if(to.path =='/'){
				this.footerShow = true;
			}else{
				this.footerShow = false;
			}
			this.activeIndex = to.path;
			next();
		}
	}
</script>

<style scoped="scoped">
	*,
	html{
		margin: 0;
		padding: 0;
	}
</style>
