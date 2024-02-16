<script lang="ts">
import axios from 'axios'
import { newPostKeyMixin } from '../../../mixins/newPostKeyMixin'

export default {
  data() {
    return {
      postomatValue: '',
      postomatSelected: '',
      citySelected: '',
      postomatsListData: [],
      dataLoading: false,
      postomatValid: false
    }
  },

  mixins: [newPostKeyMixin],

  methods: {
    async searchPostomats () {
      this.resetSearch();
      this.$refs.requiredSearchNoResults.style.display = "none"

      const apiKey = this.newPostKey;
      const url = 'https://api.novaposhta.ua/v2.0/json/Address/general';
      const data = {
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          Language: 'ua',
          CityName: this.postomatValue,
          WarehouseType: 'Postomat',
        },
      };

      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
            
        if (response.data.data.length === 0) {
          this.$refs.requiredSearchNoResults.style.display = "block"
        } else {
          this.$refs.requiredSearchNoResults.style.display = "none"
        }
        this.postomatsListData = response.data.data

        this.dataLoading = false;
      } catch (error) {
        console.error('Помилка при отриманні даних: ', error);
      }
    },

    selectPostomat (postomat) {
      this.postomatValue = postomat.Description
      this.postomatsListData = []
      this.postomatSelected = postomat.Description
      this.citySelected = postomat.CityDescription
      this.postomatValid = true
      this.validateForm()
    },

    validateForm() {
      let data = {}

      if (this.postomatValid) {
        data = {
          valid: true,
          postomatValue: this.postomatSelected,
          localityValue: this.citySelected
        }
      } else {
        data = { valid: false }
      }

      this.$emit('update:novaPoshtaPostomatValid', data)
    },

    cleanSearchInput () {
      this.postomatValue = '';
      this.postomatSelected = '';
      this.postomatsListData = [];
      this.$refs.requiredSearchNoResults.style.display = "none"
      this.validateForm()
    },

    inputFocusout () {
      if (!this.postomatValue) {
        this.$refs.requiredFillInTheField.style.display = "block"
      } else {
        this.$refs.requiredFillInTheField.style.display = "none"
      }
      this.validateForm()
    },

    resetSearch() {
      this.postomatSelected = '';
      this.postomatsListData = [];
      this.dataLoading = true;
      this.validateForm()
    }
  }
};
</script>

<template>
  <div class="NovaPoshtaPostomat">
    <h3>Знайдіть ваш поштомат</h3>

    <div class="field-wrapper" ref="postomatElement">
      <input 
        placeholder="Назва міста" 
        type="text" 
        v-model="postomatValue"
        @keyup.enter="searchPostomats"
        @input="inputFocusout"
        @focusout="inputFocusout"
        :class="{ 'input-if-open-ul': postomatsListData.length > 0, 'input-if-all-selected': postomatSelected}"
      >
      <img class="valid-icon" v-if="postomatSelected" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <img class="search-button-icon" src="/img/search.svg" alt="Search button" @click="searchPostomats">
      <img class="clean-icon" v-if="postomatValue" @click="cleanSearchInput()" src="/img/close.svg" alt="Search button">
      <div class="required" ref='requiredFillInTheField'>Будь ласка, заповніть поле пошуку.</div>
    </div>

    <p class="required" ref="requiredSearchNoResults">Пошук не дав результатів, заповніть назву населеного пункту більш лаконічно та правильно, Українською. Якщо ви впевнені що данні введено правильно, то це значіть що в цьому населеному пункті немає поштоматів, виберіть інший.</p>

    <p v-if="dataLoading">Searching...</p>
    
    <ul ref="postomatsList" v-if="postomatsListData.length > 0">
      <li v-for="postomat in postomatsListData" :key="postomat.SiteKey" @click="selectPostomat(postomat)">{{ postomat.Description }}</li>
    </ul>    
  </div>
</template>

<style scoped lang="scss">
.NovaPoshtaPostomat {
    display: flex;
    gap: 15px;
    flex-direction: column;
    color: #fff;
    max-width: 310px;
    min-width: 280px;

    h3 {
      color: #fff;
    }

    .required {
      display: none;
      color: red;
    }

    .field-wrapper {
      position: relative;
      width: auto;
      max-width: 310px;
      min-width: 280px;

      .valid-icon {
        width: 25px;
        height: 25px;
        position: absolute;
        left: 11px;
        top: 12px;
      }

      .search-button-icon {
        width: 25px;
        height: 25px;
        position: absolute;
        right: 11px;
        top: 12px;

        &:hover {
          transition: transform .1s ease-in-out;
          cursor: pointer;
          width: 30px;
          height: 30px;
        }
      }

      .clean-icon {
        width: 25px;
        height: 25px;
        position: absolute;
        right: 44px;
        top: 12px;

        &:hover {
          cursor: pointer;
          transition: transform .1s ease-in-out;
          width: 30px;
          height: 30px;
        }
      }

      input {
        padding-right: 84px;
        width: 100%;
      }
      input.input-if-open-ul{
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      input.input-if-all-selected {
        padding-left: 50px;
      }
    }

    ul {
      border-radius: 0 0 15px 15px;
      cursor: pointer;
      width: 100%;
      max-height: 30vh;
      height: max-content;
      overflow-y: scroll;
      overflow-x: hidden;
      background: #141414;
      margin-top: -14px;

      &::-webkit-scrollbar { 
        width: 15px;
        background-color: rgb(8 8 8);
        border-radius: 0 0 15px 0;
      }

      &::-webkit-scrollbar-thumb { 
        background-color: blue;
        border-radius: 1000px;
      }

      li {
        padding: 10px 15px;
        border-bottom: 1px solid #363636;

        &:last-child {
          border-bottom: none;
        }
      }
    }
}
</style>