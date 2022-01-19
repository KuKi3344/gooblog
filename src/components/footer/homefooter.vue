<template>
	<div>	
	<el-footer class="me-area">
	  <div class="me-footer">
	    <p>Designed by
	      <strong>
	        LULU and MIN
	      </strong>
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
	.me-area{
		height:40px !important;
	}
	.el-footer {
	  min-width: 100%;
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  z-index: 1024;
	}
	
	.me-footer {
	  text-align: center;
	  line-height: 40px;
	  font-size: 14px;
	  letter-spacing: 2px;
	  color: #273d58 !important;
	
	}
	
</style>
