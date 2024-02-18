<script lang="ts">
	import {mapActions,mapGetters} from 'vuex'

	export default {
		data() {
		  return {
		    is_added_to_cart: false,
			is_added_to_wishlist: false,
			currentLang: 'en',
			quantity_in_cart: 0
		  };
		},

		props: {
			product: {
				type: Object,
				default () {
					return {}
				}
			}
		},

		computed: {
			...mapGetters(['CART']),
			...mapGetters(['GET_LANG']),
			...mapGetters(['INTERFACE_DATA'])
		},

		methods: {
			...mapActions(['ACTION_ADD_TO_CART']),
			...mapActions(['GET_INTERFACE']),
			...mapActions(['SET_LANG']),
			
			addToCart (e) {
				if (e.target == this.$refs.productThumbnail) return;
				
				this.ACTION_ADD_TO_CART(this.product)
				this.$refs.add_to_cart_note.innerHTML = "Додано"
				this.is_added_to_cart = true

				for (let i = 0; this.CART.length > i; i++) {
					if (this.CART[i].id.toString() === this.product.id.toString()) {
						this.quantity_in_cart++
						this.translateProductImageToOpenCartButton()
						return;
					}
				}
			},

		    translateProductImageToOpenCartButton() {
		      const prod_img = this.$refs.productThumbnail;
		      prod_img.style.display = 'block';

		      const bodyRect = document.querySelector('body').getBoundingClientRect();
		      const cartButton = this.$refs.AddToCartButton;

		      prod_img.style.transition = 'transform 1s ease-in-out';
		      prod_img.style.transform = `translate(${(bodyRect.right - 30) - prod_img.getBoundingClientRect().right - 20}px, ${
		        (bodyRect.top - 0) - prod_img.getBoundingClientRect().top + cartButton.clientHeight / 2 - prod_img.clientHeight / 2
		      }px)`;

		      setTimeout(()=>{
		      	prod_img.style.display = 'none';

		      	// Сброс положения изображения при повторном нажатии
		        if (this.is_added_to_cart) {
		          prod_img.style.transform = 'translate(0, 0)'
		        }
		        
		      }, 1500)
		    }
		},

		async mounted () {
			await this.SET_LANG()
			this.GET_INTERFACE()
			this.currentLang = this.GET_LANG
			console.log('this.GET_LANG ',this.GET_LANG)
			console.log('this.currentLang ',this.currentLang)
		}
	}
</script>

<template>
	<div ref="AddToCartButton" class="AddToCartButton" @click="addToCart">
		<img ref="productThumbnail" class="product-thumbnail" v-if="product.mainImage" v-lazy="product.mainImage">
		<img v-if="is_added_to_cart" v-lazy="{src: '/img/cart-check-fill.svg'}">
		<img v-else v-lazy="{src: '/img/cart-add.svg'}">
		<p ref="add_to_cart_note">{{ INTERFACE_DATA.addToCartButtonText && INTERFACE_DATA.addToCartButtonText[currentLang] }}</p>

		<p v-if="quantity_in_cart" >{{quantity_in_cart}}</p>
  	</div>
</template>

<style scoped lang="scss">

	.AddToCartButton {
		border-radius: 1000px;
		border: 1px solid #005eff;
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items: center;
		gap: 10px;
		padding: 7px 20px;
		user-select: none;
		cursor: pointer;
		width: max-content;
		position: relative;
		background: #005eff;

		img{
			width: 20px;
		}

		&:hover {
			transition: all 1s;
			background: #005eff;
		}

		p {
			color: #fff;
		}

		.product-thumbnail {
			width: 40px;
			height: 40px;
			object-fit: cover;
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 1000px;
			display: none;
		}
	}

	@media screen and (max-width: 180px) {
		.AddToCartButton {
			flex-direction: column;
			
			img {
				display: none;
			}
		}
	}

</style>