<template>
	<div>
		<ul>
			<div style="display: flex;align-items: center;">
				<router-link :to="'/userinfo/'+ comment.author.id">
					<div class="mypic">
						<img :src="comment.author.face" class="authorface" v-if="comment.author.face">
						<img :src="imgsrc" class="authorface" v-else>
					</div>
				</router-link>
				<!-- 通过绑定id来进行不同人信息的跳转 -->
				<router-link :to="'/userinfo/'+ comment.author.id" class="authorname">{{comment.author.nickname}}
				</router-link>
			</div>

			<p class="commentcontent">{{comment.commentContent}}</p>
			<span class="createtime">{{comment.gmtCreate | format}}</span>
			<el-button @click="showcomment(-1,comment.author)" type="text" size="small" class="recallcomment">回复
			</el-button>
			<el-button @click="removecomment(comment.id,comment.author.id)" type="text" size="small"
				class="removecomment" v-if="comment.author.id == userid">删除</el-button>
			<li v-for="(r,index) in filterrecall()" :key="r.id" class="recall" :id="r.id">
				<div style="font-size:13px;display: flex;flex-direction:column;">
					<div style="display: flex;">
						<router-link :to="'/userinfo/'+ r.author.id">
							<div class="mypic2">
								<img :src="r.author.face" class="rauthorface" v-if="r.author.face">
								<img :src="imgsrc" class="rauthorface" v-else>
							</div>

						</router-link>
						<div style="display: flex;align-items: center;">
							<router-link :to="'/userinfo/'+ r.author.id" class="author">{{r.author.nickname}}
							</router-link>
							<span width="30">回复</span>
							<router-link :to="'/userinfo/'+ r.toUser.id" class="touser">@{{r.toUser.nickname}}:
							</router-link>
						</div>

					</div>
					<div style="margin:10px 40px 0 40px;letter-spacing: 1px;line-height: 18px;">{{r.commentContent}}</div>
				</div>
				<span class="recalletime">{{r.gmtCreate | format}}</span>
				<el-button @click="showcomment(-1,r.author)" type="text" size="small" class="recallcomment">回复
				</el-button>
				<el-button @click="removecomment(r.id,r.author.id)" type="text" size="small"
					v-if="r.author.id == userid" class="removecomment">删除</el-button>
			</li>
			<div v-show="commentshow" class="showreply">
				<el-input class="reply" type="textarea" :placeholder="placeholder" v-model="reply.commentContent"
					maxlength="300" resize="none">
				</el-input>
				<el-button @click="recallcomment()" round size="mini" style="margin:5px;width:60px;">评论</el-button>
			</div>

		</ul>
	</div>
</template>

<script>
	import {
		getrecall,
		recall,
		deletecomment
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
				userid: this.$store.state.id,
			}
		},
		props: {
			comment: Object
		},
		created() {
			this.getrecall();
		},
		mounted() {

		},
		methods: {
			getrecall() {
				let id = this.$route.params.id;
				getrecall(id).then(resp => {
					if (resp.data.code == 200) {
						this.leveltwo = resp.data.data;
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
				} else {
					this.commentshow = false;
					this.commentShowIndex = '';
				}

			},
			recallcomment() {
				this.reply.commentContent = this.reply.commentContent.replace(/</g, "&lt").replace(/>/g, "&gt");;
				recall(this.reply).then(resp => {
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
					level: 2,
					toUserId: '',
					articleId: this.$route.params.id,
					parentId: this.comment.id,
					commentContent: ''

				}
			},
			removecomment(id, fromUserId) {
				this.$confirm('此评论将被删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deletecomment(id, fromUserId).then(resp => {
						if (resp.data.code == 200) {
							this.$message.success('删除成功！')
							this.getrecall();
							this.$emit('getcomment');
						} else {
							this.$message.error('删除失败,请稍后重试')
						}
					})
				})
			}
		}
	}
</script>

<style scoped="scoped">
	ul {
		list-style: none;
		margin: 0;
		padding: 10px;
	}

	ul a {
		margin-right: 10px;
		text-decoration: none !important;
	}

	.showreply {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.authorname {
		color: #424c53;
		font-size: 13px;
	}

	.mypic {
		width: 38px;
		height: 38px;
		border: 1px solid #ffffff;
		border-radius: 50%;
		background-color: #e5f5ee;
		display: flex;
		justify-content: center;
		overflow: hidden;
	}

	.mypic2 {
		width: 30px;
		height: 30px;
		border: 1px solid #ffffff;
		border-radius: 50%;
		background-color: #e5f5ee;
		display: flex;
		justify-content: center;
		overflow: hidden;
	}

	.authorface {
		height: 38px;
		width: auto;
		padding: 0;
	}

	.rauthorface {
		width: auto;
		height: 30px;
		padding: 0;

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

	.removecomment {}

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
		margin-left: 45px;
		color: #7f7f7f;
		width: 100%;
		margin-right: 20px;
	}

	.commentcontent {
		font-size: 15px;
		color: #393939;
		letter-spacing: 1px;
		line-height: 18px;
	}

	.createtime {
		font-size: 12px;
		margin-right: 30px;
		color: #7f7f7f;
	}
</style>
