<script lang="ts">

import Inputmask from 'inputmask';

export default {

  data() {
    return {
      firstNameValue: '',
      lastNameValue: '',
      middleNameValue: '',
      telValue: '',
      emailValue: '',

      telIsValid: false,
      emailIsValid: false,
      firstNameIsValid: false,
      lastNameIsValid: false,
      middleNameIsValid: false
    };
  },

  computed: {

  },

  methods: {
    firstNameValid() {
      const nameRegex = /^\p{L}+$/u;
      const trimmedValue = this.firstNameValue.trim();
      if (nameRegex.test(trimmedValue) && trimmedValue !== '') {
        this.$refs.firstNameElement.querySelector('.required').style.display = "none";
        this.$refs.firstNameElement.querySelector('input').style.border = "none";
        this.firstNameIsValid = true;
        this.firstNameValue = trimmedValue;
      } else {
        this.$refs.firstNameElement.querySelector('.required').style.display = "block";
        this.$refs.firstNameElement.querySelector('input').style.border = "1px solid red";
        this.firstNameIsValid = false;
      }
      this.validateForm();
    },

    lastNameValid() {
      const nameRegex = /^\p{L}+$/u;
      const trimmedValue = this.lastNameValue.trim();
      if (nameRegex.test(trimmedValue) && trimmedValue !== '') {
        this.$refs.lastNameElement.querySelector('.required').style.display = "none";
        this.$refs.lastNameElement.querySelector('input').style.border = "none";
        this.lastNameIsValid = true;
        this.lastNameValue = trimmedValue;
      } else {
        this.$refs.lastNameElement.querySelector('.required').style.display = "block";
        this.$refs.lastNameElement.querySelector('input').style.border = "1px solid red";
        this.lastNameIsValid = false;
      }
      this.validateForm();
    },

    middleNameValid() {
      const nameRegex = /^\p{L}+$/u;
      const trimmedValue = this.middleNameValue.trim();
      if (nameRegex.test(trimmedValue) && trimmedValue !== '') {
        this.$refs.middleNameElement.querySelector('.required').style.display = "none";
        this.$refs.middleNameElement.querySelector('input').style.border = "none";
        this.middleNameIsValid = true;
        this.middleNameValue = trimmedValue;
      } else {
        this.$refs.middleNameElement.querySelector('.required').style.display = "block";
        this.$refs.middleNameElement.querySelector('input').style.border = "1px solid red";
        this.middleNameIsValid = false;
      }
      this.validateForm();
    },

    validTel() {
      if (/^\+380 \d{2} \d{3} \d{2} \d{2}$/.test(this.telValue)) {
        this.telIsValid = true;
        this.$refs.telElement.querySelector('.required').style.display = "none";
        this.$refs.telElement.querySelector('input').style.border = "none";
      } else {
        this.$refs.telElement.querySelector('.required').style.display = "block";
        this.$refs.telElement.querySelector('input').style.border = "1px solid red";
        this.telIsValid = false;
      }
      this.validateForm();
    },

    validEmail() {
      const trimmedValue = this.emailValue.trim();
      if (/\S+@\S+\.\S+/.test(trimmedValue)) {
        this.emailIsValid = true;
        this.$refs.emailElement.querySelector('.required').style.display = "none";
        this.$refs.emailElement.querySelector('input').style.border = "none";
        this.emailValue = trimmedValue;
      } else {
        this.emailIsValid = false;
        this.$refs.emailElement.querySelector('.required').style.display = "block";
        this.$refs.emailElement.querySelector('input').style.border = "1px solid red";
      }
      this.validateForm();
    },

    validateForm() {
      let userData = {};

      if (
        this.firstNameIsValid &&
        this.lastNameIsValid &&
        this.middleNameIsValid &&
        this.telIsValid &&
        this.emailIsValid
      ) {
        userData = {
          valid: true,
          firstNameValue: this.firstNameValue,
          lastNameValue: this.lastNameValue,
          middleNameValue: this.middleNameValue,
          telValue: this.telValue,
          emailValue: this.emailValue
        };
      } else {
        userData = { valid: false };
      }

      this.$emit('update:userDataFieldsIsValid', userData);
    }, 

    telMask() {
      const maskOptions: Inputmask.Options = {
        mask: '+380 99 999 99 99',
        placeholder: '_',
        showMaskOnHover: false,
      };

      Inputmask(maskOptions).mask(this.$refs.telInput);    
    }
  },

  mounted() {
    this.telMask();
  }
};
</script>

<template>
  <div class="UserDataFields">
    <h3>Дані отримувача</h3>

    <div class="field-wrapper" ref="firstNameElement">
      <input
        v-model="firstNameValue"
        @focusout="firstNameValid"
        @input="firstNameValid"
        autocomplete="name"
        placeholder="Имя"
        type="text"
      >
      <img class="valid-icon" v-if="firstNameIsValid" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Введіть коректне ім'я (лише букви).</div>
    </div>

    <div class="field-wrapper" ref="lastNameElement">
      <input
        v-model="lastNameValue"
        @focusout="lastNameValid"
        @input="lastNameValid"
        autocomplete="family-name"
        placeholder="Фамилия"
        type="text"
      >
      <img v-if="lastNameIsValid" class="valid-icon" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Будь ласка, введіть коректне прізвище (лише букви).</div>
    </div>

    <div class="field-wrapper" ref="middleNameElement">
      <input
        v-model="middleNameValue"
        @focusout="middleNameValid"
        @input="middleNameValid"
        autocomplete="additional-name"
        placeholder="Отчество"
        type="text"
      >
      <img v-if="middleNameIsValid" class="valid-icon" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Будь ласка, введіть коректне по-батькові (тільки літери).</div>
    </div>

    <div class="field-wrapper tel-field" ref="telElement">
      <input
        v-model="telValue"
        @focusout="validTel"
        @input="validTel"
        autocomplete="tel"
        placeholder="+380 __ ___ __ __"
        id="tel"
        type="text"
        ref="telInput"
      >
      <img v-if="telIsValid" class="valid-icon" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <img class="tel-field-flag-icon" src="/img/icons/flag-ukraine.svg" alt="Знак валидно">
      <div class="required">Пожалуйста, введите корректный номер телефона.</div>
    </div>

    <div class="field-wrapper" ref="emailElement">
      <input
        v-model="emailValue"
        @focusout="validEmail"
        @input="validEmail"
        autocomplete="email"
        placeholder="Email"
        type="text"
      >
      <img v-if="emailIsValid" class="valid-icon" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <div class="required">Будь ласка, введіть правильну адресу електронної пошти.</div>
    </div> 
  </div>
</template>

<style scoped lang="scss">
.UserDataFields {
  width: 300px;
  max-width: 300px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  h3 {
    color: #fff;
  }

  .required {
    color: red;
    display: none;
  }

  .field-wrapper {
    position: relative;
  }

  .valid-icon {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 11px;
    top: 12px;
  }

  .tel-field {
    input {
      padding-left: 50px;
    }

    .tel-field-flag-icon {
      width: 25px;
      height: 25px;
      position: absolute;
      left: 11px;
      top: 12px;
    }

    .tel-field-flag-icon {
      display: block;
    }
  }
}

@media screen and (max-width: 336px) {
  .UserDataFields {
    width: calc(100% - 30px);
    max-width: calc(100% - 30px);
    min-width: 200px;
  }
}
</style>
