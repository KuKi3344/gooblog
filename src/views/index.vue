<template>
	<div>
		<div class="bk">
			<!-- 	<div class='frosted-glass'>		 -->
			<div class="time">
				<span class="timeshow">{{hour}}:{{minute}}</span>
				  <el-input
				  class="biginput"
				  maxlength="20"
				  minlength="1"
				    placeholder="请输入内容"
				    suffix-icon="el-icon-search"
				    v-model="select"
					>
				  </el-input>
				  <el-input
				  class="smallinput"
				  maxlength="20"
				  minlength="1"
				    placeholder="请输入内容"
				    suffix-icon="el-icon-search"
				    v-model="select"
				  	size="mini">
				  </el-input>
			</div>
			<!-- 	</div> -->
		</div>
	<articlescrollpage></articlescrollpage>
	</div>
</template>

<script>
	import articlescrollpage from '../components/common/articlescrollpage'
	export default {
		name: 'home',
		data() {
			return {
				minute: '',
				hour: '',
				articles: [],
				select:'',
			}
		},
		created(){
			var time = new Date();
			this.minute = time.getMinutes();
			this.hour = time.getHours();
			if(this.minute<10){
				this.minute ='0' + this.minute;
			}
			if(this.hour<10){
				this.hour ='0' + this.hour;
			}
		},
		components: {
			articlescrollpage,
		},
	}
</script>

<style scoped="scoped">
.bk {
		border-top: #e8e8e8;
		display: flex;
		height: 260px;
		background-image: url(../assets/img/bk.png);
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		overflow: hidden;
		opacity: 0.8;
		border-radius: 30px;
		margin: 10px;
	}

	.time {
		color: #fff;
		letter-spacing: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		font-weight: 600;
	}
	.timeshow{
		font-size: 50px;
		display: block;
		height:80px;
		line-height: 80px;
	}
	.el-input {
		width: 65%;
		margin-top: 20px;
		margin-bottom: 20px;
		background-color: #fff;
		border-radius: 23px;
	}
	::v-deep .el-input__inner {
	        border-radius: 23px;
	      }
	@media screen and (max-width:1100px) {
	
		.bk {
			height: 70px;
			margin-top: 20px;
			border-radius: 30px;
		}
	
		.timeshow {
			display: none;
		}
	}
	@media screen and (max-width:520px) {
	
		.bk {
			height: 40px !important;
			margin-top: 50px !important;
			border-radius: 10px;
		}

		.biginput{
			display: none;
		}
		.smallinput{
			display: block;
		}
		

	}
	@media screen and (min-width:520px) {

		.biginput{
			display: block;
		}
		.smallinput{
			display: none;
		}
	
	}
	
</style>
