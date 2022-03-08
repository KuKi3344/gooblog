<template>
	<div>
		<div class="bk">
			<!-- 	<div class='frosted-glass'>		 -->
			<div class="time">
				<span class="timeshow">{{hour}}<span id="time">:</span>{{minute}}</span>
				<div class="input">
					<el-autocomplete class="inline-input" v-model="condition" :fetch-suggestions="search" clearable
						placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
					<el-button icon="el-icon-search" size="small" @click="filterall"></el-button>
				</div>

			</div>
			<!-- 	</div> -->
		</div>
		<articlescrollpage></articlescrollpage>
	</div>
</template>

<script>
	import articlescrollpage from '../components/common/articlescrollpage'
	import {
		searchall
	} from '../api/article.js'
	export default {
		name: 'home',
		data() {
			return {
				minute: '',
				hour: '',
				articles: [],
				condition: '',
				searchlist:[]
			}
		},
		created() {
			var time = new Date();
			this.minute = time.getMinutes();
			this.hour = time.getHours();
			if (this.minute < 10) {
				this.minute = '0' + this.minute;
			}
			if (this.hour < 10) {
				this.hour = '0' + this.hour;
			}
		},
		components: {
			articlescrollpage,
		},
		watch:{
			condition(){
				this.searchlist=[]
			}
		},
		methods: {
			search(queryString, cb) {
				var that = this;
				let params = {
					condition: this.condition,
					page: 1,
					pageSize: 5
				}
				let timer = null;
				clearInterval(timer);
				timer = setTimeout(()=>{
						searchall(params).then(resp => {
					if (resp.data.data.length > 0) {
						this.searchlist = resp.data.data;
						this.searchlist.forEach(function(value, index, array) {
							that.searchlist[index].value = value.title
						})
						var list = this.searchlist
						cb(list)
					}else{
						let list2 = [
							{
							value:'暂无'
								}
						]
						cb(list2)
					}

				})
				},800)
			
			},
			handleSelect(item) {
				this.$router.push(`/article/${item.id}`)
			},
			filterall(){
				if(this.condition!=''){
					this.$router.push(`/search/${this.condition}`);
				}
				
			}
		}
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

	.timeshow {
		font-size: 50px;
		display: block;
		height: 80px;
		line-height: 80px;
	}

	.el-button {
		border-bottom-right-radius: 18px;
		border-top-right-radius: 18px;
		border: none;
	}

	.input {
		width: 65%;
		margin-top: 20px;
		margin-bottom: 20px;
		background-color: #fff;
		border-radius: 18px;
		display: flex;
		justify-content: flex-start;
		flex-wrap: nowrap;
		
	}
#time{
	animation:appear 0.8s alternate infinite ease-in;
}
	.el-autocomplete {
		flex: 1;
		color: #000000;
	}
@keyframes appear{
	0%{
		opacity: 1;
	}
	50%{
		opacity: 0.7;
	}
	100%{
		opacity: 0;
	}
}
	::v-deep .el-input__inner {
		border-top-left-radius: 18px;
		border-bottom-left-radius: 18px;
		border: none;
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
			height: 60px !important;
			margin-top: 50px !important;
			border-radius: 15px;
		}

	}
</style>
