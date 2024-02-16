<script lang="ts">
	import {mapActions,mapGetters} from 'vuex'

	export default {
		data () {
			return {
			}
		},

		computed: {
			...mapGetters(['NAV_HEADER_IS_OPENED', 'CART'])
		},
		
		methods: {

			nav_state () {
				if (this.NAV_HEADER_IS_OPENED) {
					this.$refs.nav_content.style.left = '0'
				} else if (!this.NAV_HEADER_IS_OPENED) {
					this.$refs.nav_content.style.left = '-1000px'
				}
			}
		},


		watch: {
			NAV_HEADER_IS_OPENED (newVal) {
				this.nav_state()
			}
		}
	}
</script>

<template>
	<div ref="nav_content" class="nav_content">
		<!-- <router-link to="/user"><img src="img/person.svg"><p>Мій профіль</p></router-link>  -->
		<router-link to="/"><img v-lazy="{src: '/img/search.svg'}"><p>Каталог</p></router-link> 
		<router-link to="/contacts"><img v-lazy="{src: '/img/send.svg'}"><p>Контакти</p></router-link> 
		<router-link to="/about-us"><img v-lazy="{src: '/img/logos/elvencrown-logo.jpg'}"><p>Про нас</p></router-link> 
	</div>
</template>

<style scoped lang="scss">
	.nav_content{
		transition: all 0.2s;
		position: fixed;
		top: 35px;
		left: -1000px;
		right: auto;
		bottom: 0;
		padding: 15px 15px;
		display: grid;
		grid-gap: 15px;
		grid-auto-rows: max-content;
		min-height: 100vh;
		width: 250px;
		max-width: 250px;
		border-right: 1px solid #202020;
		background: #000;
		z-index: 9999;

		img {
			width: 15px;
			height: 15px;
		}
	}

	.nav_content > *{ 
		color: #fff;
	    cursor: pointer;
	    user-select: none;
	    text-decoration: none;
	    padding: 10px 15px;
	    border-radius: 1000px;
	    background: #0000;
	    width: max-content;
	    display: flex;
		align-items: center;
		column-gap: 9px;
	}
	.nav_content > *:hover{ 
		background: #005eff;
		color: #fff;
	}

	.router-link-active {
		background: #005eff;
	}

</style>