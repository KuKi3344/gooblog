<template>

<div style="margin:20px;background:rgba(251, 255, 255, 0.8);border-radius: 10px;">
	  <div slot="header" class="me-category-header">
      <span>{{cardHeader}}</span>
    </div>
<div class="line"></div>
    <ul class="me-category-list">
      <li v-for="a in archives" @click="view(a.year, a.month)" :key="a.year + a.month" class="me-category-item"><a>{{`${a.year}年${a.month}月(${a.count})`}}</a>
      </li>
    </ul>
</div>
  


</template>

<script>
  export default {
    name: "CardArchive",
    props: {
      cardHeader: {
        type: String,
        required: true
      },
      archives: {
        type: Array,
        required: true
      }
    },
    methods: {
      view(year, month) {
		  if(month<10){
			  month ='0'+ month
		  }
        this.$router.push({path: `/archives/${year}-${month}`})
      }
    }
  }
</script>

<style scoped>
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
	padding:15px;
	margin-left: 17px;
  }

  .me-category-item {
    display: inline-block;
    width: 40%;
    padding: 5px;
    font-size: 13px;
    color: #5FB878;
	margin-right:10px;
  }

  .me-category-item a:hover {
    text-decoration: underline;
  }

</style>
