<script lang="ts">
export default {
  data() {
    return {
      anchorWrapper: null,
      scrollTopPX: 0,
      upIconDisplay: 'none',
      rotateClass: '',
      upAnchorDisplay: 'none',
      anchorClicked: false, // новое состояние
    };
  },

  mounted() {
    this.initializeAnchor();
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.handleDocumentClick);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleDocumentClick);
  },

  methods: {

    handleScroll() {
      if (document.documentElement.scrollTop > 100) {
        this.rotateClass = 'rotate';
        this.upAnchorDisplay = 'flex';
      } else {
        this.rotateClass = '';
        if (!this.anchorClicked) {
         	this.upAnchorDisplay = 'none';
        } else {
        	this.upAnchorDisplay = 'flex';
        }
      }
    },

    initializeAnchor() {
      this.scrollTopPX = 0;

      // на первом запуске
      if (document.documentElement.scrollTop <= 0) {
        this.$refs.anchor.style.display = 'none';
      }
    },

    isClick() {
      if (document.documentElement.scrollTop <= 0) {
        document.documentElement.scrollTop = this.scrollTopPX;
        this.upAnchorDisplay = 'none';
      } else if (document.documentElement.scrollTop > 0) {
        this.scrollTopPX = document.documentElement.scrollTop;
        document.documentElement.scrollTop = 0;
        this.upAnchorDisplay = 'flex';
        this.anchorClicked = true; // устанавливаем состояние после клика
      }
    },

    handleDocumentClick(event) {
      // Проверяем, был ли клик выполнен по левому краю экрана
      if (event.clientX <= 0) {
        // Выполняем определенную функцию
        this.isClick();
      }
    },
  },
};
</script>

<template>
  <div 
  	ref="anchor" 
  	class="anchor" 
  	:style="{display: upAnchorDisplay}" 
  	:class="rotateClass" 
  	@click="isClick">
    <img v-lazy="{src: 'img/icons/arrow-down.svg'}">
  </div>
</template>

<style scoped lang="scss">
.anchor {
  border-radius: 1000px;
  border: 1px solid #ffffff;
  background: #0000007a;
  user-select: none;
  position: fixed; // Изменено: фиксированная позиция
  bottom: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 1s;
  transform: rotate(0deg);

  &:hover {
    transition: all 1s;
    border: none;
    background: #005eff;
  }
}

.rotate {
  transform: rotate(180deg);
  transition: all 1s;
}
</style>
