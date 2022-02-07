<template>
	<div style="display: flex;justify-content: center;">
		<el-card>
			<div class="me-article-header">

				<a @click="view(id)" class="me-article-title"><i class="el-icon-document"></i>{{title}}</a>
				<el-button v-if="isTop" class="me-article-icon" type="text" size="mini">置顶</el-button>
			</div>

			<div class="me-artile-description"  @click="view(id)" >
				{{summary}}
			</div>
			<div class="intro">
				<div class="me-article-author">
					<a :href="'/#/userinfo/'+author.id" class="me-icon-author">&nbsp;{{author.nickname}}</a>
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
			id: Number,
			isTop: Boolean,
			title: String,
			commentCounts: Number,
			viewCounts: Number,
			summary: String,
			author:Object,
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
		margin:10px 10px;
		margin-bottom: 5px;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		flex-wrap: wrap;
		border-radius: 10px;
		background-color: rgba(255,255,255,0.4);
		box-shadow: 0 5px 10px rgba(212, 212, 212, 0.5) !important;
	}
	.el-icon-document{
		color:#77c3c7;
		margin-right: 5px;
	}
	.me-article-title{
		font-weight: 600;
		font-size: 1rem;
		margin-right: 10px;
	}
	.me-article-header a:hover{
		color:#5c9f74 !important;
	}
	.me-artile-description{
		min-height:50px;
		font-size: 0.8rem;
		margin-top: 10px;
	}
	.me-article-count{
		color:#909090;
		font-size: 0.18rem;
	}
	.intro{
		display: flex;
		justify-content: space-between;
		padding-bottom:5px ;
		border-bottom: 1px solid #dedede;
		margin-top: 10px;
	}
	.foot{
		width:100%;
	}
	.me-article-author{
		font-size: 12px;
	}
	.me-icon-author{
		color:#909090;
		text-decoration: none;
	}
	.footview{
		color:#a2a2a2;
		font-size: 0.6rem;
		margin-right: 10px;
	}
	@media screen and (max-width:520px) {
	.me-artile-description{
		min-height:20px;
		font-size: 12px;
}	.me-article-title{
	font-size: 13px;
}
	}
</style>
