<script lang="ts">
	import {mapActions,mapGetters} from 'vuex'

	export default {
		data () {
			return {
				productTitle: this.product.title,
				note: ''
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

		computed: {
			...mapGetters(['CART'])
		},

		methods: {
			...mapActions(['ACTION_REMOVE_PRODUCT_IN_CART']),

			inputExpanding () { 
				this.$refs.cart_total_input.style.width = ((this.$refs.cart_total_input.value.length + 1) + 2) + 'ch'
			},

			addQuantity () {
			    let cart_item_quantity: number = parseInt(this.$refs.cart_total_input.value, 10)

			    // Увеличиваем количество продукта до значения product.quantity
			    if (cart_item_quantity < this.product.quantity) {
			        cart_item_quantity += 1
			        this.$refs.cart_total_input.value = cart_item_quantity
			        this.inputExpanding()

			        // Вызов события при изменении количества
			        this.$emit('quantity-change', cart_item_quantity, this.product.id);
			    } else {
			        // Максимальное количество достигнуто, можно добавить соответствующую обработку (например, показать сообщение об ошибке).
			        this.$refs.note.style.display = "flex";
			        this.note = 'Лимит '+this.product.quantity;
			    }
			},

			decreaseQuantity () {
			    // Сброс уведомления
			    this.note = '';
			    this.$refs.note.style.display = "none";

			    let cart_item_quantity: number = parseInt(this.$refs.cart_total_input.value, 10)

			    if (cart_item_quantity <= 1 ) {
			        cart_item_quantity = 1
			    } else {
			        cart_item_quantity -= 1
			    }

			    this.$refs.cart_total_input.value = cart_item_quantity 
			    this.inputExpanding()

			    // Вызов события при изменении количества
			    this.$emit('quantity-change', cart_item_quantity, this.product.id);
			},


			removeProduct () {
				let cart_item_quantity: number = parseInt(this.$refs.cart_total_input.value, 10)

				cart_item_quantity = 0
				this.$refs.cart_total_input.value = cart_item_quantity
				this.inputExpanding()

				this.ACTION_REMOVE_PRODUCT_IN_CART(this.product)

				// Вызов события при удалении продукта
      			this.$emit('product-remove', this.product, this.product.id);
			},

			truncateTitle () {
				if (this.product.title.length > 23) {
		            this.productTitle = this.product.title.substring(0, 23 - 3) + '...'
		        }
			}

		}, 

		mounted () {
			this.truncateTitle()
		}
	}
</script>

<template>
	<div class="cart-item">
		<img class="product-thumbnail" v-lazy="{src: product.mainImage}">
		
		<div class="col-2">
			<h2>{{ productTitle }}</h2>
			
			<div class="price">{{product.price}} грн</div>			

			<div class="cols">

				<div class="cart-total">
					<div class="minus" @click="decreaseQuantity" ><p>-</p></div>
					<input type="text" name="" :value="product.cart_quantity" ref="cart_total_input" v-on:keydown="inputExpanding">
					<div class="plus" @click="addQuantity" ><p>+</p></div>
				</div>		

				<div class="trash-button" @click="removeProduct">
					<img v-lazy="{src: '/img/trash.svg'}">
				</div>
			</div>		

			<div class="note" ref="note">
				<p>{{ note }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.cart-item {
		user-select: none;
		display: flex;
		gap: 15px;
	    background: #141414;
	    border-radius: 7px;
	    padding-right: 15px;
	    justify-content: flex-start;
	    max-width: 310px;
	    height: max-content;
	    align-items: center;
	    height: 104px;
	    overflow: hidden;
	    position: relative;

	    .note {
	    	position: absolute;
	    	background: #000000e3;
	    	left: 0;
	    	bottom: 0;
	    	padding: 5px 10px;
	    	width: 104px;
	    	display: flex;
	    	justify-content: center;
	    	display: none;

	    	p {
	    		color: red;
	    		font-size: 15px;
	    	}
	    }

		.product-thumbnail {
			border-radius: 10px 0 0 10px;
		    width: 104px;
		    object-fit: cover;
		}

		.col-2 {
			display: flex;
			flex-direction: column;
    		justify-content: center;
    		width: 100%;

			h2 {
				margin: 10px 0 10px 0;
				color: #fff;
				font-size: 15px;
			}

			.price {
				color: #fff;
				font-weight: 400;
				font-size: 15px;
				margin: 0 0 10px 0;
			}

			.cols {
				display: flex;
				align-items: center;
    			gap: 15px;
    			justify-content: space-between;
    			margin: 0 0 10px 0;

				.trash-button {
					display: flex;
					flex-direction: column;
					align-items: center;
				    justify-content: center;
				    align-content: center;

					img{
						width: 20px;
						height: 20px;
						min-width: 20px;
						min-height: 20px;
						cursor: pointer;
					}
				}

    			.cart-total {
					display: flex;
					flex-direction: row;

					.minus, .plus {
						color: #fff;
						padding: 0 15px;
						background: #005eff;
						width: max-content;
						display: flex;
						justify-items: center;
						align-items: center;
						height: max-content;
						height: 30px;
						cursor: pointer;
					}

					.minus{
						border-top-left-radius: 1000px;
					    border-bottom-left-radius: 1000px;
					    font-size: 35px;
					}

					.plus {
						border-top-right-radius: 1000px;
						border-bottom-right-radius: 1000px;
						font-size: 25px;
					}

					input{
						width: 3ch;
						padding:0px;
						height: 30px;
						border-radius: 0;
						color: #fff;
						background: #000;
						border: none;
						text-align: center;
					}
				}
			}
		}
	}

	@media screen and (max-width: 284px) {
		.cart-item {
			height: 140px;
			position: relative;

			.col-2 {

				.cols {
					.trash-button {
						position: absolute;
						right: 5px;
						top: 5px;
					}
				}
			}
		}
	}

</style>