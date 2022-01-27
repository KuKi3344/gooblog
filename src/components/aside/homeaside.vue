<template>
	<div class="card">
			<div class="head">
				<img src="https://guangzan.gitee.io/imagehost/Illustrations/spring.svg">
			</div>
			<div style="margin-bottom:10px;">
				<span id="name">站长</span>
				<span id="intro">KuKi and Noblegasesgoo</span>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'homeaside',
		data() {
			return {

			}
		}
	}
</script>

<style scoped="scoped">
	.card >>>{
		border-radius: 5px;
		margin:15px;
		animation-name: ease;
		animation-duration: 2s;
		background-color: #fcfcfc;
		border-radius: 10px;
	}
	#name {
		display: inline-block;
		width: 100%;
		text-align: center;
		font-size: 18px;
		font-family: "c";
		letter-spacing: 1px;
		color: #243554;
		font-family: "bodoni mt condensed";
	}
	.head{
		transform: translateX(50px);
	}
	.head img {
		width: 180px;
		margin-bottom:20px;
		margin-top: 20px;
	}
#intro{
	font-size: 12px;
	display: inline-block;
	width: 100%;
	text-align: center;
	letter-spacing: 2px;
	margin-top: 10px;
	color:#767676;
	margin-bottom: 20px;
}
iframe{
	margin-top:30px;
	margin-bottom: 10px;
}
@keyframes ease{
	0%{
		opacity: 0.6;
		transform: rotateY(60deg);
		
	}
	100%{
		opacity: 1;
	}
}
</style>
