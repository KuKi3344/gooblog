<template>
	<div class="card">
		<div class="time">
			<span id="month">{{month}}</span>
			<span id="day">{{day}}</span>
		</div>
		<div class="head">
			<div class="clock">
				<div class="wrap">
					<div class="string1"></div>
					<div class="string2"></div>
					<div class="string3"></div>
					<div class="ringbit"></div>
					<div class="ring"></div>
					<div class="panel"></div>
					<div class="hour"></div>
					<div class="minute"></div>
					<div class="second"></div>
					<div class="pin"></div>
					<div class="mynum">
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
						<span>5</span>
						<span>6</span>
						<span>7</span>
						<span>8</span>
						<span>9</span>
						<span>10</span>
						<span>11</span>
						<span>12</span>
					</div>
				</div>
			</div>
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
				year: '',
				month: '',
				day: '',
			}
		},
		created() {
			var date = new Date();
			this.month = date.toDateString().split(" ")[1];
			this.day = date.getDate();
			this.year = date.getFullYear();
		},
		mounted() {
			var inc = 1000;
			this.myclock();
			setInterval(this.myclock, inc);
		},
		methods: {
			myclock() {
				const mydate = new Date();
				const hours = ((mydate.getHours() + 11) % 12) + 1;
				const minutes = mydate.getMinutes();
				const seconds = mydate.getSeconds();
				const hdegree = hours * 30;
				const mdegree = minutes * 6;
				const sdegree = seconds * 6;
				if (document.querySelector(".hour")) {
					document.querySelector(".hour").style.transform = `rotate(${hdegree}deg)`;
					document.querySelector(".minute").style.transform = `rotate(${mdegree}deg)`;
					document.querySelector(".second").style.transform = `rotate(${sdegree}deg)`;
				}

			}
		}
	}
</script>

<style scoped="scoped">
	body {
		background-color: #dfdad4;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.clock {
		border-radius: 100%;
		box-shadow: 2px 10px 15px 15px rgba(171, 171, 171, 0.2),
			inset 2px 25px 15px 15px rgba(184, 184, 184, 0.2);
		transform: scale(0.5);
	}

	.wrap {
		width: 250px;
		height: 250px;
		border-radius: 100%;
	}

	.ringbit {
		position: absolute;
		width: 150px;
		height: 350px;
		border: 20px solid transparent;
		border-radius: 90px;
		margin: auto;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		border-bottom: 20px solid rgba(82, 197, 124, 0.5);
	}

	.ringbit:before {
		content: "";
		position: absolute;
		width: 150px;
		height: 350px;
		border: 20px solid transparent;
		border-radius: 90px;
		margin: auto;
		left: -15%;
		bottom: 0;
		right: 0;
		top: 5%;
		border-bottom: 20px solid rgba(132, 132, 132, 0.2);
		filter: blur(5px);
		z-index: -1;
	}

	.ring {
		position: absolute;
		width: 100%;
		height: 100%;
		border: 20px solid rgba(108, 200, 174, 0.4);
		;
		border-radius: 100%;
		box-sizing: border-box;
		border-left: 20px solid rgba(102, 200, 163, 0.4);
		border-right: 20px solid rgba(72, 200, 140, 0.4);
	}

	.panel {
		position: absolute;
		height: 180px;
		width: 180px;
		background-color: #3db498;
		margin: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		border-radius: 100%;
	}

	.panel:after {
		content: "GOOBLOG";
		position: absolute;
		top: 48px;
		left: 0;
		right: 0;
		bottom: 0;
		color: #c7e5cc;
		font-size: 11px;
		text-align: center;
	}

	.string1,
	.string2,
	.string3 {
		position: absolute;
		width: 3px;
		height: 180px;
		border-top: 30px solid #89aac1;
		border-bottom: 30px solid #89aac1;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.string1 {
		transform: rotate(45deg);
	}

	.string2 {
		transform: rotate(135deg);
	}

	.string3 {
		transform: rotate(0deg);
		border-bottom: 200px solid #49b5c1;
		border-top: 0;
	}

	.mynum {
		font-family: "verdana";
		font-size: 1.2em;
		color: white;
	}

	.mynum span {
		width: 180px;
		height: 180px;
		position: absolute;
		margin: auto;
	}

	.mynum span:nth-child(1) {
		left: 160px;
		right: 0;
		top: 20px;
		bottom: 0;
	}

	.mynum span:nth-child(11) {
		left: 75px;
		right: 0;
		top: 20px;
		bottom: 0;
	}

	.mynum span:nth-child(12) {
		left: 113px;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.mynum span:nth-child(2) {
		left: 190px;
		right: 0;
		top: 80px;
		bottom: 0;
	}

	.mynum span:nth-child(10) {
		left: 25px;
		right: 0;
		top: 80px;
		bottom: 0;
	}

	.mynum span:nth-child(3) {
		left: 200px;
		right: 0;
		top: 155px;
		bottom: 0;
	}

	.mynum span:nth-child(9) {
		left: 10px;
		right: 0;
		top: 155px;
		bottom: 0;
	}

	.mynum span:nth-child(4) {
		left: 188px;
		right: 0;
		top: 235px;
		bottom: 0;
	}

	.mynum span:nth-child(8) {
		left: 30px;
		right: 0;
		top: 235px;
		bottom: 0;
	}

	.mynum span:nth-child(5) {
		left: 160px;
		right: 0;
		top: 270px;
		bottom: 0;
	}

	.mynum span:nth-child(7) {
		left: 80px;
		right: 0;
		top: 270px;
		bottom: 0;
	}

	.mynum span:nth-child(6) {
		left: 120px;
		right: 0;
		top: 280px;
		bottom: 0;
	}

	.hour,
	.minute,
	.second {
		position: absolute;
		background-color: white;
		margin: auto;
		left: 0;
		right: 0;
		transform-origin: bottom center;
	}

	.hour {
		height: 50px;
		width: 5px;
		top: 75px;
		border-radius: 10px;
	}

	.minute {
		height: 65px;
		width: 3.5px;
		top: 60px;
		border-radius: 10px;
	}

	.second {
		height: 70px;
		width: 2px;
		top: 55px;
		border-radius: 3px;
	}

	.pin {
		position: absolute;
		width: 5px;
		height: 5px;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background-color: #6ac4ff;
		border: 2px solid white;
		border-radius: 100%;
	}

	@keyframes myanim1 {
		to {
			transform: rotate(360deg);
		}
	}


	.card>>> {
		border-radius: 5px;
		margin: 15px;
		animation-name: ease;
		animation-duration: 2s;
		background: rgba(251, 255, 255, 0.95);
		border-radius: 10px;
	}

	#name {
		display: inline-block;
		width: 100%;
		text-align: center;
		font-size: 18px;
		font-family: "c";
		letter-spacing: 1px;
		color: #2784a6;
		letter-spacing: 5px;
		font-family: "bodoni mt condensed";
	}

	.head img {
		width: 180px;
		margin-bottom: 20px;
		margin-top: 20px;
	}

	.time {
		position: absolute;
		width: 30px;
		margin-left: 10px;
		height: 60px;
		font-size: 12px;
		color: #fff;
		text-align: center;
	}

	#month {
		display: block;
		width: 30px;
		height: 25px;
		background-color: #3abdc6;
		line-height: 25px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	#day {
		display: block;
		width: 30px;
		height: 25px;
		background-color: #c7ced4;
		line-height: 25px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	#intro {
		font-size: 12px;
		display: inline-block;
		width: 100%;
		text-align: center;
		letter-spacing: 2px;
		margin-top: 10px;
		color: #4cb2b9;
		margin-bottom: 10px;
	}

	#date {
		color: #55bcb4;
		display: inline-block;
		font-family: "DM Sans", sans-serif;
		font-size: 12px;
		font-weight: 500;
		width: 100%;
		text-align: center;
		padding-bottom: 20px;
		margin-bottom: 20px;
	}

	iframe {
		margin-top: 30px;
		margin-bottom: 10px;
	}

	@keyframes ease {
		0% {
			opacity: 0.6;
			transform: rotateY(60deg);

		}

		100% {
			opacity: 1;
		}
	}
</style>
