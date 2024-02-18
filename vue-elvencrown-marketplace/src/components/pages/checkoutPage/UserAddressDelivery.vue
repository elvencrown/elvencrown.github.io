<script lang="ts">
export default {
  data() {
    return {
      homeAddressValue: '',
      houseNumberValue: '',
      apartmentNumberValue: '',
      floorNumberValue: '',
      elevatorNoValue: '',
      elevatorYesValue: '',

      homeAddressValid: false,
      houseNumberValid: false,
      apartmentNumberValid: false,
      floorNumberValid: false,
      elevatorValid: false
    }
  },

  methods: {

    homeAddressValidates() {
      let words = this.homeAddressValue.split(' ').filter(word => word.trim() !== '')
      if (words.length > 2) {
        this.$refs.homeAddressElement.querySelector('.required').style.display = "none"
        this.$refs.homeAddressElement.querySelector('input').style.border = "1px solid green"
        this.homeAddressValid = true
        this.validateForm();
      } else {
        this.$refs.homeAddressElement.querySelector('.required').style.display = "block"
        this.$refs.homeAddressElement.querySelector('input').style.border = "1px solid red"
        this.homeAddressValid = false
        this.validateForm();
      }
    },

    numberValidates(valueInput, parentInput) {
      const fieldValue = valueInput.trim()
      if (fieldValue !== '') {
          const isNumeric = /^\d+$/.test(fieldValue)
          if (!isNumeric || fieldValue.length > 4) {
              parentInput.querySelector('.required').style.display = "block"
              parentInput.querySelector('input').style.border = "1px solid red"
              
              return false
          } else {
              parentInput.querySelector('.required').style.display = "none"
              parentInput.querySelector('input').style.border = "1px solid green"
              
              return true
          }
      } else {
          
          parentInput.querySelector('input').style.border = "1px solid red"
          return false
      }
    },

    validateForm() {
      let data = {}

      if (
          this.homeAddressValid 
          && 
          (this.houseNumberValid || this.apartmentNumberValid)
          && 
          this.floorNumberValid 
          && 
          this.elevatorValid
        ) {

        let isElevator = 'No'
        if (this.elevatorNoValue) {
          isElevator = 'No'
        } else if (this.elevatorYesValue) {
          isElevator = 'Yes'
        }

        data = {
          valid: true,
          homeAddressValue: this.homeAddressValue,
          houseNumberValue: this.houseNumberValue,
          apartmentNumberValue: this.apartmentNumberValue,
          floorNumberValue: this.floorNumberValue,
          elevator: isElevator
        }

        
      } else {
        data = { valid: false }
      }

      this.$emit('update:UserAddressDeliveryFieldsAreValid', data)
    }
  },

  watch: {
    elevatorYesValue(value) {
      if (value) {
        this.elevatorNoValue = false;
      }
      this.elevatorValid = value || this.elevatorNoValue;
      this.validateForm()
    },
    elevatorNoValue(value) {
      if (value) {
        this.elevatorYesValue = false;
      }
      this.elevatorValid = value || this.elevatorYesValue;
      this.validateForm()
    }
  }

};
</script>

<template>
  <div class="UserAddressDelivery">
    <h3>Ваша точна адреса</h3>

    <div class="field-wrapper" ref="homeAddressElement">
      <input 
        placeholder="Ваша адреса" 
        type="text" 
        v-model="homeAddressValue" 
        @focusout="this.homeAddressValidates(),this.validateForm()"
        @input="this.homeAddressValidates(),this.validateForm()"
      >
      <img class="valid-icon" v-if="homeAddressValid" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Будь ласка, введіть більш детальну адресу.</div>
    </div>
    
    <div class="field-wrapper" ref="houseNumberElement">
      <input 
        placeholder="Номер дому" 
        type="text" 
        v-model="houseNumberValue"
        @focusout="this.houseNumberValid = numberValidates(this.houseNumberValue, this.$refs.houseNumberElement) , this.validateForm()"
        @input="this.houseNumberValid = numberValidates(this.houseNumberValue, this.$refs.houseNumberElement) , this.validateForm()"
      >
      <img class="valid-icon" v-if="houseNumberValid" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Будь ласка, введіть лише цифри, максимум 4.</div>
    </div>

    <div class="field-wrapper" ref="apartmentNumberElement">
      <input 
        placeholder="Номер квартири" 
        type="text" 
        v-model="apartmentNumberValue"
        @focusout="this.apartmentNumberValid = numberValidates(this.apartmentNumberValue, this.$refs.apartmentNumberElement) , this.validateForm()"
        @input="this.apartmentNumberValid = numberValidates(this.apartmentNumberValue, this.$refs.apartmentNumberElement) , this.validateForm()"
      >
      <img class="valid-icon" v-if="apartmentNumberValid" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Будь ласка, введіть лише цифри.</div>
    </div>

    <div class="field-wrapper" ref="floorNumberElement">
      <input 
        placeholder="Номер поверху" 
        type="text" 
        v-model="floorNumberValue"
        @focusout="this.floorNumberValid = numberValidates(this.floorNumberValue, this.$refs.floorNumberElement) , this.validateForm()"
        @input="this.floorNumberValid = numberValidates(this.floorNumberValue, this.$refs.floorNumberElement) , this.validateForm()"
      >
      <img class="valid-icon" v-if="floorNumberValid" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Будь ласка, введіть лише цифри.</div>
    </div>

    <p>Є ліфт?</p>
    <label for="elevator-yes">
      <input type="checkbox" id="elevator-yes" v-model="elevatorYesValue" ref="elevatorYesCheckbox">
      <p>Так</p>
    </label>
    <label for="elevator-no">
      <input type="checkbox" id="elevator-no" v-model="elevatorNoValue" ref="elevatorNoCheckbox">
      <p>Ні</p>
    </label>
  </div>
</template>

<style scoped lang="scss">
.UserAddressDelivery {
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

    label {
      display: flex;
      gap:10px;
      align-items: center;
    }
}
</style>