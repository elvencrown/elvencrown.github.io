<script lang="ts">
	import AddToCartButton from './AddToCartButton.vue'

	export default {
		data () {
			return {
			}
		},

		props: {
			product: {
				type: Object,
				default () {
					return {}
				}
			}
		},

		components: {
	      AddToCartButton,
	    },
	}
</script>

<template>
	<div>
		<div class="product-item">
			<router-link :to="{name: 'product_page', params: { product_id: product.id } }"> 
				<img class="product-thumbnail" v-lazy="{src: product.mainImage}">
			</router-link> 
			
			<div class="product-info">
				<router-link :to="{name: 'product_page', params: { product_id: product.id } }"> 
					<h2>{{ product.title }}</h2>
					<p class="old-price">{{product.oldprice}}</p>
					<p class="new-price">{{product.price}} грн</p>
				</router-link> 

				<div class="buttons">
					<AddToCartButton :product="product"></AddToCartButton>

					<!-- <div class="button">
						<img v-if="is_added_to_wishlist" src="img/like-add.svg">
						<img v-else src="img/like-add.svg">
						<p>Add to wishlist</p>
						<p>0</p>
					</div>	 -->					
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.product-item {
		user-select: none;

		h2 {
			color: #fff;
			cursor: pointer;
			margin-bottom: 10px;
		}
		.product-thumbnail {
			width: 100%;
			height: 250px;
			object-fit: cover;
			border-radius: 9px;
		}

		.product-info{
			padding: 5px 15px 5px 0;
			display: grid;
			grid-gap: 5px;

			.buttons {
				display: flex;
				flex-direction: column;
				gap:15px;
			}

			.new-price {
				color: #fff;
				margin-bottom: 10px;
			}
		}
	}

	@media screen and (max-width: 768px) {
		.product-item .product-thumbnail {
			height: 30vmax;
		}
	}

	@media screen and (max-width: 480px) {
		.product-item .product-thumbnail {
			height: 300px;
		}
	}
</style>