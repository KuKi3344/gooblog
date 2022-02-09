<template>
	<div>
		<mesitemmain v-for="m in message" :key="m.id" :m="m" @getmes="getmes"></mesitemmain>
	</div>
</template>

<script>
	import mesitemmain from './mesitemmain'
	export default{
		name:'mesitem',
		props:{
			message:Array
		},
		components:{
			mesitemmain
		},
		methods:{
			getmes(){
				this.$emit('getmes');
			}
		}
	}
</script>

<style scoped="scoped">

</style>
