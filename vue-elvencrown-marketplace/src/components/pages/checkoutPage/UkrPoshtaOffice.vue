<script lang="ts">
export default {
  data() {
    return {
      indexValue: '',

      indexValid: false
    }
  },

  methods: {

    numberValidates() {

      const trimmedValue = this.indexValue.trim();
      if (trimmedValue === '') {
        this.$refs.indexElement.querySelector('input').style.border = "1px solid red";
        this.indexValid = false
        this.validateForm(); 
        
      }

      const isNumeric = /^\d+$/.test(trimmedValue);
      if (!isNumeric || trimmedValue.length !== 6) {
        this.$refs.indexElement.querySelector('.required').style.display = "block";
        this.$refs.indexElement.querySelector('input').style.border = "1px solid red";
        this.indexValid = false
        this.validateForm(); 
        
      } else {
        this.$refs.indexElement.querySelector('.required').style.display = "none";
        this.$refs.indexElement.querySelector('input').style.border = "1px solid green";
        this.indexValid = true 
        this.validateForm();  
        
      }

    },

    validateForm() {
      if (this.indexValid) {
        let data = {
          valid: this.indexValid,
          indexValue: this.indexValue,
        }
        this.$emit('update:ukrPoshtaOfficeValid', data)        
      }
    }
  }

};
</script>

<template>
  <div class="UkrPoshtaOffice">
    <h3>Індекс вашої пошти</h3>

    <div class="field-wrapper" ref="indexElement">
      <input 
        placeholder="Індекс відділення" 
        type="text" 
        v-model="indexValue"
        @focusout="numberValidates()"
        @input="numberValidates()"
      >
      <img class="valid-icon" v-if="indexValid" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Будь ласка, введіть правильний індекс.</div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.UkrPoshtaOffice {
    display: flex;
    gap: 15px;
    flex-direction: column;

    h3 {
      color: #fff;
    }

    .required {
      color: red;
      display: none;
    }

    .valid-icon {
      width: 25px;
      height: 25px;
      position: absolute;
      right: 11px;
      top: 12px;
    }

    .field-wrapper {
      position: relative;
    }
}
</style>