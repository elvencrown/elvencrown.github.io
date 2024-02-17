<script lang="ts">
	export default {
		data () {
			return {
			}
		},

		props: {
			category: {
				type: Object,
				default () {
					return {}
				}
			},
			categoryActive: {
				type: Boolean,
				default () {
					return false
				}
			}
		}
	}
</script>

<template>
	<div class="category-item" :class="{ 'active-category': categoryActive === true }">
		<div class="category-image">
			<img :src="category.image">
		</div>
		
		<div class="category-info">
			<h3>{{ category.title }}</h3>
		</div>
	</div> 	
</template>

<style scoped lang="scss">
	.category-item {
		user-select: none;
		display: flex;
		gap: 10px;
		align-items: center;
		border-radius: 1000px;

		h3 {
			color: #fff;
			cursor: pointer;
			font-size: 15px;
		}

    &:hover{
      cursor: pointer;
      background: #005eff;
    }

		.category-image {
			border-radius: 1000px;
			width: 50px;
			height: 50px;

			img {
				width: 50px;
				height: 50px;
				object-fit: cover;
				border-radius: 9px;
			}
		}

		.category-info{
			padding: 5px 15px;
			display: grid;
			grid-gap: 5px;
			justify-items: center;
		}
	}

	.active-category {
		background: #005eff;
	}
</style>