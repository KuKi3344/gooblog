<template>
	<div>	
	<el-footer class="me-area">
	  <div class="me-footer">
	    <p>Designed by
	      <strong>
	       KuKi and Noblegasesgoo
	      </strong>
		  <br/><a href="https://beian.miit.gov.cn/#/Integrated/index">滇ICP备2022000707号</a>
	    </p>
	  </div>
	</el-footer>
	</div>
</template>

<script>
	export default{
		name:'homefooter'
	}
</script>

<style scoped="scoped">
	a{
		text-decoration: none;
		color: #353535;
		
	}
	.me-area{
		height:60px !important;
	}
	.el-footer {
	  min-width: 100%;
	  margin-top: 10px;
	}
	
	.me-footer {
	  text-align: center;
	  line-height: 30px;
	  font-size: 12px;
	  letter-spacing: 2px;
	  color: #273d58 !important;
	
	}
</style>
