<script lang="ts">
export default {
  data() {
    return {
      methodName: 'Cash on delivery',

      formValid: true
    }
  },

  methods: {
    validateForm() {
      let data = {}

      if (this.formValid) {
        data = {
          valid: true,
          methodName: this.methodName,
        }
      } else {
        data = { valid: false }
      }

      this.$emit('update:paymentMethodValid', data)   
    },

    handlePlaceClick(placeName) {
      this.methodName = placeName

      if (placeName === 'Cash on delivery') {
        this.formValid = true
      }

      this.validateForm()
    }
  }
};
</script>

<template>
  <div class="ChoosingPaymentMethod">
    <h3>Спосіб оплати</h3>

    <div class="list">
<!-- 
      <div 
        :class="{
          'method': true,
          'selected-method': this.methodName === 'Cash on site'
        }"  
        @click="handlePlaceClick('Cash on site')">
        <img class="method-logo" v-lazy="{src: '/img/icons/cash-on-card.png'}" alt="Bank icon">
        <p>На сайті</p>
        <img
          class="valid-icon"
          v-lazy="{src: '/img/icons/checkbox-circle-green.svg'}"
          alt="Иконка валидации"
        />
        <img
          class="valid-icon-empty"
          v-lazy="{src: '/img/icons/circle-empty.svg'}"
          alt="Иконка не валидно"
        />
      </div>
 -->
      <div 
        :class="{
          'method': true,
          'selected-method': this.methodName === 'Cash on delivery'
        }"  
        @click="handlePlaceClick('Cash on delivery')">
        <img class="method-logo" v-lazy="{src: '/img/icons/sell-selling-icon.png'}" alt="Bank icon">
        <p>Накладений платіж</p>
        <img
          class="valid-icon"
          v-lazy="{src: '/img/icons/checkbox-circle-green.svg'}"
          alt="Иконка валидации"
        />
        <img
          class="valid-icon-empty"
          v-lazy="{src: '/img/icons/circle-empty.svg'}"
          alt="Иконка не валидно"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ChoosingPaymentMethod {
    display: flex;
    gap: 15px;
    flex-direction: column;

    h3 {
      color: #fff;
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .method {
        opacity: 0.7;
        display: flex;
        flex-direction: row;
        gap:10px;
        align-items: center;
        cursor: pointer;
        background: #1a1a1a7a;
        padding: 10px;
        border-radius: 7px;         
        position: relative;
        padding-right: 50px;
        width: 211px;

        .valid-icon,
        .valid-icon-empty {
          width: 25px;
          height: 25px;
          position: absolute;
          right: 15px;
          top: calc(50% - 12.5px);
          display: none;
        }

        .valid-icon-empty {
          display: block;
        }

        &:hover {
          background: #0e0e0e;
        }

        .method-logo {
          width: 50px;
          height: 40px;
          margin-right: 10px;
        }

        p {
          font-size: 15px;
        }
      }

      .selected-method {
        border: 1px solid green; /* Зеленая рамка для выбранноого метода*/
        opacity: 1;

        .valid-icon {
          display: block;
        }

        .valid-icon-empty {
          display: none;
        }
      }
    }
}
</style>