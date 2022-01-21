<template>
	<el-card :body-style="{ padding: '8px 15px' }">
	  <div slot="header" class="me-category-header">
	    <span>{{cardHeader}}</span>
	  </div>
	
	  <ul class="me-category-list">
	    <li v-for="a in articles" @click="view(a.id)" :key="a.id" class="me-category-item"><a>{{a.title}}</a>
	    </li>
	  </ul>
	</el-card>
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
	.el-card{
		margin-top:40px !important;
		margin:10px;
	}
	.me-category-header {
	  text-align: center;
	  letter-spacing: 2px;
	  font-size: 14px;
	  font-weight: 600;
	  
	}
	.me-category-list {
	  list-style-type: none;
	  padding-left:5px;
	  
	}
	
	.me-category-item {
	  font-size: 14px;
	  color: #5FB878;
	  margin-bottom: 8px;
	  
	}
	
	.me-category-item a:hover {
	  text-decoration: underline;
	}
</style>
