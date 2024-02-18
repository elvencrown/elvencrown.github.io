<script lang="ts">

	export default {
		data() {
		  return {
		  }
		},

		props: {
		},

		computed: {
		},

		methods: {
			goBack() {
		      // Используйте метод go(-1) для возврата на предыдущий роут
		      this.$router.go(-1);
		    }
		},

		mounted () {
		}
	}
</script>

<template>
	<div ref="BackToButton" class="BackToButton" @click="goBack">
		<img v-lazy="{src: 'img/arrow-left.svg'}">
		<p>Назад</p>
  	</div>
</template>

<style scoped lang="scss">

	.BackToButton {
		height: 39px;
		display: flex;
		gap: 5px;
		cursor: pointer;
		align-items: center;
		position: absolute;
		left: 15px;
		right: 0;
		top: 50px;
		width: max-content;
		padding: 10px 15px 10px 10px;
		border-radius: 1000px;
		border: 1px solid #005eff;
		background: #005eff;
		user-select: none;

		img{
			width: 20px;
		}

		&:hover {
			transition: all 1s;
			background: #005eff;
		}

		p {
			color: #fff;
			font-size: 18px;
		}
	}

</style>