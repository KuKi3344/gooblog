<template>
	<div class="card">
			<div class="head">
				<img src="../../assets/img/head2.jpg" style="transform: translateX(20px);">
				<img src="../../assets/img/head1.jpg">
			</div>
			<div>
				<span id="name">站长</span>
				<span id="intro">KuKi and Noblegasesgoo</span>
			</div>
			<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=280 height=86 src="//music.163.com/outchain/player?type=2&id=1826307499&auto=1&height=66"></iframe>
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
		box-shadow: 0 10px 15px rgba(212, 212, 212, 0.8);
		border-radius: 5px;
		margin:15px;
		animation-name: ease;
		animation-duration: 2s;
		background-color: #fff;
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
		width: 80px;
		border-radius: 50%;
		border: 2px solid #bababa;
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
