<template>
	<div class="me-view-body">
		<el-container class="me-view-container">

			<el-main>
				<el-button size="mini" icon="el-icon-arrow-left" @click="$router.back()"></el-button>
				<div class="me-view-card">
					<h1 class="me-view-title">{{article.title}}</h1>
					<div class="me-view-author">
						<div class="info">
							<router-link :to="'/userinfo/'+article.author.id">
								<div class="picture">
									<img class="me-view-picture" :src="article.author.face"
										v-if="article.author.face"></img>
									<img class="me-view-picture" :src="imgsrc" v-else></img>
								</div>


							</router-link>
							<div class="me-view-info">
								<router-link :to="'/userinfo/'+article.author.id">
									<span>{{article.author.nickname}}</span>
								</router-link>
								<div class="me-view-meta">
									<div>
										<span>{{article.gmtCreate | format}}</span>
									</div>
									<div>
										<span>阅读 {{article.viewCounts}}</span>
										<span>评论 {{levelone.length}}</span>
									</div>

								</div>

							</div>
						</div>
						<div style="display: flex;align-items: flex-end;"
							v-if="article.author.id == this.$store.state.id">
							<el-button @click="editArticle()" size="small" icon="el-icon-edit" class="edit" type="text"
								circle></el-button>
							<el-button type="danger" icon="el-icon-delete" size="small" circle @click="deletearticle()">
							</el-button>
						</div>

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
						<el-button v-if="article.tags" @click="tagOrCategory('tag', t.id,t.tagName)" size="mini"
							type="primary" v-for="t in article.tags" :key="t.id" round plain>{{t.tagName}}</el-button>
						<span v-else>无</span>
					</div>

					<div class="me-view-tag">
						文章分类：
						<el-button v-if="article.category.id"
							@click="tagOrCategory('category', article.category.id,article.category.categoryName)"
							size="mini" type="primary" round plain>{{article.category.categoryName}}</el-button>
						<span v-else>暂无</span>
					</div>

					<div class="me-view-comment">
						<div class="me-view-comment-write">
							<el-row>

								<div width="40" height="40" style="display: flex;margin-bottom: 10px;">
									<a style="margin-right: 5px;">
										<router-link to="/login"><span class="noavator" v-if="!user">未登录</span>
										</router-link>
										<div class="picture">
											<img class="me-view-picture" :src="user.face" v-if="user&&user.face">
											<img class="me-view-picture" :src="imgsrc" v-if="user&&!user.face">
										</div>

									</a>
									<el-input type="textarea" :autosize="{ minRows: 2}" placeholder="你的评论..."
										maxlength="300" class="me-view-comment-text" v-model="subcomment.commentContent"
										resize="none">
									</el-input>
								</div>
								<el-button type="button" size="small" round @click="publishComment()"
									style="float: right;">评论</el-button>
							</el-row>

						</div>

						<div class="me-view-comment-title">
							<span>{{levelone.length}} 条评论</span>
						</div>
						<div style="opacity: 1;padding:5px,20px;background:rgba(255,255,255,0.8);border-radius: 8px;"
							v-if="levelone.length>0">
							<commentview v-for="comment in levelone" :key="comment.id" :comment="comment"
								:id="comment.id" @getcomment="getcomment" class="comment">
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
	document.addEventListener('copy', function(event) {
		let clipboardData = event.clipboardData || window.clipboardData;
		if (!clipboardData) {
			return;
		}
		let text = window.getSelection().toString();
		if (text) {
			event.preventDefault();
			clipboardData.setData('text/plain', text + `\n 文章归GOO-BLOG所有,详情请看:\t${window.location.href}`);
		}
	});
	import {
		findarticle,
		getcomment,
		comment,
		deletearticle
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
					author: {
						id: '',
						nickname: '',
						face: ''
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
					level: 1,
					toUserId: '',
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
			window.scrollTo(0, 0);
		},
		watch: {
			"$route.params.id"(val) {
				this.findArticleById();
				this.getcomment();
			}
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
							this.article.editor.value = resp.data.data.body.content.replace(/\\r\\n/g, "\n")
								.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
							Object.assign(this.article, resp.data.data)
							document.title = `${this.article.title}-文章详情`;
						}
					} else if (resp.data.code == 500) {
						this.$message.warning('该文章已被删除');
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
			tagOrCategory(type, id, name) {
				this.$router.push({
					path: `/${type}/all/${id}`,
					query: {
						name: name
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
				this.subcomment.toUserId = this.article.author.id
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
			},
			deletearticle() {
				this.$confirm('文章将会删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delete();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					})
				});
			},
			delete() {
				let data = {
					articleId: this.article.id,
					authorId: this.article.author.id
				}
				deletearticle(data).then(resp => {
					if (resp.data.code == 200) {
						this.$message.success('删除成功');
						this.$router.push('/home')
					} else {
						this.$message.error('删除失败，请稍后再试')
					}
				}).catch(err => {
					this.$message.error('删除异常')
				})
			}
		}

	}
</script>

<style scoped="scoped">
	body {
		font-size: 15px;
	}

	a {
		text-decoration: none;
	}

	.me-view-container {
		width: 100%;
		min-width: 300px;
		display: flex;
		justify-content: center;
		opacity: 0.9;
		border-radius: 10px;
	}

	.info {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		flex-direction: row;
	}

	.el-main {
		min-width: 280px;
		max-width: 900px;
		background-color: #fff;
		margin-top: 25px;
		border-radius: 8px;
	}

	::v-deep .v-note-wrapper {
		background: rgba(255, 255, 255, 0.7);


	}

	.picture {
		width: 40px;
		height: 40px;
		overflow: hidden;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		margin: 0;
	}

	.me-view-title {
		font-size: 30px;
		font-weight: 800;
		line-height: 1.3;
		margin-bottom: 10px;
		margin-top: 20px;
		color: #005273;
	}

	.comment {
		border-bottom: 1px solid #efefef;
		padding-bottom: 0px;
		margin-top: 20px;
	}

	.me-view-author {
		/*margin: 30px 0;*/
		margin-top: 30px;
		vertical-align: middle;
		display: flex;
		justify-content: space-between;

	}

	.me-view-picture {
		width: auto;
		height: 40px;
		border: 1px solid #ddd;
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
		margin-top: 10px;
	}

	.me-view-info a {
		color: #32363b;
		font-size: 14px;
	}

	.me-view-content {
		margin-top: 30px !important;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 10px !important;
		box-shadow: 0 18px 30px rgba(163, 163, 163, 0.8);

	}

	.me-view-meta {
		font-size: 12px;
		margin-top: 5px;
		color: #667970;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		flex: 1;
		width: auto;

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
		padding: 15px !important;
		border-radius: 10px !important;
	}

	.edit {
		margin-left: 20px;
		margin-right: 5px;
		float: right;
		color: #ffffff;
		font-size: 0.9vw;
		background-color: #5bad88;
	}

	@media screen and (max-width: 500px) {
		.el-main {
			margin-left: 0px;
			margin-right: 0px;
			padding: 5px;
			margin-top: 40px;
		}

		.me-view-title {
			font-size: 22px !important;
			margin-top: 20px;
		}

		.me-view-tag {
			font-size: 13px !important;
		}
	}
</style>
