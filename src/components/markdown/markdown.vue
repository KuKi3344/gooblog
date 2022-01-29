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
			    if (data.success) {
			
			      that.$refs.md.$img2Url(pos, resp.data.data);
			    } else {
			      that.$message({message: resp.data.message, type: 'error', showClose: true})
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
