<template>
	<div class="card">
		<div class="time">
			<span id="month">{{month}}</span>
			<span id="day">{{day}}</span>
			</div>
			<div class="head">
				<img src="../../assets/img/pk3.png">
			</div>
			<div style="margin-bottom:10px;">
				<span id="name">站长</span>
				<span id="intro">KuKi and Noblegasesgoo</span>
				<span id="date">{{day}}&ensp;{{month}}&ensp;{{year}}</span>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'homeaside',
		data() {
			return {
				year:'',
				month:'',
				day:'',
			}
		},
		created(){
			var date = new Date();
			this.month = date.toDateString().split(" ")[1];
			this.day = date.getDate();
			this.year = date.getFullYear();
			
		}
	}
</script>

<style scoped="scoped">
	.card >>>{
		border-radius: 5px;
		margin:15px;
		animation-name: ease;
		animation-duration: 2s;
		background:rgba(251, 255, 255, 0.95);
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
	.time{
		position: absolute;
		width:30px;
		margin-left: 10px;
		height: 60px;
		font-size: 12px;
		color: #fff;
		text-align: center;
	}
	#month{
		display: block;
		width:30px;
		height:25px;
		background-color: #60a6d1;
		line-height: 25px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	#day{
		display: block;
		width:30px;
		height:25px;
		background-color: #c7ced4;
		line-height: 25px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
#intro{
	font-size: 12px;
	display: inline-block;
	width: 100%;
	text-align: center;
	letter-spacing: 2px;
	margin-top: 10px;
	color:#989898;
	margin-bottom: 10px;
}
#date{
	color: #aab2bc;
	display: inline-block;
	    font-family: "DM Sans",sans-serif;
	    font-size: 12px;
	    font-weight: 500;
		width: 100%;
		text-align: center;
		padding-bottom: 20px;
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
