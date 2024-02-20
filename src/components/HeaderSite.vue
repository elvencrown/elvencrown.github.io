<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        bigSizeHeader: this.isBigSizeHeader(),
      };
    },
    computed: {
      ...mapGetters(['NAV_HEADER_IS_OPENED', 'CART'])
    },
    methods: {
      ...mapActions(['ACTION_NAV_HEADER_STATE']),

      nav_button() {
        this.ACTION_NAV_HEADER_STATE(!this.NAV_HEADER_IS_OPENED);
      },

      panel_if_scroll_page() {
        window.addEventListener('scroll', () => {
          this.$refs.site_header.style.position = document.documentElement.scrollTop <= 0 ? 'static' : 'fixed';
        });
      },

      panel_if_scroll_page_in_catalog() {
        window.addEventListener('scroll', () => {
          this.bigSizeHeader = this.isBigSizeHeader();
        });
      },

      isBigSizeHeader() {
        return this.$route.path === '/' && document.documentElement.scrollTop <= 0;
      },
    },

    watch: {
      '$route'() {
        this.bigSizeHeader = this.isBigSizeHeader();
      },
    },

    mounted() {
      this.panel_if_scroll_page();
      this.panel_if_scroll_page_in_catalog();
    },
  };
</script>


<template>
  <div class="site_header" ref="site_header" :class="{ 'big-size': bigSizeHeader }">
    <div ref="nav_button" class="nav_button" @click="nav_button">
      <div v-if="!NAV_HEADER_IS_OPENED" class="two-lines">
        <div class="line-white"></div>
        <div class="line-white"></div>
      </div>
      <img v-else v-lazy="{src: '/img/close.svg'}">
    </div>

    <router-link to="/" class="site_meta">
      <img v-if="!bigSizeHeader" v-lazy="{src: '/img/logos/elvencrown-logo.jpg'}">
    </router-link> 

    <router-link to="/cart" class="cart-button">
      <img v-lazy="{src: '/img/shopping-cart-icon.svg'}">
      <div class="cart-count">{{ CART.length }}</div>
    </router-link>
  </div>
</template>


<style scoped lang="scss">
	.site_header{
		background: #000;
		display: flex;
		grid-gap: 15px;
    	height: 35px;
    	padding: 5px 15px;
    	align-content: center;
    	align-items: center;
    	position: relative;
    	justify-content: space-between;
    	user-select: none;
    	position: static;
    	justify-items: start;
    	box-shadow: 1px 3px 6px -5px #fff;
    	z-index: 10;

		/*if position: fixed in js: */
    	right: 0;
    	left: 0;
    	top: 0;

		.nav_button{
	        display: grid;
	        cursor: pointer;
			user-select: none;
			align-items: center;
			width: 40px;

			.two-lines {
				width: 25px;
				height: 25px;
				display: grid;
				grid-row-gap: 5px;
				align-items: center;
				align-content: center;

				.line-white{
					width: 100%;
					height: 2px;
					border-radius: 1000px;
					background: #fff;
				}
			}

			img {
				height: 25px;
			}
		}

		.site_meta{
			display: grid;
		    align-items: center;
		    text-decoration: none;
	    	color: #5f5f5f;
	    	justify-content: center; 

		   	img{
				object-fit: cover;
				height: 25px;
				border-radius: 1000px;
			}
		}

		.cart-button {
			display: flex;
			flex-direction: row;
    		align-items: center;
    		width: 40px;

			img {
				height: 25px;
			}		

			.cart-count {
				width: max-content;
				padding: 1px 0px 1px 6px;
				color: #fff;
				background: #000;
				border-radius: 1000px;

				&:empty {
					display: none;
				}
			}
		}
	}

	.big-size{
		box-shadow: none;

		.site_meta{

		   	img{
				display: none;
			}
		}
	}
</style>