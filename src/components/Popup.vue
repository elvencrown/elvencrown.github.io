<script lang="ts">
export default {
  data() {
    return {};
  },

  props: {},

  computed: {},

  methods: {
    closePopup(event) {
      // Проверяем, был ли клик на кнопке закрытия или на дочерних элементах popup-content
      if ( event.target.closest(".popup-content") ) {
        return;
      }
      this.$emit("closePopup");
    },
  },

  mounted() {},
};
</script>

<template>
  <div class="popup" @click="closePopup">
  	<div class="popup-close-button">
	    <img v-lazy="{src: 'img/close.svg'}"/>  		
  	</div>

    <div class="popup-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 35px;
	background: #000000c4;
	z-index: 90;
	display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;

	.popup-close-button {
		background: rgb(24 24 24);
		box-shadow: 0 0 3px 0px #fff;
		padding: 5px;
		position: absolute;
		top: 0px;
		right: 15px;
		border-radius: 1000px;
		width: 40px;
		height: 40px;
		display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-content: center;
	    align-items: center;
	    cursor: pointer;

	    &:hover {
	    	background: #005eff;
	    }

		img {	
			width: 40px;
			height: 40px;
		}
	}

	.popup-content {
		overflow-y: scroll;
		width: 500px;
		background: rgb(24 24 24);
		border-radius: 15px;
		padding: 15px;
		box-shadow: 0 0 3px 0px #fff;

		&::-webkit-scrollbar { 
		  width: 1px;
		  background-color: #fff0;
		}

		&::-webkit-scrollbar-thumb { 
		  background-color: #fff0;
		  border-radius: 1000px;
		}
	}
}
</style>