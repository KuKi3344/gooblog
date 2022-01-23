<template>
  <div>
    <el-container>

      <el-aside class="me-area">
        <ul class="me-month-list">
          <li v-for="a in archives" :key="a.year + a.month" class="me-month-item">
            <el-badge :value="a.count">
              <el-button @click="changeArchive(a.year, a.month)" size="small">{{a.year +'年' + a.month + '月'}}
              </el-button>
            </el-badge>
          </li>
        </ul>

      </el-aside>


      <el-main class="me-articles">
        <div class="me-month-title">{{currentArchive}}</div>

      <!-- <articlescrollpage v-bind="article"></articlescrollpage> -->

      </el-main>
    </el-container>
  </div>

</template>

<script>
  import  articlescrollpage from '../components/common/articlescrollpage'
  import {getallarchives} from '../api/article'

  export default {
    name: "archives",
    components: {
     articlescrollpage
    },
    created() {
      this.listArchives()
	  setTimeout(()=>{
	  	document.title = this.currentArchive + ' - 文章归档'
	  },300)			
    },
    watch: {
      '$route'() {
        if (this.$route.params.year && this.$route.params.month) {
          this.article.query.year = this.$route.params.year
          this.article.query.month = this.$route.params.month
        }
      }
    },
    data() {
      return {
        article: {
          query: {
            month: this.$route.params.month,
            year: this.$route.params.year
          }
        },
        archives: []
      }
    },
    computed: {
      currentArchive (){
        if(this.article.query.year && this.article.query.month){
          return `${this.article.query.year}年${this.article.query.month}月`
        }
        return '全部'
      }
    },
    methods: {

      changeArchive(year, month) {
        // this.currentArchive = `${year}年${month}月`
        // this.article.query.year = year
        // this.article.query.month = month
        this.$router.push({path: `/archives/${year}/${month}`})
      },
      listArchives() {
        getallarchives().then(resp=>{
        if(resp.data.code == 200){
        		if(resp.data.data.length<=0){
        			this.$message({
        				showClose: true,
        				message: '找不到文章归档',
        				type: 'error'
        			})
        		}else{
        			this.archives = resp.data.data;     			
        		}
        	}else{
        		this.$message.error(resp.data.message)
        	}
        }).catch(err => {
        		this.$message.error('加载失败')
        	})
      }
    }
  }
</script>

<style scoped>

  .el-container {
    width: 640px;
  }

  .el-aside {
    position: fixed;
    left: 200px;
    margin-right: 50px;
    width: 150px !important;
  }

  .el-main {
    padding: 0px;
    line-height: 16px;
  }

  .me-month-list {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    list-style-type: none;
  }

  .me-month-item {
    margin-top: 18px;
    padding: 4px;
    font-size: 18px;
    color: #5FB878;
  }

  .me-order-list {
    float: right;
  }

  .me-month-title {
    margin-left: 4px;
    margin-bottom: 12px;
  }
</style>
