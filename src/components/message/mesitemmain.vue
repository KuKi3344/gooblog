<template>
	<el-card>
		<div class="comment">
			<div class="title" v-if="m.type==1">
				<div>
					<router-link :to="'/userinfo/'+m.fromUser.id">
						<div class="mypic">
							<img :src="m.fromUser.face" v-if="m.fromUser.face">
							<img :src="imgsrc" v-else>
						</div>

					</router-link>
				</div>
				<div class="title-right">
					<div class="name"><a :href="'/#/userinfo/'+m.fromUser.id">{{m.fromUser.nickname}}</a>评论了你的文章</div>
					<div style="display: flex;align-items: center;margin-left: 5px;">
						<el-button type="primary" icon="el-icon-edit" circle size="mini" @click="showtext"></el-button>
						<el-button v-if="m.messageStatus=='未读'" type="success" icon="el-icon-check" circle size="mini"
							@click="confirm(m.id)"></el-button>
					</div>
				</div>
			</div>
			<div class="title" v-else>
				<div>
					<router-link :to="'/article/'+m.fromUser.id">
						<div class="mypic">
							<img :src="m.fromUser.face" v-if="m.fromUser.face">
							<img :src="imgsrc" v-else>
						</div>

					</router-link>
				</div>
				<div class="title-right">
					<div class="name"><a :href="'/#/userinfo/'+m.fromUser.id">{{m.fromUser.nickname}}</a>回复了你的评论</div>
					<div style="display: flex; align-items: center;margin-left: 5px;">
						<el-button v-if="m.messageStatus=='未读'" type="success" icon="el-icon-check" circle size="mini"
							@click="confirm(m.id)"></el-button>
					</div>
				</div>
			</div>

			<div class="main">
				<span>:&ensp;{{m.content}}</span>
				<a @click="goarticle(m.id)">
					<div class="article">
						<p>来自文章:&ensp;{{m.article.title}}</p>
					</div>
				</a>
				<div v-show="!fold" class="showreply">
					<el-input class="reply" type="textarea" placeholder="输入你的回复" v-model="reply.commentContent"
						resize="none">
					</el-input>
					<el-button @click="recallcomment(m.article.id,m.fromUser.id,m.commentId,m.id)" round size="mini"
						style="margin:5px;width:60px;">回复</el-button>
				</div>
				<span
					style="font-size: 13px;color:#9d9d9d;float: right;display: block;margin:8px;">{{m.gmtCreate}}</span>
			</div>
		</div>
	</el-card>
</template>

<script>
	import {
		recall,
		confirmmes
	} from '../../api/article.js'
	export default {
		name: 'mesitemmain',
		props: {
			m: Object
		},
		data() {
			return {
				fold: true,
				reply: this.getreply()
			}
		},
		methods: {
			showtext() {
				if (this.fold) {
					this.fold = false;
				} else {
					this.fold = true;
				}
			},
			getreply() {
				return {
					level: 2,
					toUserId: '',
					articleId: '',
					parentId: '',
					commentContent: ''

				}
			},
			recallcomment(articleId, toUserId, parentId, mesid) {
				this.reply.articleId = articleId;
				this.reply.toUserId = toUserId;
				this.reply.parentId = parentId;
				recall(this.reply).then(resp => {
					if (resp.data.code == 200) {
						this.$message.success("回复成功")
						this.confirm(mesid);
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			confirm(mesid) {
				confirmmes(mesid).then(resp => {
					this.fold = true;
					this.$emit('getmes');
				})
			},
			goarticle(id){
				this.$router.push(`/article/${this.m.article.id}`).then(i=>{
					setTimeout(()=>{
						location.href=`#${id}`
					},1000)
					
				})
			}
		}
	}
</script>

<style scoped="scoped">
	a {
		text-decoration: none;
	}

	.comment {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		padding: 5px 10px;
		font-size: 15px !important;
	}

	.showreply {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-top: 10px;
	}

	.el-card {
		width: 100%;
		margin-bottom: 20px;
		border-radius: 10px;
	}

	::v-deep .el-card__body {
		padding: 10px !important;
	}

	.title a {
		text-decoration: none;
		color: #5797ff;
		margin-right: 5px;
	}

	.mypic {
		width: 38px;
		height: 38px;
		border-radius: 50%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		border: 1px solid #ffffff;
		margin-right: 5px;
		margin-top: 10px;
	}

	.title img {
		height: 38px;
		width: auto;
	}

	.title {
		display: flex;
		width: 100%;
		justify-content: flex-start;
		align-items: center;
	}

	.title-right {
		display: flex;
		justify-content: space-between;
		flex: 1;
	}

	.name {
		display: block;

	}

	.main {
		margin-left: 45px;
		width: 90%;

	}

	.article {
		background: rgba(243, 243, 243, 0.5);
		border-radius: 10px;
	}

	.article {
		width: 90%;
		padding: 5px;
		margin-top: 10px;
		color: #6d6d6d;
	}

	@media screen and (max-width: 520px) {
		.comment {
			font-size: 12px !important;
		}

		::v-deep .el-card__body {
			padding: 5px !important;
		}
	}
</style>
