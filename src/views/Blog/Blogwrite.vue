<template>
  <div id="write">
	  <el-header>
		  <div style="display: flex;justify-content: space-between;align-items: center;height:100%;">
			  <div style="display: flex;justify-content: space-around;align-items: center;">
				  <div class="leaf"></div>
				  <div>
					  <div class="me-write-info" v-if="articleForm.title!=''">{{articleForm.title}}</div>
					  <div class="me-write-info" v-else>无标题</div>
					  <div class="username">{{user.nickname}}&emsp;/&emsp;<span v-if="articleForm.category!=''">{{articleForm.category.categoryName}}区</span>
					  <span v-else>暂无</span>
				  </div>			
				  </div>
			  </div>
		  	  <div class="me-write-btn">
		  	    <button  @click="publishShow" size="small">发布</button>
		  	    <button@click="cancel" size="small">取消</button>
		  	  </div>
		  </div>
	  </el-header>
    <el-container>
		  <el-container class="me-area me-write-box">
        <el-main class="me-write-main">
          <div class="me-write-title">
            <input   v-model="articleForm.title"
                      placeholder="请输入标题"
                      class="me-write-input">
            </input>

          </div>
          <div id="placeholder" style="visibility: hidden;height: 89px;display: none;"></div>
          <markdown-editor :editor="articleForm.editor" class="me-write-editor"></markdown-editor>
        </el-main>
      </el-container>

      <el-dialog title="摘要 分类 标签"
                 :visible.sync="publishVisible"
                 :close-on-click-modal=false
                 custom-class="me-dialog">

        <el-form :model="articleForm" ref="articleForm" :rules="rules">
          <el-form-item prop="summary">
            <el-input type="textarea"
                      v-model="articleForm.summary"
                      :rows="6"
                      placeholder="请输入摘要">
            </el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="category">
            <el-select v-model="articleForm.category" value-key="id" placeholder="请选择文章分类">
              <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文章标签" prop="tags">
            <el-checkbox-group v-model="articleForm.tags">
              <el-checkbox v-for="t in tags" :key="t.id" :label="t.id" name="tags">{{t.tagName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="publishVisible = false">取 消</el-button>
          <el-button type="primary" @click="publish('articleForm')">发布</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>
<script>
  import MarkdownEditor from '../../components/markdown/markdown'
  import {publisharticle, findarticle} from '../../api/article'
  import {getallcategory} from '../../api/article.js'
  import {getalltag} from '../../api/article.js'

  export default {
    name: 'BlogWrite',
    mounted() {

      if(this.$route.params.id){
        this.getArticleById(this.$route.params.id)
		this.type = 'update'
      }

      this.getCategorysAndTags()

      window.addEventListener('scroll', this.editorToolBarToFixedWrapper, false);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.editorToolBarToFixedWrapper, false)
    },
    data() {
      return {
		user:JSON.parse(window.sessionStorage.getItem('user')),
		type:'add',
        publishVisible: false,
        categorys: [],
        tags: [],
        articleForm: {
			body:'',
          id: '',
          title: '',
          summary: '',
          category: '',
          tags: [],
          editor: {
            value: '',
            ref: '',//保存mavonEditor实例  实际不该这样
            default_open: 'edit',
            toolbars: {
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              strikethrough: true, // 中划线
              mark: true, // 标记
              superscript: true, // 上角标
              subscript: true, // 下角标
              quote: true, // 引用
              ol: true, // 有序列表
              ul: true, // 无序列表
              imagelink: true, // 图片链接
              code: true, // code
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              help: true, // 帮助
              undo: true, // 上一步
              redo: true, // 下一步
              trash: true, // 清空
              navigation: true, // 导航目录
              //subfield: true, // 单双栏模式
              preview: true, // 预览
            }
          }
        },
        rules: {
          summary: [
            {required: true, message: '请输入摘要', trigger: 'blur'},
            {max: 80, message: '不能大于80个字符', trigger: 'blur'}
          ],
          category: [
            {required: true, message: '请选择文章分类', trigger: 'change'}
          ],
          tags: [
            {type: 'array', required: true, message: '请选择标签', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      title (){
        return '写文章 - 码神之路'
		}
	},
    methods: {
      getArticleById(id) {
        let that = this
        findarticle(id).then(resp=> {

          Object.assign(that.articleForm, resp.data.data)
          that.articleForm.editor.value = resp.data.data.body.content.replace(/\\r\\n/g, "\n");

          let tags = this.articleForm.tags.map(function (item) {
            return item.id;
          })

          this.articleForm.tags = tags


        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败', showClose: true})
          }
        })
      },
      publishShow() {
        if (!this.articleForm.title) {
          this.$message({message: '标题不能为空哦', type: 'warning', showClose: true})
          return
        }

        if (this.articleForm.title.length > 30) {
          this.$message({message: '标题不能大于30个字符', type: 'warning', showClose: true})
          return
        }

        if (!this.articleForm.editor.ref.d_render) {
          this.$message({message: '内容不能为空哦', type: 'warning', showClose: true})
          return
        }

        this.publishVisible = true;
      },
      publish(articleForm) {

        let that = this

        this.$refs[articleForm].validate((valid) => {
          if (valid) {

            let tags = this.articleForm.tags.map(function (item) {
              return {id: item};
            });
			this.articleForm.editor.value = this.articleForm.editor.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			if(this.type == 'add'){
				let article = {
				  id: this.articleForm.id,
				  title: this.articleForm.title,
				  summary: this.articleForm.summary,
				  category: this.articleForm.category,
				  tags: tags,
				  body: {
				    content: this.articleForm.editor.value,
				    contentHtml: this.articleForm.editor.ref.d_render
				  }
				
				}
				this.publishVisible = false;
				
				let loading = this.$loading({
				  lock: true,
				  text: '发布中，请稍后...'
				})
				
				publisharticle(article).then((resp) => {
				  if(resp.data.code==200){
				    loading.close();
				    that.$message({message: '发布成功啦', type: 'success', showClose: true})
				    that.$router.push({path: `/article/${resp.data.data}`})
				  }else{
				    that.$message({message: error, type: '发布文章失败:'+resp.data.message, showClose: true});
				  }
				
				}).catch((error) => {
				  loading.close();
				  if (error !== 'error') {
				    that.$message({message: error, type: 'error', showClose: true});
				  }
				})
			}else{
				//更新接口
			}

          } else {
            return false;
          }
        });
      },
      cancel() {
        this.$confirm('文章将不会保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1)
        })
      },
      getCategorysAndTags() {
        let that = this
        getallcategory().then(resp => {
          if(resp.data.code==200){
            that.categorys = resp.data.data
          }else{
             that.$message({type: 'error', message: '文章分类加载失败', showClose: true})
          }

        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章分类加载失败', showClose: true})
          }
        })

        getalltag().then(resp => {
          if(resp.data.code == 200){
            that.tags = resp.data.data
          }else{
             that.$message({type: 'error', message: '标签加载失败', showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '标签加载失败', showClose: true})
          }
        })

      },
      editorToolBarToFixed() {

        let toolbar = document.querySelector('.v-note-op');
        let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if (curHeight >= 160) {
          document.getElementById("placeholder").style.display = "block"; //bad  用计算属性较好
          toolbar.classList.add("me-write-toolbar-fixed");
        } else {
          document.getElementById("placeholder").style.display = "none";
          toolbar.classList.remove("me-write-toolbar-fixed");
        }
      }
    },
    components: {
      'markdown-editor': MarkdownEditor
    },
  }
</script>

<style scoped="scoped">
	body{
		font-size: 15px;
	}
  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
	background-color: #fff;
	height:30px;
  }

  .me-write-info {
    font-size: 14px;
    font-weight: 600;
	margin-bottom: 5px;
  }
	.username{
		font-size: 12px;
		color:#767676;
		text-align: center;
		
	}
  .me-write-btn {
    margin-top: 10px;
  }

  .me-write-box {
	background-color: #fff;
	min-width: 100%;
    margin: 80px auto 0;
	margin-top: 60px;
	opacity: 0.95;
	justify-content: center;
  }

  .me-write-main {
    padding: 10px;
	border-radius: 30px;
	max-width:1300px;
	margin-left:40px;
	margin-right:40px;
  }

  .me-write-title {
  }

 .me-write-input{
	 border:none;
	 height:60px;
	 width:100%;
	 font-size: 30px;
	 margin-bottom: 20px;
	 color:#161616;
	 font-weight: 600;
	 outline: none;
 }

input::-webkit-input-placeholder{
            color:#bababa;
        }
  .me-write-editor {
    min-height: 650px !important;
  }

  .me-header-left {
    margin-top: 10px;
  }

  .me-title img {
    max-height: 2.4rem;
    max-width: 100%;
  }

  .me-write-toolbar-fixed {
    position: fixed;
    width: 700px !important;
    top: 60px;
  }

  .v-note-op {
    box-shadow: none !important;
  }

  .auto-textarea-input, .auto-textarea-block {
    font-size: 18px !important;
  }
	button{
		border-radius:8px;
		width:60px;
		height:30px;
		margin: 5px;
		border: 1px solid #cacaca;
		background-color: #fff;
		text-align: center;
		
	}
	button:hover{
		border:1px solid #70b86e;
		color: #70b86e;
	}
	.el-button{
		width:80px;
		height:35px;
		color:#70b86e;
	}
	.el-button:hover{
		background-color: #77c37e;
		color:#fff;
	}
	.leaf{
		width:30px;
		height:30px;
		background-color: #60c763;
		border-top-left-radius: 30px;
		border-bottom-right-radius: 30px;
		margin-right: 10px;
	}

</style>
