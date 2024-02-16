<script lang="ts">

	import WidgetNavForMyAccount from './WidgetNavForMyAccount.vue'

	export default {
		data () {
			return {
		      currentPage: '', // var for storage page
		    }
		},

		components: {
		    WidgetNavForMyAccount,
		},

		methods: {

		},

		watch: {
		  // use watch for watching change route and update currentPage
		  '$route'() {
		    this.currentPage = this.$route.name;
		  }
		},

		mounted () {
		},
	}
</script>

<template>
	<div class="right_nav_content">
		<router-link v-if="currentPage === 'archive_products'" to="/">
			<img v-lazy="{src: '/img/four-squares.svg'}">
			<p>Color</p>
		</router-link>

		<WidgetNavForMyAccount  v-if="currentPage === 'my-account'" />
	</div>
</template>

<style scoped lang="scss">
	.right_nav_content{
		transition: all 0.2s;
		position: static;
		top: 35px;
		right: 0px;
		left: auto;
		bottom: 0;
		padding: 0px 0px 0px 0px;
		display: grid;
		grid-gap: 15px;
		grid-auto-rows: max-content;
		margin-right: 15px;
		min-height: 100vh;
		width: 250px;
		max-width: 250px;
		justify-content: end;
		border-left: 1px solid #202020;

		img {
			width: 15px;
			height: 15px;
		}
	}

	.right_nav_content > a{ 
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
	.right_nav_content > a:hover{ 
		background: #005eff;
		color: #fff;
	}

	.router-link-active {
		background: #005eff;
	}
</style>