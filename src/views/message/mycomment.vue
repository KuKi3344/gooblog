<template>
	<div class="mycomment">
		<el-container>
			<el-main class="me-intro">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="未读消息" name="first">
						<noread></noread>
					</el-tab-pane>
					<el-tab-pane label="已读消息" name="second">
						<alreadyread></alreadyread>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import noread from '../../components/message/noread'
	import alreadyread from '../../components/message/alreadyread'
	export default {
		name: 'mycomment',
		data() {
			return {
				activeName: 'first'
			}
		},
		components: {
			noread,
			alreadyread
		},
		methods: {
			handleClick(tab, event) {
				document.title = `${tab.label} -GOOBLOG`
			}
		}
	}
</script>

<style scoped="scoped">
	.mycomment {
		display: flex;
		justify-content: center;
		z-index: 99 !important;
	}

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
	}
	@media screen and (max-width: 520px) {
	    .mycomment{
			margin-top: 40px;
			box-sizing: ;
		}
		::v-deep .el-tabs__item{
			font-size: 12px !important;
		}
	}
</style>
