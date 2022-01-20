<template>

  <el-card :body-style="{ padding: '8px 18px' }">
    <div slot="header" class="me-category-header">
      <span>{{cardHeader}}</span>
    </div>

    <ul class="me-category-list">
      <li v-for="a in archives" @click="view(a.year, a.month)" :key="a.year + a.month" class="me-category-item"><a>{{`${a.year}年${a.month}月(${a.count})`}}</a>
      </li>
    </ul>
  </el-card>

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
        this.$router.push({path: `/archives/${year}/${month}`})
      }
    }
  }
</script>

<style scoped>
.el-card{
	margin-top:40px !important;
	margin:10px;
}
.me-category-header {
	  text-align: center;
	  letter-spacing: 5px;
	  font-size: 14px;
	}

  .me-category-list {
    list-style-type: none;
	padding:5px;
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
