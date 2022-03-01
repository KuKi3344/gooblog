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

	::v-deep .markdown-body code {
		color: #e66d34;
		background: rgba(231, 216, 216, 0.2);
	}

	.v-note-wrapper.fullscreen {
		top: 60px !important
	}

	::v-deep .markdown-body h1,
	::v-deep .markdown-body h2,
	::v-deep .markdown-body h3,
	::v-deep .markdown-body h4,
	::v-deep .markdown-body h5,
	::v-deep .markdown-body h6 {
		font-weight: 700 !important;
		color: #007bb0;
	}

	::v-deep .markdown-body strong {
		font-weight: 700;
	}
	::v-deep .markdown-body strong{
		color:#0c9e94;
	}
	::v-deep .markdown-body thead tr {
		background: rgba(76, 181, 155, 0.15) !important;
		color: #418c64;
	}
	::v-deep .hljs {
		border-radius: 5px;
		padding: 5px;
		background: rgba(31, 31, 31, 1.0);
		width: 100%;
		color: #e4fbff !important;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	::v-deep .hljs code {
		background: none;
		color: #e4fbff !important;
	}

	::v-deep .hljs-name {
		color: #ff4e51;
	}

	::v-deep .markdown-body img {
		max-width: 90%;
	}

	::v-deep .hljs-punctuation {
		color: #fff;
	}

	::v-deep .hljs-number {
		color: #9d6fff;
	}

	::v-deep .hljs-keyword {
		color: #ff2c64;
	}

	::v-deep .hljs-operator {
		color: #ff3953;
	}

	::v-deep .hljs-type {
		color: #f1984e;
	}

	::v-deep::v-deep .hljs-selector-pseudo {
		color: #f1984e;
	}

	::v-deep .hljs-subst {
		color: #72ce5d;
	}

	::v-deep .markdown-body blockquote {
		color: #666666;
		border-left: .25em solid #59ba56;
		background: rgba(159, 249, 146, 0.1);
	}

	::v-deep.markdown-body mark {
		background: rgba(154, 255, 131, 0.4) !important;
	}

	::v-deep .hljs-variable.language_ {
		color: #ffac38 !important;
	}

	::v-deep .hljs-attr {
		color: #86e751;
	}

	::v-deep .hljs-string {
		color: #ffcd7b;
	}

	::v-deep .hljs-variable {
		color: #c8f572;
	}

	::v-deep .hljs-comment {
		color: #b8b8b8;
	}

	::v-deep .hljs-selector-class {
		color: #7feb51;
	}

	::v-deep .hljs-selector-tag {
		color: #ef7e49;
	}

	::v-deep .hljs-selector-id {
		color: #7feb51;
	}

	::v-deep .hljs-doctag {
		color: #ff5a5d;
	}

	::v-deep .hljs-attribute {
		color: #8fd8ff;
	}

	::v-deep .hljs-title,
	.hljs-title.class_,
	.hljs-title.class_.inherited__,
	.hljs-title.function_ {
		color: #7deb55 !important;

	}

	::v-deep .hljs-literal {
		color: #8275fa;
	}

	::v-deep .hljs-params {
		color: #72fff6;
	}

	::v-deep .hljs-title class_ {
		color: #38bac6;
	}

	::v-deep .markdown-body pre {
		border-radius: 10px !important;
		margin: 0;
		padding: 2px;
		width: 100% !important;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		flex-direction: row;

	}

	::v-deep .markdown-body pre code {
		width: 100% !important;

	}

	::v-deep .markdown-body a {
		color: #409e56;

	}

	.markdown-body {
		color: #2b2b2b;
	}

	::v-deep .markdown-body img {
		margin: 5px;
	}

	@media screen and (max-width: 500px) {
		::v-deep .hljs {
			font-size: 14px !important;
		}

		.me-view-content {
			font-size: 13px;
		}
	}
</style>
