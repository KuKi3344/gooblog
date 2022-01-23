<template>
	<div class="me-view-body">
		<el-container class="me-view-container">
			
			<el-main>

				<div class="me-view-card">
					<h1 class="me-view-title">{{article.title}}</h1>
					<div class="me-view-author">
						<a>
							<img class="me-view-picture" :src="article.face"></img>
						</a>
						<div class="me-view-info">
							<span>{{article.authorName}}</span>
							<div class="me-view-meta">
								<span>{{article.gmtCreate | format}}</span>
								<span>阅读 {{article.viewCounts}}</span>
								<span>评论 {{article.commentCounts}}</span>
							</div>

						</div>
						<!-- <el-button v-if="this.article.author.id == this.$store.state.id" @click="editArticle()"
							style="position: absolute;left: 60%;" size="mini" round icon="el-icon-edit">编辑</el-button> -->
					</div>
					<div class="me-view-content">
						<markdown :editor="article.editor"></markdown>
					</div>

					<div class="me-view-end">
						<el-alert title="已经到底了..." type="success" center :closable="false">
						</el-alert>
					</div>

					<div class="me-view-tag">
						标签：
						<!--<el-tag v-for="t in article.tags" :key="t.id" class="me-view-tag-item" size="mini" type="success">{{t.tagName}}</el-tag>-->
						<el-button @click="tagOrCategory('tag', t.id)" size="mini" type="primary"
							v-for="t in article.tags" :key="t.id" round plain>{{t.tagName}}</el-button>
					</div>

					<div class="me-view-tag">
						文章分类：
						<el-button @click="tagOrCategory('category', article.category.id)" size="mini" type="primary"
							round plain>{{article.category.categoryName}}</el-button>
					</div>

					<div class="me-view-comment">
						<div class="me-view-comment-write">
							<el-row :gutter="20">
								<el-col :span="2">
									<a class="">
										<img class="me-view-picture" :src="avatar"></img>
									</a>
								</el-col>
								<el-col :span="22">
									<el-input type="textarea" :autosize="{ minRows: 2}" placeholder="你的评论..."
										class="me-view-comment-text" v-model="comment.content" resize="none">
									</el-input>
								</el-col>
							</el-row>

							<el-row :gutter="20">
								<el-col :span="2" :offset="21">
									<el-button type="button" size="medium" round @click="publishComment()">评论</el-button>
								</el-col>
							</el-row>
						</div>

						<div class="me-view-comment-title">
							<span>{{article.commentCounts}} 条评论</span>
						</div>

					<!-- 	<commment-item v-for="(c,index) in comments" :comment="c" :articleId="article.id" :index="index"
							:rootCommentCounts="comments.length" @commentCountsIncrement="commentCountsIncrement"
							:key="c.id">
						</commment-item> -->

					</div>

				</div>
			</el-main>

		</el-container>
	</div>
</template>

<script>
	import { findarticle } from '../api/article.js'
	import markdown from '../components/markdown/markdown'
	export default {
		name: 'articleview',
		data(){
			return{
				article: {
				  id: '',
				  title: '',
				  commentCounts: 0,
				  viewCounts: 0,
				  summary: '',
				  authorName:'',
				  tags: [],
				  category:{},
				  createDate: '',
				  editor: {
				    value: "",
				    toolbarsFlag: false,
				    subfield: false,
				    defaultOpen: 'preview'
				  }
				},
				avatar:'',
				comment:{},
			}
		},
		components:{
			markdown
		},
		created(){
			this.findArticleById();	
		},
		mounted(){
			setTimeout(()=>{
				document.title = `${this.article.title}-文章详情`;
			},500)		
		},
		methods:{
			findArticleById(){
				let id = this.$route.params.id;
				findarticle(id).then(resp=>{
				if(resp.data.code == 200){
						if(resp.data.data.length<=0){
							this.$message({
								showClose: true,
								message: '找不到文章了',
								type: 'error'
							})
						}else{						
							this.article.editor.value = resp.data.data.body.content.replace(/\\r\\n/g,"\n");
							console.log(this.article.editor.value)
							Object.assign(this.article,resp.data.data)
						}
					}else{
						this.$message.error(resp.data.msg)
					}
				}).catch(err => {
						this.$message.error('加载失败')
					})
			},
			editArticle(){
				
			},
			tagOrCategory(type,id){
				
			},
			publishComment(){
				
			}
		}

	}
</script>

<style scoped="scoped">
.me-view-body {
    margin: 100px auto 140px;
  }

  .me-view-container {
    width:100%;
	min-width:960px;
	display: flex;
	justify-content:center ;
  }

  .el-main {
    min-width:550px;
	max-width:800px;
  }

  .me-view-title {
    font-size: 34px;
    font-weight: 800;
    line-height: 1.3;
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
  }

  .me-view-info {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
  }
.me-view-content{
	margin-top:30px !important;
}
  .me-view-meta {
    font-size: 12px;
    color: #969696;
	
  }
  .me-view-meta span{
	margin-right: 10px;
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
.el-button{
	margin-top: 10px;
}
  .me-view-comment-write {
    margin-top: 20px;
  }

  .me-view-comment-text {
    font-size: 16px;
  }

  .v-show-content {
    padding: 8px 25px 15px 30px !important;
  }

  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
  }

  .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background: #fff !important;
  }

</style>
