<template>
	<div id="editor">
		<mavon-editor
		   class="me-editor"
		   ref="md"
		   v-model="editor.value"
		  @imgAdd="imgAdd"
		  @imageFilter="imgfilter"
		  :ishljs="true"
		  previewBackground="#ffffff"
		  boxShadowStyle="none"
		  placeholder="在这输入正文"
		   v-bind="editor">
		   </mavon-editor>
	</div>
</template>

<script>
	
	import {mavonEditor} from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'	
	import {upload} from '../../api/upload'
	export default{
		name:'markdown',
		props:{
				editor:Object
		},
		data(){
			return{
			}
		},
		mounted(){
			this.$set(this.editor,'ref',this.$refs.md)
		},
		methods:{
			imgAdd(pos, $file) {
			  let that = this
			  let formdata = new FormData();
			  formdata.append('image', $file);
			
			  upload(formdata).then(resp => {
			    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
			    if (resp.data.code == 200) {
			
			      that.$refs.md.$img2Url(pos, `http://${resp.data.data}`);
			    } else {
			      that.$message({message:'上传超时,请保证图片大小不超过2M', type: 'error', showClose: true})
			    }
			
			  }).catch(err => {
			    that.$message({message: err, type: 'error', showClose: true});
			  })
			},
			imgfilter(){
				
			}
		},
		components:{
			mavonEditor
		},
	}
</script>

<style scoped="scoped">
	
	.me-editor {
	  z-index: 6 !important;
	}
	
	.v-note-wrapper.fullscreen {
	  top: 60px !important
	}
	::v-deep .hljs {
	    color: rgb(36, 41, 46);
	    background: rgba(211, 240, 224, 0.3);
		border-radius: 5px;
		padding: 5px;
	}
	::v-deep .markdown-body pre{
		border-radius: 8px !important;
		margin:0;
		padding:2px;
	}
	::v-deep .markdown-body img{
		margin: 5px;
	}
	@media screen and (max-width: 500px) {
		.markdown-body{
			font-size:12px ;
		}
		.markdown-body .highlight pre, .markdown-body pre>>> {
			font-size: 12px !important;
			background-color: none !important;
			background-color: #fff !important;
		}
	}

</style>
