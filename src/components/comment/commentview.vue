<template>
	<div>
		<ul>
			<a :href="'/userinfo/'+ comment.author.id"><img :src="comment.author.face" class="authorface"></a>	<!-- 通过绑定id来进行不同人信息的跳转 -->
			<a :href="'/userinfo/'+ comment.author.id" class="authorname">{{comment.author.nickname}}</a>
			<p class="commentcontent">{{comment.commentContent}}</p>
			<span class="createtime">{{comment.gmtCreate | format}}</span>
			<el-button @click="recallcomment()" type="text" size="small" class="recallcomment">回复</el-button>
			<li v-for="(r,index) in filterrecall()" :key="r.id" class="recall">
				<div style="font-size:14px;">
					<a :href="'/userinfo/'+ r.author.id"><img :src="r.author.face" class="rauthorface"></a>
					<a :href="'/userinfo/'+ r.author.id" class="author">{{r.author.nickname}}</a>回复<a :href="'/userinfo/'+ r.toUser.id" class="touser">@{{r.toUser.nickname}}</a>:{{r.commentContent}}
				</div>
			<span class="recalletime">{{r.gmtCreate | format}}</span>
			<el-button @click="recallcomment()" type="text" size="small" class="recallcomment">回复</el-button>
			</li>
			<el-input placeholder="你的回复...">
				
			</el-input>
		</ul>
	</div>
</template>

<script>
	import {
		getrecall
	} from '../../api/article.js'
	export default {
		name: 'commentview',
		data() {
			return {
				leveltwo: [],
			}
		},
		props: {
			comment: Object
		},
		created() {

			this.getrecall();
		},
		methods: {
			getrecall() {
				let id = this.$route.params.id;
				getrecall(id).then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到评论',
								type: 'error'
							})
						} else {
							this.leveltwo = resp.data.data;
						}
					} else {
						this.$message.error(resp.data.msg)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			filterrecall() {
				return this.leveltwo.filter(item => item.parentId == this.comment.id)
			},
			recallcomment(){
			var input = document.querySelector('.el-input');
				
			}
		}
	}
</script>

<style scoped="scoped">
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul a {
		margin-right: 10px;
		text-decoration: none !important;
	}
	.el-input{
		display: none;
	}
	.authorname {
		color: #475256;
		font-size: 14px;
	}

	.authorface {
		width: 40px;
		height: 40px;
		border: 1px solid #ffffff;
		border-radius: 50%;
		vertical-align: middle;
		background-color: #e5f5ee;
		padding: 0;
	}

	.rauthorface {

		width: 30px;

		height: 30px;

		border: 1px solid #ffffff;

		border-radius: 50%;

		vertical-align: middle;

		background-color: #e5f5ee;

		padding: 0;
		margin-left:10px;

	}
	.recall{
		margin-bottom: 10px !important;
		margin-top: 10px !important;
	}
	.recallcomment {
		color: #6d6d6d;
		letter-spacing: 1px;
		font-size: 12px;
	}
	.author{
		font-size: 13px;
		color: #475256;
		margin-right: 5px;
	}
	.touser{
		margin-left: 5px;
		font-size: 13px;
		color:#008ac5;
		margin-right:5px;
	}
	.recalletime{
		font-size: 12px;
		margin-left:50px;
		color: #7f7f7f;
		width:100%;
		margin-right: 20px;
	}
	.commentcontent {
		font-size: 15px;
		color: #393939;
	}

	.createtime {
		font-size: 12px;
		margin-right: 30px;
		color: #7f7f7f;
	}
</style>
