<template>
	<div>
		<ul>
			<a :href="'/userinfo/'+ comment.author.id"><img :src="comment.author.face" class="authorface"></a>
			<!-- 通过绑定id来进行不同人信息的跳转 -->
			<a :href="'/userinfo/'+ comment.author.id" class="authorname">{{comment.author.nickname}}</a>
			<p class="commentcontent">{{comment.commentContent}}</p>
			<span class="createtime">{{comment.gmtCreate | format}}</span>
			<el-button @click="showcomment(-1,comment.author)" type="text" size="small"
				class="recallcomment">回复</el-button>				
			<el-button @click="removecomment(comment.id)" type="text" size="small"
				class="removecomment" v-if="comment.author.id == userid">删除</el-button>
			<li v-for="(r,index) in filterrecall()" :key="r.id" class="recall">
				<div style="font-size:14px;">
					<a :href="'/userinfo/'+ r.author.id"><img :src="r.author.face" class="rauthorface"></a>
					<a :href="'/userinfo/'+ r.author.id" class="author">{{r.author.nickname}}</a>回复<a
						:href="'/userinfo/'+ r.toUser.id" class="touser">@{{r.toUser.nickname}}</a>:{{r.commentContent}}
				</div>
				<span class="recalletime">{{r.gmtCreate | format}}</span>
				<el-button @click="showcomment(-1,r.author)" type="text" size="small"
					class="recallcomment">回复</el-button>
					<el-button @click="removecomment(r.id)" type="text" size="small"
					v-if="r.author.id == userid"	class="removecomment">删除</el-button>
			</li>
			<div v-show="commentshow" class="showreply">
				<el-input class="reply" type="textarea" :placeholder="placeholder" 
				v-model="reply.commentContent" resize="none">
				</el-input>
				<el-button @click="recallcomment()" round size="mini" style="margin:5px;width:60px;">评论</el-button>
			</div>

		</ul>
	</div>
</template>

<script>
	import {
		getrecall,recall
	} from '../../api/article.js'
	export default {
		name: 'commentview',
		data() {
			return {
				leveltwo: [],
				placeholder: '你的回复...',
				reply: this.getEmptyReply(),
				commentShowIndex: '',
				commentshow: false,
				userid:this.$store.state.id,
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
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			filterrecall() {
				return this.leveltwo.filter(item => item.parentId == this.comment.id)
			},
			showcomment(commentindex, toUser) {
				this.reply = this.getEmptyReply();
				if (this.commentShowIndex != commentindex) {
					this.placeholder = `@${toUser.nickname}`
					this.reply.toUserId = toUser.id;
					this.commentshow = true;
					this.commentShowIndex = commentindex
				}else{
					this.commentshow = false;
					this.commentShowIndex = '';
				}

			},
			recallcomment() {
					recall(this.reply).then(resp=>{
						if (resp.data.code == 200) {
							this.$message.success("回复成功")
							this.getrecall();
							this.getEmptyReply();
							this.commentshow = false;
							this.commentShowIndex = '';
						} else {
							this.$message.error(resp.data.message)
						}
					}).catch(err => {
						this.$message.error('加载失败')
					})
			},
			getEmptyReply() {
				return {
					articleId: this.$route.params.id,
					toUserId: '',
					parentId: this.comment.id,
					commentContent: ''

				}
			},
			removecomment(){
				
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
	.showreply{
		width:100%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
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
		margin-left: 10px;

	}

	.recall {
		margin-bottom: 10px !important;
		margin-top: 10px !important;
	}

	.recallcomment {
		color: #6d6d6d;
		letter-spacing: 1px;
		font-size: 12px;
	}
	.removecomment{
	
	}
	.author {
		font-size: 13px;
		color: #475256;
		margin-right: 5px;
	}

	.touser {
		margin-left: 5px;
		font-size: 13px;
		color: #008ac5;
		margin-right: 5px;
	}

	.recalletime {
		font-size: 12px;
		margin-left: 50px;
		color: #7f7f7f;
		width: 100%;
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
