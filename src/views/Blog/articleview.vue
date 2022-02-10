<template>
	<div class="me-view-body">
		<el-container class="me-view-container">

			<el-main>

				<div class="me-view-card">
					<h1 class="me-view-title">{{article.title}}</h1>
					<div class="me-view-author">
						<a :href="'/#/userinfo/'+article.author.id">
							<img class="me-view-picture" :src="article.author.face" v-if="article.author.face"></img>
							<img class="me-view-picture" :src="imgsrc" v-else></img>

						</a>
						<div class="me-view-info">
							<a :href="'/#/userinfo/'+article.author.id">
							<span>{{article.author.nickname}}</span>
							</a>
							<div class="me-view-meta">
								<span>{{article.gmtCreate | format}}</span>
								<span>阅读 {{article.viewCounts}}</span>
								<span>评论 {{article.commentCounts}}</span>
							</div>

						</div>
						<el-button v-if="article.author.id == this.$store.state.id" @click="editArticle()" size="medium"
							icon="el-icon-edit" class="edit" type="text">编辑</el-button>
					</div>
					<div class="me-view-content">
						<markdown :editor="article.editor"></markdown>
					</div>

					<div class="me-view-end">
						<el-alert title="已经到底了" type="success" center :closable="false">
						</el-alert>
					</div>

					<div class="me-view-tag">
						标签：
						<el-button @click="tagOrCategory('tag', t.id,t.tagName)" size="mini" type="primary"
							v-for="t in article.tags" :key="t.id" round plain>{{t.tagName}}</el-button>
					</div>

					<div class="me-view-tag">
						文章分类：
						<el-button @click="tagOrCategory('category', article.category.id,article.category.categoryName)" size="mini" type="primary"
							round plain>{{article.category.categoryName}}</el-button>
					</div>

					<div class="me-view-comment">
						<div class="me-view-comment-write">
							<el-row :gutter="20">
								
								<div width="40" height="40" style="display: flex;margin-bottom: 10px;">
									<a style="margin-right: 10px;">
										<a href="/#/login"><span class="noavator" v-if="!user">未登录</span></a>
										<img class="me-view-picture" :src="user.face" v-if="user&&user.face"></img>
										<img class="me-view-picture" :src="imgsrc" v-if="user&&!user.face"></img>
									</a>
									<el-input type="textarea" :autosize="{ minRows: 2}" placeholder="你的评论..."
										class="me-view-comment-text" v-model="subcomment.commentContent" resize="none">
									</el-input>
								</div>	
								<el-button type="button" size="small" round @click="publishComment()" style="float: right;">评论</el-button>
							</el-row>

						</div>

						<div class="me-view-comment-title">
							<span>{{article.commentCounts}} 条评论</span>
						</div>
						<div style="opacity: 1;padding:5px,20px;background:rgba(255,255,255,0.4);border-radius: 8px;"  v-if="levelone.length>0">
							<commentview v-for="comment in levelone" :key="comment.id" :comment="comment" @getcomment="getcomment" class="comment">
							</commentview>

						</div>
						<el-empty description="暂无评论" v-else></el-empty>
					</div>

				</div>
			</el-main>

		</el-container>
	</div>
</template>

<script>
	import {
		findarticle,
		getcomment,
		comment
	} from '../../api/article.js'
	import markdown from '../../components/markdown/markdown'
	import commentview from '../../components/comment/commentview'
	export default {
		name: 'articleview',
		data() {
			return {
				article: {
					id: '',
					title: '',
					commentCounts: 0,
					viewCounts: 0,
					summary: '',
					author:{
						id:'',
						nickname:'',
						face:''
					},
					tags: [],
					category: {},
					createDate: '',
					editor: {
						value: "",
						toolbarsFlag: false,
						subfield: false,
						defaultOpen: 'preview'
					}
				},
				user: JSON.parse(window.sessionStorage.getItem('user')),
				comment: {},
				levelone: [],
				subcomment: {
					articleId: '',
					commentContent: '',
					level:1
				}
			}
		},
		components: {
			markdown,
			commentview
		},
		created() {
			this.findArticleById();
			this.getcomment();
			
		},
		mounted() {
			setTimeout(() => {
				document.title = `${this.article.title}-文章详情`;
			}, 300)
		},
		methods: {
			findArticleById() {
				let id = this.$route.params.id;
				findarticle(id).then(resp => {
					if (resp.data.code == 200) {
						if (resp.data.data.length <= 0) {
							this.$message({
								showClose: true,
								message: '找不到文章了',
								type: 'error'
							})
						} else {
							this.article.editor.value = resp.data.data.body.content.replace(/\\r\\n/g, "\n");
							Object.assign(this.article, resp.data.data)
						}
					} else {
							this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			editArticle() {
				this.$router.push({
					path: `/write/${this.article.id}`
				})
			},
			tagOrCategory(type, id,name) {
				this.$router.push({
					path: `/${type}/all/${id}`,
					query:{
						name:name
					}
				})
			},
			getcomment() {
				let id = this.$route.params.id;
				getcomment(id).then(resp => {
					if (resp.data.code == 200) {
							this.levelone = resp.data.data;
					} else {
							this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			publishComment() {
				this.subcomment.articleId = this.$route.params.id;
				this.subcomment.commentContent = this.subcomment.commentContent;
				comment(this.subcomment).then(resp => {
					if (resp.data.code == 200) {
						this.$message.success("评论成功")
						this.getcomment();
						this.subcomment.commentContent = '';
					} else {
						this.$message.error(resp.data.message)
					}
				}).catch(err => {
					this.$message.error('评论失败')
				})
			}
		}

	}
</script>

<style scoped="scoped">
	body{
		font-size: 15px;
	}
	a{
		text-decoration: none;
	}

	.me-view-container {
		width: 100%;
		min-width:300px;
		display: flex;
		justify-content: center;
		opacity: 0.9;
		border-radius: 10px;
	}

	.el-main {
		min-width: 300px;
		max-width: 900px;
		

	}
	::v-deep .v-note-wrapper{
		background-color: rgba(255, 255, 255, 0.3);
		
			
	}
	.me-view-title {
		font-size: 30px;
		font-weight: 800;
		line-height: 1.3;
		margin-bottom: 20px;
	}

	.comment {
		border-bottom: 1px solid #dcdcdc;
		padding-bottom:0px;
		margin-top: 20px;
	}

	.me-view-author {
		/*margin: 30px 0;*/
		margin-top: 30px;
		vertical-align: middle;
	}

	.me-view-picture {
		width: 40px;
		height: 40px;
		border: 1px solid #ddd;
		border-radius: 50%;
		vertical-align: middle;
		background-color: #5fb878;
		padding: 0;
	}

	.noavator {
		display: block;
		font-size: 12px;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #ffffff;
		background-color: #7ccba0;
	}

	.me-view-info {
		display: inline-block;
		vertical-align: middle;
		margin-left: 8px;
	}
.me-view-info a{
	color:#3f454b;
}
	.me-view-content {
		margin-top: 30px !important;
		
	}
	.me-view-meta {
		font-size: 12px;
		color: #969696;

	}

	.me-view-meta span {
		margin-right: 5px;
	}

	.me-view-end {
		margin-top: 20px;
	}

	.me-view-tag {
		margin-top: 20px;
		padding-left: 6px;
		border-left: 4px solid #c5cac3;
	}

	.me-view-tag-item {
		margin: 0 4px;
	}

	.me-view-comment {
		margin-top: 60px;
	}

	.me-view-comment-title {
		font-weight: 600;
		border-bottom: 1px solid #f0f0f0;
		padding-bottom: 20px;
	}

	.el-button {
		margin-top: 10px;
	}

	.me-view-comment-write {
		margin-top: 20px;
	}

	.me-view-comment-text {
		font-size: 13px;
	}


	.v-note-wrapper .v-note-panel {
		box-shadow: none !important;
	}

	::v-deep .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
	.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
		background: none !important;
		padding: 10px !important;
		border-radius: 25px !important;
	}

	.edit {
		margin-left: 50px;
		float: right;	
		color: #538c5d;
		font-size:0.9vw;
		box-shadow: 0 15px 25px rgba(212, 212, 212, 0.8);
		width: 50px;
		height:30px;
	}
	@media screen and (max-width: 500px) {
	    .el-main{
			margin-left:0px;
			margin-right:0px;
			font-size: 12px;
			
		}
		.me-view-title{
			font-size: 25px !important;
		}
	}
</style>
