<template>
	<div>
		<ul>
			<li v-for="comment in levelone" :key="comment.id" class="comment">
				<a><img :src="comment.author.face" class="authorface"></a>
				<span class="authorname">{{comment.author.nickname}}</span>
				<p class="commentcontent">{{comment.commentContent}}</p>
				<span class="createtime">{{comment.gmtCreate | format}}</span>
				<el-button @click="recallcomment(comment.id)" type="text" size="small" class="recallcomment">回复</el-button>
			<!-- 	<li v-for="recall in filterrecall(comment.id)" :key="recall.id">
					{{recall.author.nickname}}回复了@{{recall.toUser.nickname}}:{{recall.commentContent}}
				</li> -->
			</li>
		</ul>
	</div>
</template>

<script>
	import { getcomment,getrecall} from '../../api/article.js'
	export default{
		name:'commentview',
		data(){
			return{
				levelone:[],
				leveltwo:[]
			}
		},
		created(){
			this.getcomment();
			this.getrecall();
		},
		methods:{
			getcomment(){
				let id = this.$route.params.id;
				getcomment(id).then(resp=>{
			if(resp.data.code == 200){
					if(resp.data.data.length<=0){
						this.$message({
							showClose: true,
							message: '找不到评论',
							type: 'error'
						})
					}else{						
						this.levelone = resp.data.data;
						console.log(this.levelone)
					}
				}else{
					this.$message.error(resp.data.msg)
				}
			}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			getrecall(){
				let id = this.$route.params.id;
				getrecall(id).then(resp=>{
			if(resp.data.code == 200){
					if(resp.data.data.length<=0){
						this.$message({
							showClose: true,
							message: '找不到评论',
							type: 'error'
						})
					}else{						
						this.leveltwo = resp.data.data;
						console.log(this.leveltwo)
					}
				}else{
					this.$message.error(resp.data.msg)
				}
			}).catch(err => {
					this.$message.error('加载失败')
				})
			},
			filterrecall(id){
				return this.leveltwo.filter(item=>item.parentId == id);
			}
		}
	}
</script>

<style scoped="scoped">
	ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul a{
		margin-right: 10px;
	}
	.authorname{
		color:#475256;
		font-size: 14px;
	}
	.authorface{
		width: 40px;
		height: 40px;
		border: 1px solid #ffffff;
		border-radius: 50%;
		vertical-align: middle;
		background-color: #e5f5ee;
		padding:0;
	}
	.comment{
		border-bottom: 1px solid #f0f0f0;
		padding-bottom: 20px;
		margin-top: 20px;
	}
	.recallcomment{
	color:#6d6d6d;
	letter-spacing: 2px;
	font-size:12px;
	}
	.commentcontent{
		font-size: 15px;
		color:#393939;
	}
	.createtime{
		font-size: 12px;
		margin-right: 30px;
		color:#7f7f7f;
	}
</style>
