<script lang="ts">
  import CategoryItem from './CategoryItem.vue'
  import ProductItem from '../../ProductItem.vue'
  import SearchForm from './SearchForm.vue'
  import Popup from '../../Popup.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        categories: [],
        selectedCategoryId: null,
        selectedCategory: null,
        activeCategoryId: null,
        isPopupCategoryVisible: false,
        isPopupFiltersVisible: false
      }
    },

    components: {
      CategoryItem,
      SearchForm,
      Popup,
      ProductItem
    },

    computed: {
      ...mapGetters(['PRODUCTS'])
    },

    methods: {
      ...mapActions(['GET_PRODUCTS']),

      openCategoryPopup() {
        this.isPopupCategoryVisible = true;
      },
      closeCategoryPopup() {
        this.isPopupCategoryVisible = false;
      },

      openFiltersPopup() {
        this.isPopupFiltersVisible = true;
      },
      closeFiltersPopup() {
        this.isPopupFiltersVisible = false;
      },

      get_categories() {
        this.axios.get('http://192.168.3.140:3000/productsCategories').then((response) => {
          this.categories = response.data;
        });
      },

      showSubcategories(category) {
        this.selectedCategoryId = category.id;
        this.selectedCategory = category;
        this.activeCategoryId = category.id;

        this.GET_PRODUCTS({ categoryId: category.id, subcategoryId: null });
      },

      showProductsFromSubcategory(subcategory) {
        this.activeCategoryId = subcategory.id;

        this.GET_PRODUCTS({ categoryId: this.selectedCategoryId, subcategoryId: subcategory.id });

        this.closeCategoryPopup();
      },

      goBack() {
        this.selectedCategoryId = null;
        this.selectedCategory = null;
        this.activeCategoryId = null;

        this.GET_PRODUCTS();
      },
    },

    mounted() {
      this.get_categories();
      this.GET_PRODUCTS();
    },
  }
</script>

<template>
  <div class="CatalogPage">

    <div class="logo">
      <img v-lazy="{src: '/img/logos/elvencrown-shop-logo.jpg'}">
    </div>

    <SearchForm></SearchForm>

    <div class="buttons">
      <div class="categories-select-button" @click="openCategoryPopup">
        <img v-lazy="{src: '/img/icons/category.svg'}">
        <p>Категорії</p>
      </div>

      <div class="categories-select-button" @click="openFiltersPopup">
        <img v-lazy="{src: '/img/icons/settingsfilter.svg'}">
        <p>Фільтри</p>
      </div>     
    </div>

    <Popup  v-if="isPopupFiltersVisible" @closePopup="closeFiltersPopup">
      <p>Фильтро нет</p>
    </Popup>

    <Popup  v-if="isPopupCategoryVisible" @closePopup="closeCategoryPopup">
      <div class="categories-block">          
        <div class="categories-title">
            <h2>Категорії</h2>
        </div>

        <div class="categories">
          <div class="cat-list" v-if="!selectedCategoryId">
            <CategoryItem
              v-for="category in categories"
              :key="category.id"
              @click="showSubcategories(category)"
              :category="category"
              :categoryActive="category.id === activeCategoryId"
            >
              {{ category.title }}
            </CategoryItem>
          </div>  

          <ul v-else class="cat-list"> 
            <div class="button-back" @click="goBack">
              <img height="30" v-lazy="{src: '/img/arrow-left.svg'}"> 
              <p>Назад</p>
            </div>

            <CategoryItem
              v-for="subcategory in selectedCategory.subcategories"
              :key="subcategory.id"
              @click="showProductsFromSubcategory(subcategory)"
              :category="subcategory"
              :categoryActive="subcategory.id === activeCategoryId"
            >
              {{ subcategory.title }}
            </CategoryItem>
          </ul>
        </div>
      </div>
    </Popup>

    <div class="products-list">
      <ProductItem v-for="product in PRODUCTS" :key="product.id" :product="product" />
    </div> 
  </div>
</template>

<style scoped lang="scss">
	.CatalogPage {
		color: #fff;
    padding: 15px 15px 50px 15px;

    .logo{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
      user-select: none;

      img {
        width:280px;
      }
    }

    .buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-bottom: 15px;

      .categories-select-button {
        padding: 10px 20px;
        border-radius: 1000px;
        color: #fff;
        width: max-content;
        display: flex;
        gap:8px;
        align-items: center;
        align-content: center;
        border: 1px solid #005eff;
        background: #005eff;
        user-select: none;
        cursor: pointer;

        img {
          width: 20px;
          height: 20px;
        }

        p {
          color: #fff;
          font-weight: bold;
        }

        &:hover{
          background: #005eff;
          cursor: pointer;
        }
      }
    }

    .categories-block{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      .categories-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        
        h2 {
          font-size: 20px;
          margin-bottom: 15px;
          color: #fff;
          text-transform: uppercase;
          text-align: center;
          user-select: none;
        }          
      }

      .categories {
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        gap:30px;

        .cat-list{
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
          flex-direction: column;
          

          .button-back {
            height: 50px;
            display: flex;
            gap: 15px;
            cursor: pointer;
            align-items: center;

            p {
              font-size: 18px;
              font-weight: bold;  
            }
          }       
        }    
      }
   
    }

    .products-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-column-gap: 15px;
      grid-row-gap: 30px;
      padding: 30px 0px;

      /* Если только 1 элемент, установите максимальную ширину на 290px */
      & > :only-child {
        max-width: 290px;
      }

      /* Если 2 элемента, также установите максимальную ширину на 290px */
      & > :first-child:nth-last-child(2),
      & > :first-child:nth-last-child(2) ~ :last-child {
        max-width: 290px;
      }
    }
	}

  @media screen and (max-width: 530px) {

    .CatalogPage {
      .categories-block{
        .categories {
          width: 100%;
        }
      }

      .products-list {
        grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
      }
    }
  }

  @media screen and (max-width: 315px) {
    .CatalogPage {
      .buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  }
</style>