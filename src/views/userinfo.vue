<template>
	<div style="display: flex;justify-content: center;z-index: 99 !important;">
		<el-container>
			<el-main class="me-intro">
				<div class="head">
						<div class="img">
							<img :src="user.face" v-if="user.face">
							<img :src="imgsrc"
								v-else>
							<div class="name">
								{{user.nickname}}
							</div>
						</div>			

				</div>
				<div class="body">
					
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import {getuserbyid} from '../api/article.js'
	export default {
		name: 'userinfo',
		data() {
			return {
				userid:this.$route.params.id,
				user:''
			}
		},
		created(){
			getuserbtid(this.userid).then(resp=>{
				if(resp.data.code == 200){
					this.user = resp.data.data;
				}else{
					this.$router.go(-1);
					this.$message.warning('获取用户信息错误');
				}
				
			})
		},
		mounted(){
			document.title=`${this.user.nickname}的主页	-	GOOBLOG`;
		}
	}
</script>

<style scoped="scoped">
	.el-container {
		margin-top: 20px;
		margin-left: 5px;
		margin-right: 5px;
		justify-content: center;
		flex-direction: column;
	}

	.me-intro {
		min-width: 280px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 10px;
		padding: 5px;
		padding-right: 20px;
	}

	.head {
		margin: 10px;
		background: url(../assets/img/bk.png);
		
		width: 100%;
		height: 250px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.img {
		margin: 20px 30px;
		float: left;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.img img {
		width: 75px;
		height: 75px;
		border-radius: 50%;
		border: 2px solid #fff;
		margin-right: 15px;
	}

	.name {
		text-align: center;
		font-size: 20px;
		font-weight: 600;
		letter-spacing: 1px;
		color: #ffffff;
	}

	@media screen and (max-width:520px) {

		.el-container {
			margin-top: 60px;
		}

		.img img {
			width: 45px;
			height: 45px;
			margin-right: 5px;
		}

		.name {
			font-size: 13px;
		}

		.head {
			height: 150px;
		}

		.img {
			margin: 5px;
			margin-left: 15px !important;
		}

	}
</style>
