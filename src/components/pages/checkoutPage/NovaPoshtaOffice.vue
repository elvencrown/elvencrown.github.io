<script lang="ts">

import axios from 'axios'
import { newPostKeyMixin } from '../../../mixins/newPostKeyMixin'

export default {
  data() {
    return {
      localityValue: '',
      warehouseSelected: '',
      localitySelected: '',
      citiesListData: [],
      warehouseListData: [],
      recipientAddress: '',
      recipientCity: '',
      dataLoading: false,
      localityValid: false
    }
  },

  mixins: [newPostKeyMixin],

  methods: {

    getCitiesList () {
      // сбрасываем при повторном поиске 
      this.warehouseSelected = ''
      this.citiesListData = []
      this.warehouseListData = []  // for hidden ul warehouse List
      this.dataLoading = true

      const apiKey = this.newPostKey
      const url = 'https://api.novaposhta.ua/v2.0/json/'

      let data = {
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'getCities',
      }

      axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.data)
          .then(data => {

            let filteredCities = data.data.filter(city =>
              (
                city.Description.toLowerCase().includes(this.localityValue.toLowerCase()) 
                || 
                city.DescriptionRu.toLowerCase().includes(this.localityValue.toLowerCase())
              ) 
              && city.Ref
            )

            if (filteredCities.length === 0) {
              this.$refs.requiredSearchNoResults.style.display = "block"
            } else {
              this.$refs.requiredSearchNoResults.style.display = "none"
            }

            this.citiesListData = filteredCities
            this.dataLoading = false
            this.localityValid = false
          })
          .catch(error => console.error('Помилка при отриманні даних: ', error))
    },

    selectCity (city) {
      this.localityValue = city.Description
      this.citiesListData = []
      this.getWarehousesList(city)
      this.localityValid = false
      this.validateForm()
      this.recipientAddress = city.Ref // Адрес
      this.recipientCity = city.Area || city.AreaRu // Город 
    },

    getWarehousesList(city) {
        this.citiesListData = [] // for hidden ul cities List
        this.warehouseListData = []
        this.dataLoading = true
        const apiKey = this.newPostKey
        const url = 'https://api.novaposhta.ua/v2.0/json/'

        let data = {
          apiKey: apiKey,
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityRef: city.Ref,
          },
        }

        axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.data)
          .then(data => {
              this.warehouseListData = []
              
              if (data.data.length === 0) {
                // Если список отделений пуст, выводим сообщение об ошибке
                this.$refs.requiredSearchNoResults.style.display = "block";
              } else if (data.data.length === 1) {
                data.data.forEach(warehouse => {
                  this.selectWarehouse(warehouse)
                })
              } else {
                this.warehouseListData = data.data
              }
              this.dataLoading = false
              this.localityValid = false
          })
        .catch(error => console.error('Помилка при отриманні даних:', error))
    },

    validateForm() {
      let data = {}

      if (this.localityValid) {
        data = {
          valid: true,
          localitySelected: this.localitySelected,
          warehouseSelected: this.warehouseSelected,
          recipientAddress: this.recipientAddress
        }
      } else {
        data = { valid: false }
      }

      this.$emit('update:novaPoshtaOfficeValid', data)
    },

    selectWarehouse(warehouse) {
      // Выбираем элемент
      this.warehouseSelected = warehouse.Description

      this.localitySelected = this.localityValue

      this.warehouseListData = []

      this.localityValid = true
      this.validateForm()
    },

    cleanSearchInput () {
      this.localityValue = ''
      this.warehouseSelected = ''
      this.localitySelected = ''
      this.citiesListData = []
      this.warehouseListData = []
      this.$refs.requiredSearchNoResults.style.display = "none"
      this.localityValid = false
      this.validateForm()
    }, 

    inputFocusout () {
      if (!this.localityValue) {
        this.$refs.requiredFillInTheField.style.display = "block"
        this.localityValid = false
        this.validateForm()
      } else {
        this.$refs.requiredFillInTheField.style.display = "none"
        this.validateForm()
      }
    }
  }
};
</script>

<template>
  <div class="NovaPoshtaOffice">
    <h3>Знайдіть ваш пункт видачі</h3>

    <div class="field-wrapper" ref="localityElement" >
      <input 
        placeholder="Назва міста" 
        type="text" 
        v-model="localityValue"
        @keyup.enter="getCitiesList"
        @focusout="inputFocusout"
        @input="inputFocusout"
        :class="{ 'input-if-open-ul': warehouseListData.length > 0 || citiesListData.length > 0, 'input-if-all-selected': warehouseSelected && localitySelected }"
      >
      <img class="valid-icon" v-if="warehouseSelected" src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <img class="search-button-icon" v-if="localityValue" src="/img/search.svg" alt="Search button" @click="getCitiesList">
      <img class="clean-icon" v-if="localityValue" @click="cleanSearchInput()" src="/img/close.svg" alt="Search button">
      <div class="required" ref='requiredFillInTheField'>Будь ласка, заповніть поле пошуку.</div>
    </div>

    <p class="required" ref="requiredSearchNoResults">Пошук не дав результатів, заповніть назву населеного пункту більш лаконічно та правильно, Українською. Якщо ви впевнені що данні введено правильно, то це значіть що в цьому населеному пункті немає відділень, виберіть інший.</p>

    <p class="required" ref="requiredSearchNoResults" style="display: none;">У обранному населеному пункті немає відділень, виберіть інший.</p>

    <ul ref="citiesList" v-if="citiesListData.length > 0">
      <li v-for="city in citiesListData" :key="city.Ref" @click="selectCity(city)">{{ city.Description }} / {{ city.DescriptionRu }}</li>
    </ul>

    <div class="warehouse-selected" v-if="warehouseSelected">
      <img src="/img/icons/checkbox-circle-green.svg" alt="Знак валидно">
      <p>{{ warehouseSelected }}</p>
    </div>

    <p v-if="dataLoading">Searching...</p>

    <ul ref="warehousesList" v-if="warehouseListData.length > 0">
      <li v-for="warehouse in warehouseListData" :key="warehouse.SiteKey" @click="selectWarehouse(warehouse)">
        {{ warehouse.Description }} / {{ warehouse.DescriptionRu }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.NovaPoshtaOffice {
    display: flex;
    gap: 15px;
    flex-direction: column;
    color: #fff;
    width: 310px;
    max-width: 310px;
    align-items: center;

    h3 {
      color: #fff;
    }

    .warehouse-selected {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 15px;
      width: 310px;
      max-width: 310px;
      padding: 10px;

      img {
        width: 25px;
        height: 25px;
      }
    }

    .required {
      display: none;
      color: red;
    }

    .valid-icon {
      width: 25px;
      height: 25px;
      position: absolute;
      left: 11px;
      top: 12px;
    }

    .field-wrapper {
      position: relative;
      width: auto;
      width: 310px;
      max-width: 310px;

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

@media screen and (max-width: 355px) {
  .NovaPoshtaOffice {
    width: calc(100% - 30px);
    max-width: calc(100% - 30px);
    min-width: 200px;

    .warehouse-selected {
      width:  calc(100% - 30px);
      max-width:  calc(100% - 30px);
      min-width: 200px;
    }

    .field-wrapper {
      width:  calc(100% - 30px);
      max-width:  calc(100% - 30px);
      min-width: 200px;
    }

    ul {
      width:  calc(100% - 30px);
      max-width:  calc(100% - 30px);
      min-width: 200px;
    }
  }
}
</style>