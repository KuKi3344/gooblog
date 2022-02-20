<template>
	<div id="editor">
		<mavon-editor class="me-editor" ref="md" v-model="editor.value" @imgAdd="imgAdd" :ishljs="true"
		previewBackground="#ffffff" boxShadowStyle="none" placeholder="在这输入正文" v-bind="editor">
		</mavon-editor>
	</div>
</template>

<script>
	import {
		mavonEditor
	} from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	import {
		upload
	} from '../../api/upload'
	export default {
		name: 'markdown',
		props: {
			editor: Object
		},
		data() {
			return {}
		},
		mounted() {
			this.$set(this.editor, 'ref', this.$refs.md)
		},
		methods: {
			imgAdd(pos, $file) {
				let that = this
				let formdata = new FormData();
				formdata.append('image', $file);
				const imgType = ['image/jpeg', 'image/png'];
				const isLt2M = $file.size / 1024 / 1024 < 2;
				if (!imgType.includes($file.type)) {
					this.$message.error('上传图片仅支持JPG、PNG格式!');
					that.$refs.md.$img2Url(pos, ' ');
				} else if (!isLt2M) {
					this.$message.error('注意上传图片大小不能超过2MB!');
					that.$refs.md.$img2Url(pos, ' ');
				} else {
					upload(formdata).then(resp => {
						// 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
						if (resp.data.code == 200) {

							that.$refs.md.$img2Url(pos, `${resp.data.data}`);
						} else {
							that.$message({
								message: `${resp.data.message}`,
								type: 'error',
								showClose: true
							})
			
		}

					}).catch(err => {
						that.$message({
							message: err,
							type: 'error',
							showClose: true
						});
					})
				}
			},
		},
		components: {
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
		border-radius: 5px;
		padding: 5px;
		background:rgba(210, 232, 224, 0.5);
		width: 100%;
	}
	::v-deep .markdown-body pre {
		border-radius: 10px !important;
		margin: 0;
		padding: 2px;
		width: 100% !important;
		overflow-x: auto;
		
	}
	::v-deep .markdown-body pre code{
		width: 100% !important;

	}
	::v-deep .markdown-body img {
		margin: 5px;
	}

	@media screen and (max-width: 500px) {
		.markdown-body {
			font-size: 12px;
		}

		.markdown-body .highlight pre,
		.markdown-body pre>>> {
			font-size: 12px !important;
			background-color: none !important;
			background-color: #fff !important;
		}
	}
</style>
