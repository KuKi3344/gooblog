<template>
	<div class="card">
	<img src="../../assets/img/pk3.png" alt="" class="img">
	<div class="chatname">GOOGOO 聊天室</div>
	<div class="intro">来和大家一起探讨学到的知识吧</div>
	<el-button @click="$router.push('/chat')" size="small" type="primary">点击进入</el-button>
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
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.img{
		width: 180px;
		margin-top: 15px;
		margin-bottom: 5px;
	}
	.chatname{
		
		width: 100%;
		text-align: center;
		font-size: 14px;
		letter-spacing: 2px;
		color: #55657e;
		margin: 10px;
		font-weight: 550;
	}
	.intro{
		text-align: center;
		font-size: 13px;
		color: #4d535d;
		margin-bottom: 10px;
		margin-top: 5px;
	}
	.el-button{
		margin: 5px;
		margin-bottom: 20px;
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
		background: rgba(246, 247, 247, 1.0);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
