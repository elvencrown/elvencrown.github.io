<script lang="ts">

/*
Компонент возвращает на верх какое то из 3х значений:
1. Delivery place post office
2. Delivery place user address
3. Delivery place postomat

Какой именно сервис почты - отображается в верхнем компоненте.
*/

export default {
    data() {
        return {
            selectedPlace: "Delivery place post office"
        }
    },

    props: {
      deliveryService: {
        type: String
      }
    },

    methods: {
        handlePlaceClick(placeId) {
            this.selectedPlace = placeId
            this.$emit('update:selectedDeliveryPlaceEvent', this.selectedPlace)
        },

        serviceLogoUrl () {
          if (this.deliveryService === 'Delivery service nova poshta') {
            return "/img/icons/Nova_Poshta.svg"
          } else {
            return "/img/icons/Ukrposhta-ua-icon.svg"
          }
        }
    }
};
</script>

<template>
    <div class="ChoosingDeliveryPlace">
        <h3>Выберіть куди доставляти</h3>
        <div class="list">
            <div @click="handlePlaceClick('Delivery place post office')" :class="{ 'selected-place': selectedPlace === 'Delivery place post office' }" class="delivery-place" data-index-selected="yes">
                <img class="delivery-place-logo" v-lazy="{src: serviceLogoUrl() }" alt="Нова пошта" />
                <p>У відділення</p>
                <img v-if="(selectedPlace === 'Delivery place post office')" class="valid-icon" v-lazy="{src: '/img/icons/checkbox-circle-green.svg'}" alt="Иконка валидации" />
                <img v-else class="valid-icon-empty" v-lazy="{src: '/img/icons/circle-empty.svg'}" alt="Иконка не валидно" />
            </div>

            <div @click="handlePlaceClick('Delivery place user address')" :class="{ 'selected-place': selectedPlace === 'Delivery place user address' }" class="delivery-place" id="Delivery place user address">
                <img class="delivery-place-logo" v-lazy="{src: serviceLogoUrl() }" alt="УкрПошта" />
                <p>
                    <span>На вашу адресу</span>
                </p>
                <img v-if="(selectedPlace === 'Delivery place user address')" class="valid-icon" v-lazy="{src: '/img/icons/checkbox-circle-green.svg'}" alt="Иконка валидации" />
                <img v-else class="valid-icon-empty" v-lazy="{src: '/img/icons/circle-empty.svg'}" alt="Иконка не валидно" />
            </div>

            <div v-if="deliveryService === 'Delivery service nova poshta'" @click="handlePlaceClick('Delivery place postomat')" :class="{ 'selected-place': selectedPlace === 'Delivery place postomat' }" class="delivery-place" id="Delivery place postomat">
                <img class="delivery-place-logo" v-lazy="{src: '/img/icons/Nova_Poshta.svg'}" alt="УкрПошта" />
                <p>
                    <span>У поштомат</span>
                </p>
                <img v-if="(selectedPlace === 'Delivery place postomat')" class="valid-icon" v-lazy="{src: '/img/icons/checkbox-circle-green.svg'}" alt="Иконка валидации" />
                <img v-else class="valid-icon-empty" v-lazy="{src: '/img/icons/circle-empty.svg'}" alt="Иконка не валидно" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.ChoosingDeliveryPlace {
    display: flex;
    flex-direction: column;
    gap: 15px;
    user-select: none;

    .list {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .delivery-place {
            opacity: 0.7;
            display: flex;
            flex-direction: row;
            align-items: center;
            cursor: pointer;
            background: #1a1a1a7a;
            padding: 10px 50px 10px 10px;
            border-radius: 7px;
            position: relative;

            .valid-icon,
            .valid-icon-empty {
                width: 25px;
                height: 25px;
                position: absolute;
                right: 15px;
                top: calc(50% - 12.5px);
            }

            &:hover {
                background: #0e0e0e;
            }

            .delivery-place-logo {
                width: 25px;
                height: 25px;
                margin-right: 10px;
            }

            p {
                font-size: 15px;
            }
        }

        .selected-place {
            border: 1px solid green;
            /* Зеленая рамка для выбранной службы */
            opacity: 1;
        }
    }
}
</style>