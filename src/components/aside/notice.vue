<template>
	<div class="card">
		<div class="title">
			<span id="top"><i class="el-icon-s-order"></i>公告</span>
		</div>
		<p>&nbsp;<b>声明:</b>本网站仅供内部人员学习使用,请勿转发不良信息<br/>
		不良信息举报邮箱:<br/>568818216@qq.com<br/>2632816823@qq.com<br/>儿童色情信息|扫黄打非举报电话:<br/>18504104308<br/>18687572786<br/>
		<b>若想加入我们,请联系以上邮箱</b><br/>
		<b>期待您的加入!</b>
		</p>
	</div>
</template>

<script>
	export default {
		name: 'homeaside',
		data() {
			return {

			}
		},

	}
</script>

<style scoped="scoped">
	.card>>> {
		border-radius: 5px;
		margin: 15px;
		animation-name: ease;
		animation-duration: 2s;
		background: rgba(251, 255, 255, 0.95);
		border-radius: 10px;
	}

	.title {
		font-size: 17px;
		color: #426358;
		width: 100%;
		font-weight: 650;
		margin-bottom: 15px;
		padding: 5px;
		

	}

	.el-icon-s-order {
		color: #01aef8;
	}

	#top {
		margin-left: 0px;
		letter-spacing: 8px;
		margin-top: 10px;
		display: inline-block;
		text-align: center;
		width: 100%;
	}

	.card p {
		font-size: 2px;
		letter-spacing: 3px;
		color: #607176;
		width: 85%;
		padding:0 20px 20px 20px;
		text-align: center;
	}
</style>
