<script lang="ts">
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            products: [],
            text: ''
        }
    },

    computed: {
        ...mapGetters(['PRODUCTS']),

        filtered() {
            if (this.text.length >= 3) {
                return this.PRODUCTS.filter(product =>
                    product.title.toString().toLowerCase().includes(this.text.toString().toLowerCase())
                );
            } else {
                return [];
            }
        }
    },

    methods: {
        ...mapActions(['GET_PRODUCTS']),

        handleDocumentClick(event) {
            // Проверяем, был ли клик на элементе формы или на списке товаров
            const clickedOnForm = this.$refs.form && this.$refs.form.contains(event.target);
            const clickedOnProductNames = this.$refs.product_names && this.$refs.product_names.contains(event.target);

            // Если клик не был на элементе формы и не на списке товаров, скрываем список товаров
            if (!clickedOnForm && !clickedOnProductNames) {
                this.$refs.product_names.style.display = 'none';
            }
        },

        handleInput() {
            // Показываем список товаров при вводе
            if (this.text.length >= 3) {
                this.$refs.product_names.style.display = 'flex';
            }
        },
    },

    async mounted() {
        this.products = await this.GET_PRODUCTS();
        // Добавляем обработчики событий
        document.addEventListener('click', this.handleDocumentClick);
    },

    beforeDestroy() {
        // Удаляем обработчики событий при разрушении компонента
        document.removeEventListener('click', this.handleDocumentClick);
    },
}
</script>

<template>
    <div class="SearchForm">
        <div class="form-wrapper">
            <div class="form" ref="form" @click.stop="">
                <input type="text" placeholder="Search.." v-model='text' @input="handleInput">
                <div class="form-button">
                    <img v-lazy="{src: '/img/search.svg'}">
                </div>
            </div>
        </div>

        <div class="product-names" ref='product_names'>
            <div class="product-title" v-for="(product, index) in filtered" :key="index">
                <router-link class="product-link" :to="{ name: 'product_page', params: { product_id: product.id }}">
                    {{ product.title ? product.title : 'Товаров нет' }}
                </router-link>                
            </div>
        </div>        
    </div>
</template>


<style scoped lang="scss">
	.SearchForm {
		display: flex;
    	flex-direction: column;
    	align-items: center;
    	position: relative;
	}

	.form-wrapper {
		display: flex;
	    align-content: center;
	    align-items: flex-start;
	    justify-content: center;
	    width: max-content;
	    max-width: 500px;
	}

	.product-names {
		background: #343434;
		color: #fff;
		display: flex;
		gap:15px;
		flex-wrap: wrap;
    	flex-direction: row;
		cursor: pointer;
		display: none;
		position: absolute;
		z-index: 5;
		border-radius: 20px;
		padding: 45px 15px 15px 15px;
		width: max-content;
		max-width: 500px;
	    top: 15px;

	    .product-title {
			.product-link {
				background: #00000052;
				padding: 15px 30px;
				border-radius: 1000px;
				color:#fff;
				display: block;
			}

			.product-link:hover {
				transition: all 0.5s;
				background: #005eff;
			}	    	
	    }
	}

	.form {
		display: flex;
		border-radius: 1000px;
		border: 1px solid #fff;
		padding: 5px 5px 5px 0;
		user-select: none;
		width: 500px;
		justify-content: space-between;
		height: 50px;
		background: #000;
		margin-bottom: 15px;
		position: relative;
		z-index: 9;

		input {
			border-radius: 1000px;
			border: none;
		    background: #000;
		    padding: 0 15px;
		    color: #fff;
		    width: 100%;
		    font-size: 19px;
		}

		input::placeholder {
			color: #fff;
		}

		input:focus::-webkit-input-placeholder { 
			transition: all 0.5s;
			color:transparent; 
		}

		input:focus .product-names{
			display: flex;
		}

	    .form-button {
			border-radius: 1000px;
		    width: 41px;
		    display: flex;
		    color: #fff;
		    align-content: center;
		    justify-content: center;
		    align-items: center;
		    cursor: pointer;

		    img {
		    	width: 20px;
		    	height: 20px;
		    }
	    }

	    .form-button:hover {
		    background: #000;
		    border: 3px solid #000;
		    background: #00f;
		    border: 3px solid #00f;
	    }
	}

	@media screen and (max-width: 530px) {

		.form-wrapper,
		.product-names,
		.form  {
		    width: 100%;
		}

	}
</style>