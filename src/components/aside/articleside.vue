<template>

<div style="margin:15px;background:rgba(255, 255, 255, 0.9);4;border-radius: 8px;">
	<div slot="header" class="me-category-header">
	  <span>{{cardHeader}}</span>
	</div>
	<div class="line"></div>	
	<ul class="me-category-list">
	  <li :style="randomRgb()" v-for="a in articles" @click="view(a.id)" :key="a.id" class="me-category-item"><a>{{a.title}}</a>
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
				this.$router.push({path:`/article/${id}`});
			},
			randomRgb(){
					var str = ['#278f83','#2fa371','#6aa37a'];
					let t = str[Math.floor(Math.random()*str.length)];
					console.log(t)
					 return {
						   color:`${t} !important`,
						   };
				},
		},
	}
</script>

<style scoped="scoped">
	.line{
		height:0.5px;
		width:200px;
		background-color: #cfdde6;
		margin:10px auto;
		margin-top: 0;
		margin-bottom: 0;
	}
	.me-category-header {
	  text-align: center;
	  letter-spacing: 2px;
	  font-size: 14px;
	  font-weight: 600;
		padding:20px;
	  
	}
	.me-category-list {
	  list-style-type: none;
	  padding-left:5px;
	   padding-right:5px;
	  padding-bottom: 20px;
	  margin-top: 30px !important;
	}
	
	.me-category-item {
	  font-size: 14px;
	  margin-bottom: 8px;
	  margin-left: 20px;
	  margin-right: 10px;
	  
	}
	
	.me-category-item a:hover {
	  text-decoration: underline;
	}
</style>
