<template>

<div style="margin-top:20px;margin-bottom: 30px;">
	<div slot="header" class="me-category-header">
	  <span>{{cardHeader}}</span>
	</div>
	<div class="line"></div>	
	<ul class="me-category-list">
	  <li v-for="a in articles" @click="view(a.id)" :key="a.id" class="me-category-item"><a>{{a.title}}</a>
	  </li>
	</ul>
</div>
</template>

<script>
	export default{
		name:'articleside',
		props: {
		  cardHeader: {
		    type: String,
		    required: true
		  },
		  articles: {
		    type: Array,
		    required: true
		  },
		},
		data(){
			return{
				
			}
		},
		methods:{
			view(id){
				this.$router.push({path:`/view/${id}`});
			}
		},
	}
</script>

<style scoped="scoped">
	.line{
		height:0.5px;
		width:200px;
		background-color: #cfdde6;
		margin:10px auto;
	}
	.me-category-header {
	  text-align: center;
	  letter-spacing: 2px;
	  font-size: 14px;
	  font-weight: 600;
	  margin-bottom:15px;
	  
	}
	.me-category-list {
	  list-style-type: none;
	  padding-left:5px;
	  margin-top: 30px !important;
	}
	
	.me-category-item {
	  font-size: 14px;
	  color: #5FB878;
	  margin-bottom: 8px;
	  margin-left: 30px;
	  
	}
	
	.me-category-item a:hover {
	  text-decoration: underline;
	}
</style>
