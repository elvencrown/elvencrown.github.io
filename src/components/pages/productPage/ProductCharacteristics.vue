<script lang="ts">
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
		}
	}
</script>

<template>
	<div class="ProductCharacteristics">
		<div class="item" v-for="char in product.characteristics" :key="char.name">
			<p>{{char.name}}:</p>
			<span>{{ Array.isArray(char.value) ? char.value.join(', ') : char.value }}</span>
		</div>
	</div> 	
</template>

<style scoped lang="scss">
.ProductCharacteristics {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;

	.item {
		text-align: left;
		color: #d9d9d9;
		padding: 10px 0;
		display: flex;
	    flex-direction: row;
	    justify-content: space-between;
	    gap: 10px;
	    background: #141414;
	    border-radius: 15px;
	    padding: 5px 15px;
	    max-width: max-content;
	    font-size: 17px;
	    flex-wrap: wrap;

	    p{

	    }

		span {
			color: #fff;
		}
	}
}
</style>