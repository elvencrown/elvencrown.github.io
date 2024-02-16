<script lang="ts">
export default {
  data() {
    return {
      selectedService: "Delivery service nova poshta"
    }
  },

  methods: {
    handleServiceClick(serviceId) {
      this.selectedService = serviceId
      this.$emit('update:selectedDeliveryService', this.selectedService)
    }
  }
};
</script>

<template>
  <div class="ChoosingDeliveryServices">
    <h3>Оберіть службу доставки</h3>

    <div class="list">
      <div
        @click="handleServiceClick('Delivery service nova poshta')"
        :class="{ 'selected-service': selectedService === 'Delivery service nova poshta' }"
        class="delivery-service"
        data-index-selected="yes"
      >
        <img
          class="delivery-service-logo"
          v-lazy="{src: '/img/icons/Nova_Poshta.svg'}"
          alt="Нова пошта"
        />
        <p>Нова Пошта</p>
        <img
          v-if="(selectedService === 'Delivery service nova poshta')"
          class="valid-icon"
          v-lazy="{src: '/img/icons/checkbox-circle-green.svg'}"
          alt="Иконка валидации"
        />
        <img
          v-else
          class="valid-icon-empty"
          v-lazy="{src: '/img/icons/circle-empty.svg'}"
          alt="Иконка не валидно"
        />
      </div>

      <div
        @click="handleServiceClick('Delivery service ukr poshta')"
        :class="{ 'selected-service': selectedService === 'Delivery service ukr poshta' }"
        class="delivery-service delivery-service-ukr"
      >
        <img
          class="delivery-service-logo"
          v-lazy="{src: '/img/icons/Ukrposhta-ua-icon.svg'}"
          alt="УкрПошта"
        />
        <p>
          <span>Укр Пошта</span
          ><span class="desc">Не рекомендуємо</span>
        </p>
        <img
          v-if="(selectedService === 'Delivery service ukr poshta')"
          class="valid-icon"
          v-lazy="{src: '/img/icons/checkbox-circle-green.svg'}"
          alt="Иконка валидации"
        />
        <img
          v-else
          class="valid-icon-empty"
          v-lazy="{src: '/img/icons/circle-empty.svg'}"
          alt="Иконка не валидно"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ChoosingDeliveryServices {
	display: flex;
	flex-direction: column;
	gap: 15px;
	user-select: none;

	.list {
		display: flex;
	    flex-direction: column;
	    gap: 15px;

	    .delivery-service-ukr {
			p {
				display: flex;
				flex-direction: column;

				.desc {
					font-size: 10px;
				}						
			}
		}

		.delivery-service {
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

			.delivery-service-logo {
				width: 25px;
				height: 25px;
				margin-right: 10px;
			}

			p {
				font-size: 15px;
			}
		}

	    .selected-service {
		  border: 1px solid green; /* Зеленая рамка для выбранной службы */
		  opacity: 1;
		}
	}
}
</style>