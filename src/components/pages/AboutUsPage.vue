<script lang="ts">
export default {
	data() {
	  return {
	  };
	},
}
</script>

<template>
<div class="AboutUsPage">
	<h1>Про нас</h1>

	<div class="text">
      <p>Ми міжнародний маркетплейс.</p>
      <p>Відсилаємо товари по всьому світу.</p>
      <p>Ви можете купувати товари у нас чи виставляти на продаж свої якщо ви торговець.</p>
    </div>  

	<img v-lazy="{src: '/img/logos/elvencrown-shop-logo.jpg'}" alt="elvencrown logo">
</div>
</template>

<style scoped lang="scss">
.AboutUsPage {
	color: #fff;
	display: flex;
	align-items: center;
	flex-direction: column;
	user-select: none;
	padding: 50px 15px;

	h1 {
		font-size: 25px;
		margin-bottom: 30px;
		text-transform: uppercase;
		text-align: center;
	}

	img {
		width: 100%;
		max-width: 800px;
		margin-top: 20px;
	}

	.text p{
		text-align: center;
		color: #fff;
	}
}
</style>