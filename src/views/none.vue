<template>
	<div class="bk" v-cloak>
		<section class="page_404">
			<div class="container">
				<div class="row">
					<div class="col-sm-12 ">
						<div class="col-sm-10 col-sm-offset-1  text-center">
							<div class="four_zero_four_bg">
								<h1 class="text-center ">404</h1>


							</div>

							<div class="contant_box_404">
								<h3 class="h2">
									Look like you're lost
								</h3>

								<p>the page you are looking for not avaible!</p>

								<router-link to="/home" class="link_404">Go to Home</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'none',
	}
</script>

<style scoped="scoped">
	/*======================
    404 page
=======================*/

	.text-center{
		font-weight: 600;
		letter-spacing: 5px;
		font-family: "copperplate gothic light";
	}
	.page_404 {
		padding: 20px 0;
		background: #fff;
		font-family: 'Arvo', serif;
		text-align: center;
		position: absolute;
		bottom: 0;
		top:0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.page_404 img {
		width: 100%;
	}

	.four_zero_four_bg {

		background-image: url(../assets/img/dribbble_1.gif);
		height: 400px;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}


	.four_zero_four_bg h1 {
		font-size: 60px;
	}

	.four_zero_four_bg h3 {
		font-size: 40px;
	}
.contant_box_404{
	font-family: "book antiqua";
}
	.link_404 {
		color: #fff !important;
		padding: 10px 20px;
		background: #39ac31;
		border-radius: 5px;
		margin: 20px 0;
		display: inline-block;
		text-decoration: none;
		font-family: "agency fb";
		font-size: 15px;
		letter-spacing: 1px;
	}

	.contant_box_404 {
		margin-top: -50px;
	}
</style>
