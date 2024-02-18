<script lang="ts">
	import {mapGetters, mapActions} from 'vuex'
	import AddToCartButton from '../../AddToCartButton.vue'
	import ProductCharacteristics from './ProductCharacteristics.vue'
	import PresentationScreen from './PresentationScreen.vue'

	export default{
		data(){
			return{
				product: [],
				metaDescriptionDefault: 'Магазин elvencrown. Тут ви можете купити черевики, жіночи, чорні, лакові батильйони на платформі, кулони, підвіски, кільця. Доставка по Украине.',
				metaKeywordsDefault: 'ботинки, черевики, жіночі ботинки, чорні ботинки, лакові ботинки, батильйони на платформі, панк стиль, купити ботинки, купити в україні, магазин, кулони, підвіски, кільця'
			}
		},

		components: {
	      AddToCartButton,
	      ProductCharacteristics,
	      PresentationScreen
	    },

		computed: {
			...mapGetters(['PRODUCTS'])
		},

		methods: {
			...mapActions(['GET_PRODUCTS']),
			
			getProductData () {
				this.PRODUCTS.forEach((i) => {
			      if (i.id.toString() === this.$route.params.product_id.toString()) {
			        this.product = i;

			        // add meta title in page for seo 
			        this.$nextTick(() => {
			          document.title = this.product.title + ' | elvencrown';
			        });
			      }
			    })
			},

			// for seo
			updatePageMetadata() {
		      // Обновление метатегов description и keywords
		      const metaDescription = document.querySelector('meta[name="description"]');
		      const metaKeywords = document.querySelector('meta[name="keywords"]');

		      if (metaDescription) {
		        metaDescription.setAttribute('content', this.product.metaDescription || this.metaDescriptionDefault);
		      }

		      if (metaKeywords) {
		        metaKeywords.setAttribute('content', this.product.metaKeywords || this.metaKeywordsDefault);
		      }
		    }
		},

		beforeRouteLeave(to, from, next) {
		  // Возвращаем метатеги на значения по умолчанию при переходе на другой роут
		  const metaDescription = document.querySelector('meta[name="description"]');
		  const metaKeywords = document.querySelector('meta[name="keywords"]');

		  if (metaDescription) {
		    metaDescription.setAttribute('content', this.metaDescriptionDefault);
		  }

		  if (metaKeywords) {
		    metaKeywords.setAttribute('content', this.metaKeywordsDefault);
		  }

		  next();
		},

		async mounted () {
			await this.GET_PRODUCTS()
			this.getProductData()
			this.updatePageMetadata()
		},

		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.getProductData()
			})
		}
	}
</script>

<template>	
	<div class="ProductPage">
		<div class="first-screen">
			<img v-if="product.mainImage" v-lazy="product.mainImage" :alt="product.shortDesc" class="main-banner">

			<div class="info-section">
				<h1>{{ product.title }}</h1>
				<h2 v-if="product.shortDesc">{{ product.shortDesc }}</h2>	

				<div class="price">
	                <p v-if="product.oldPrice">Знижка тільки 7 днів, поспішайте!</p>
	                <br> 
	                <p>
	                	<span class="old-price" v-if="product.oldPrice">{{product.oldPrice}} ГРН</span>
	                	<br>
	                	<span class="new-price">{{product.price}} грн</span> 
	                </p>
	            </div>

				<AddToCartButton :product="product"></AddToCartButton>			
			</div>
		</div>

		<PresentationScreen 
			v-if="product.characteristicsImage && product.shortDesc" 
			:bannerURL="product.characteristicsImage" 
			:bannerDesc="product.shortDesc">
			<template v-slot:slot-title>Характеристики</template>
			<template v-slot:slot-desc>
				<ProductCharacteristics :product="product"></ProductCharacteristics>
			</template>
		</PresentationScreen>

		<PresentationScreen 
			v-for="block in product.presentationBlocks"
			:key="block.id"
			:horizontalOrientation="block.horizontalPosition" 
			:bannerURL="block.imageUrl" 
			:bannerDesc="product.shortDesc"
		>
			<template v-slot:slot-title>{{block.imageTitle}}</template>
			<template v-slot:slot-desc>{{block.imageCaption}}</template>
		</PresentationScreen>
	</div>
</template>

<style scoped lang="scss">
.first-screen{
	display: flex;
	height: calc(100vh - 35px);

	img.main-banner {
		width: 50%;
		min-width: 50%;
		max-width: 50%;
		object-fit: cover;
	}

	.info-section{
		width: 50%;
		min-width: 50%;
		max-width: 50%;
		color: #fff;
		display: flex;
		grid-gap: 15px;
	    flex-direction: column;
	    align-content: center;
	    align-items: flex-start;
	    justify-content: center;
	    padding: 50px;

		h1{
			font-size: 30px;
			color: #fff;
			text-transform: uppercase;
		}

		h2{
			font-size: 20px;
			color: #fff;
			margin-bottom: 20px;
		}

		.price {
			display: flex;
			flex-direction: column;
			gap: 15px;

			p {
				font-size: 20px;
			}

			.old-price {
				text-decoration: line-through;
			    font-size: 30px;
			    color: red;
			}

			.new-price {
				color: #0f0;
			    font-size: 20px;
			}
		}
	}
}

@media screen and (max-width: 1087px) {
	.first-screen{
		flex-direction: column;
		height: max-content;

		img.main-banner {
			width: auto;
			min-width: 100%;
			max-width: 100%;
			max-height: 80vh;
		}

		.info-section{
			width: auto;
			min-width: 100%;
			max-width: 100%;
			padding: 15px;
		}
	}
}

</style>
