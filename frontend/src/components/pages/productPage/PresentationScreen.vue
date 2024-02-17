<script lang="ts">
	export default {
		data () {
			return {
			}
		},

		props: {
			bannerURL: {
				type: String,
				default () {
					return {}
				}
			},
			bannerDesc: {
				type: String,
				default () {
					return {}
				}
			},
			horizontalOrientation: {
				type: String,
				default: 'banner-right'
			}
		},

		computed: {
		    presentationStyle() {
		      if (this.horizontalOrientation === 'banner-left') {
		      	return true
		      }
		      else {
		      	return false
		      }
		    }
		},
	}
</script>

<template>
	<div class="PresentationScreen" :class="{'banner-left': presentationStyle}">
		<div class="screen-presentation__text-block">
	        <h2 class="slot-title"><slot name="slot-title"></slot></h2>
	        <p class="slot-desc"><slot name="slot-desc"></slot></p>
	    </div> 		

	    <img class="screen-presentation__banner" v-lazy="bannerURL" :alt="bannerDesc">
	</div> 	
</template>

<style scoped lang="scss">
.PresentationScreen {
	display: flex;
	user-select: none;
	padding: 0px 0px 0 0;
	height: calc(100vh - 35px);

	.screen-presentation__banner {
		width: 50%;
		object-fit: cover;
		height: calc(100vh - 35px);

	}

	.screen-presentation__text-block {
		display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    width: 50%;
	    padding: 50px;

	    h2 {
	    	margin-bottom: 15px;
	    	text-align: center;
	    	text-transform: uppercase;
	    	font-size: 30px;
	    	color: #fff;
	    }

	    p {
	    	text-align: center;
	    	font-size: 20px;
	    	color: #fff;
	    }

	    .screen-presentation__characteristics {
	    	display: flex;
	    	gap: 10px;
	    	flex-wrap: wrap;

	    	p {
	    		text-align: left;
	    		color: #d9d9d9;
	    		padding: 10px 0;
	    		display: flex;
			    flex-direction: row;
			    justify-content: space-between;
			    background: #141414;
			    border-radius: 15px;
			    padding: 5px 15px;
			    width: max-content;
			    font-size: 17px;

	    		span {
	    			color: #fff;
	    			margin-left: 10px;
	    		}
	    	}
	    }
	}
}
.banner-left {
	flex-direction: row-reverse;
}

@media screen and (max-width: 1087px) {
	.PresentationScreen{ 
		height: auto;
		flex-direction: column;

		.screen-presentation__banner {
			width: 100%;

			img {
				height: auto;
	    		width: 100%;
			}
		}

		.screen-presentation__text-block {
			width: 100%;
		}
	}
}

@media screen and (max-width: 628px) {
	.PresentationScreen .screen-presentation__text-block {
		padding: 50px 15px;

	    h2 {
	    	font-size: 25px;
	    }

		p {
			font-size: 15px;
		}
	}
}

@media screen and (max-width: 492px) {
	.PresentationScreen{ 
		.screen-presentation__banner {
			height: auto;
			max-height: 400px;
		}
	}
}

@media screen and (max-width: 353px) {
	.PresentationScreen {
		.screen-presentation__text-block {
			h2 {
				font-size: 20px;
			}
		}
	}
}
</style>