<template>
	<div style="display: flex;justify-content: center;">
		<el-card>
			<div class="me-article-header">

				<a @click="view(id)" class="me-article-title"><i class="el-icon-document"></i>{{title}}</a>
				<el-button v-if="isTop" class="me-article-icon" type="text" size="mini">置顶</el-button>
			</div>

			<div class="me-artile-description">
				{{summary}}
			</div>
			<div class="intro">
				<div class="me-article-author">
					<i class="me-icon-author"></i>&nbsp;{{authorName}}
				</div>
				<div class="me-pull-right me-article-count">
					<i class="el-icon-time"></i>&nbsp;{{gmtCreate | format}}
				</div>
			</div>
		
				<div class="foot">
					<span class="footview">
						<i class="el-icon-view"></i>&nbsp;{{viewCounts}}
					</span>
					<span class="footview">
						<i class="el-icon-chat-line-square"></i>&nbsp;{{commentCounts}}
					</span>
				</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'articleitem',
		props: {
			id: String,
			isTop: Boolean,
			title: String,
			commentCounts: Number,
			viewCounts: Number,
			summary: String,
			authorName: String,
			tags: Array,
			gmtCreate: String
		},
		data() {
			return {

			}
		},
		methods: {
			view(id) {
				this.$router.push(`/article/${id}`)
			},
		}
	}
</script>

<style scoped="scoped">
	body{
		font-size: 20px;
	}
	.el-card{
		flex:1;
		width:240px;
		max-width: 420px;
		max-height:350px;
		min-height:150px;
		margin:15px 10px;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		flex-wrap: wrap;
	}
	.el-icon-document{
		color:#63bad4;
		margin-right: 5px;
	}
	.me-article-title{
		font-weight: 600;
		font-size: 1rem;
		margin-right: 10px;
	}
	.me-article-header a:hover{
		color:#71c271 !important;
	}
	.me-artile-description{
		min-height:80px;
		font-size: 0.8rem;
		margin-top: 10px;
	}
	.me-article-count{
		color:#909090;
		font-size: 0.18rem;
	}
	.foot{
		border-top: 1px solid #e7e7e7;
		width:100%;
	}
	.footview{
		color:#a2a2a2;
		font-size: 0.6rem;
	}
</style>
