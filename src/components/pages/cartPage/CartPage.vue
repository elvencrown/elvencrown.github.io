<script lang="ts">

	import CartItem from './CartItem.vue'
	import BackToButton from '../../BackToButton.vue'
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data () {
			return {
			}
		},

		components: {
			CartItem,
			BackToButton
		},

		computed: {
			...mapGetters(['CART']),

			totalSum() {
		      // Вычисление общей суммы на основе данных в хранилище
		      return this.CART.reduce((total, product) => total + product.price * product.cart_quantity, 0);
		    }
		},

		methods: {
		    ...mapActions(['ACTION_REMOVE_PRODUCT_IN_CART', 'ACTION_UPDATE_QUANTITY_IN_CART']),

		    handleQuantityChange(newQuantity, productId) {
		      // Находим продукт в корзине по идентификатору
		      const product = this.CART.find(p => p.id === productId);

		      if (product) {
		        // Обновляем количество продукта в хранилище
		        this.ACTION_UPDATE_QUANTITY_IN_CART({ product, newQuantity });
		      }
		    },

		    handleProductRemove(product) {
		      // Удаляем продукт из хранилища
		      this.ACTION_REMOVE_PRODUCT_IN_CART(product);
		    },
		},

		beforeRouteEnter(to, from, next) {
		  
		   next(vm => {
		        // Проверяем текущий домен, если мы на сайте, то 
		        // Отправляем уведу в тг что пользователь посетил корзину
			    const currentDomain = window.location.hostname;

			    if (currentDomain === "elvencrown.github.io") {
			    	// Выполняем код только для указанного домена
			    	vm.notificationsInTelegram("Кто-то посетил страницу корзины, количество товаров");			
			    }
		    });
		}
	}
</script>

<template>
	<div class="cart">
		<h1>Кошик</h1>

		<BackToButton></BackToButton>

		<div class="total-price">
			<p v-if="this.CART.length > 0">Загальна сума: {{ totalSum }} грн</p>
			<p v-else>У вашому кошику поки що нічого немає</p>
		</div>

		<div class="products-list">
			<CartItem 
				v-for="product in CART" 
				:product="product" 
				@quantity-change="handleQuantityChange"
      			@product-remove="handleProductRemove"/>		
		</div>

		<div v-if="this.CART.length > 0" class="button-checkout-wrapper">
			<router-link to="/checkout" class="button">
				<p>Продовжити оформлення</p>
				<img v-lazy="{src: 'img/arrow-right-thin.svg'}"> 
			</router-link>			
		</div>
	</div>
</template>

<style scoped lang="scss">
	.cart {
		user-select: none;
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding: 0px 5px 45px 5px;
		align-items: center;
		color: #fff;

		h1 {
			font-size: 25px;
			margin-bottom: 10px;
			text-transform: uppercase;
			text-align: center;
			margin-top: 70px;
		}

		.products-list{
			display: flex;
		    flex-direction: column;
		    gap: 10px;
		    padding-bottom: 50px;
		}

		.button-checkout-wrapper {
			background: #000;
		    box-shadow: 0 -20px 20px #000;
		    display: flex;
		    justify-content: center;
		    position: fixed;
		    bottom: 0;
		    padding-bottom: 15px;
		    width: 100%;
		
			.button {
				padding: 10px 15px;
				border-radius: 1000px;
				color: #fff;
				width: max-content;
				display: flex;
				gap:10px;
				align-items: center;
	    		align-content: center;
	    		border: 1px solid #005eff;
	    		background: #005eff;
	    		user-select: none;
	    		cursor: pointer;

				img {
					width: 15px;
					height: 15px;
				}

				&:hover{
					background: #005eff;
					cursor: pointer;
				}
			}	
		}
	}

</style>