<script lang="ts">
	import BackToButton from '../../BackToButton.vue'
	import UserDataFields from './UserDataFields.vue'
	import ChoosingDeliveryServices from './ChoosingDeliveryServices.vue'
	import ChoosingDeliveryPlace from './ChoosingDeliveryPlace.vue'
	import UserAddressDelivery from './UserAddressDelivery.vue'
	import UkrPoshtaOffice from './UkrPoshtaOffice.vue'
	import NovaPoshtaOffice from './NovaPoshtaOffice.vue'
	import NovaPoshtaPostomat from './NovaPoshtaPostomat.vue'
	import ChoosingPaymentMethod from './ChoosingPaymentMethod.vue'
	import { mapActions, mapGetters } from 'vuex'
	import axios from 'axios'
	import { newPostKeyMixin } from '../../../mixins/newPostKeyMixin'

	export default {
		data () {
			return {
				currentTab: 1,

				selectedDeliveryService: "Delivery service nova poshta",
				selectedDeliveryPlace: "Delivery place post office", // default value 
				userData: {},
				selectedPaymentMethod: { methodName: 'Cash on delivery', valid: true },
				adressDeliveryData: {},
				orderUniqueNum: 0
			}
		},

		mixins: [newPostKeyMixin],

		components: {
			BackToButton,
			UserDataFields,
			ChoosingDeliveryServices,
			ChoosingDeliveryPlace,
			UkrPoshtaOffice,
			NovaPoshtaOffice,
			NovaPoshtaPostomat,
			ChoosingPaymentMethod,
			UserAddressDelivery
		},

		computed: {
		    isUserDataComplete() {
		      return this.userData.valid === true;
		    },

			...mapGetters(['CART']),

			selectedDeliveryPlaceType () {
				if (this.selectedDeliveryPlace === "Delivery place post office") {
					return "WarehouseWarehouse" // От моего склада до склада получателя 
				} else {
					return "WarehouseDoors" // От моего склада до дверей получателя
				}
			},

			productWeight() {
			  const totalWeight = this.CART.reduce((acc, product) => acc + parseFloat(product.weight), 0);
			  return totalWeight.toFixed(2); 
			},

			// функция получает размеры товаров а затем получает из данных м3 общий
			totalSize() {
			  // Инициализация суммарной длины, ширины и высоты
			  let totalLength = 0;
			  let totalWidth = 0;
			  let totalHeight = 0;

			  // Суммирование длины, ширины и высоты для каждого товара в корзине
			  this.CART.forEach(product => {
			    totalLength += product.lengthInMillimeters;
			    totalWidth += product.widthInMillimeters;
			    totalHeight += product.heightInMillimeters;
			  });

			  // Рассчет общего объема в кубических миллиметрах
			  let totalVolumeInCubicMillimeters = totalLength * totalWidth * totalHeight;

			  // Преобразование объема в кубических метрах (1 м³ = 1 000 000 000 мм³)
			  let totalVolumeInCubicMeters = totalVolumeInCubicMillimeters / 1000000000;

			  // Преобразование объема в строку с двумя знаками после запятой
			  let formattedTotalVolume = totalVolumeInCubicMeters.toFixed(2).toString();

			  return formattedTotalVolume;
			}, 

			productsTitles() {
			  return this.CART.map(product => product.title+'ШТ:'+product.cart_quantity).join(', ');
			},

			totalSum() {
		      // Вычисление общей суммы на основе данных в хранилище
		      return this.CART.reduce((total, product) => total + product.price * product.cart_quantity, 0)
		    }
		},

		methods: {
			orderUniqueNumGenerate() {
				this.orderUniqueNum = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
			},

			tabSwitching (direction) {
				// Переключаемся на следующий или предыдущий слайд в зависимости от направления
				if (direction === 'forward') {
					this.currentTab += 1;
				} else if (direction === 'backward') {
					this.currentTab -= 1;
				}

				// Если достигли крайних слайдов, циклически переходим на противоположный конец
				if (this.currentTab > 4) {
					this.currentTab = 1;
				} else if (this.currentTab < 1) {
					this.currentTab = 4;
				}

				// Делаем активным текущий слайд
				document.querySelectorAll('.tab').forEach((tab, index) => {
					tab.classList.toggle('tab-active', index + 1 === this.currentTab);
				});
			},

		    checkoutButton () {		    	

		    	if (this.isUserDataComplete) {
					this.$refs.userDataFieldsAlert.style.display = "none"	
		    	} else {
		    		this.$refs.userDataFieldsAlert.style.display = "block"		
		    	}

		    	this.tabSwitching('forward')
		    	this.orderUniqueNumGenerate()
		    	this.сreateInvoice()

		    	// sending in telegram
			    	let dataForTelegram = `
			    		Новый заказ:

			    		Товары:
			    		${this.productsTitles}

			    		Спосіб оплати: ${this.selectedPaymentMethod.methodName}
						Сервіс доставки: ${this.selectedDeliveryService}
						Місто доставки: ${this.selectedDeliveryPlace}		    		
			    	`
			    	// На адрес
			    	if (this.adressDeliveryData.homeAddressValue) { 
			    		dataForTelegram += `
			    		Адресна доставка:
						Адреса будинку: ${this.adressDeliveryData.homeAddressValue}`

						if (this.adressDeliveryData.houseNumberValue) {
							dataForTelegram += `
							Номер будинку: ${this.adressDeliveryData.houseNumberValue}
							`
						}
						
						if (this.adressDeliveryData.apartmentNumberValue) {
							dataForTelegram += `
							Номер квартири: ${this.adressDeliveryData.apartmentNumberValue}
							`
						}
						
						dataForTelegram += `
						Номер поверху: ${this.adressDeliveryData.floorNumberValue}
						Наявність ліфту: ${this.adressDeliveryData.elevator}
						`
			    	}


			    	// Если укр почта 
			    	if (this.adressDeliveryData.indexValue) {
			    		dataForTelegram += `
			    		Укрпошта відділення:
						Індекс укр пошти: ${this.adressDeliveryData.indexValue}
			    		`
			    	}

			    	// Если новая почта
			    	if (this.adressDeliveryData.warehouseSelected) {
			    		dataForTelegram += `
			    		Нова пошта відділення:
						Населений пункт: ${this.adressDeliveryData.localitySelected}
						Відділення: ${this.adressDeliveryData.warehouseSelected}
			    		`
			    	}

			    	// если поштоматновая почта
			    	if (this.adressDeliveryData.postomatValue) {
			    		dataForTelegram += `
			    		Нова пошта поштомат:
						Населений пункт: ${this.adressDeliveryData.localityValue}
						Поштомат: ${this.adressDeliveryData.postomatValue}
						`
			    	}

			    	// Дані отримувача
			    	dataForTelegram += `
			    	Дані отримувача:
					Ім'я: ${this.userData.firstNameValue}
					Прізвище: ${this.userData.lastNameValue}
					По батькові: ${this.userData.middleNameValue}
					Телефон: ${this.userData.telValue}
					Електронна пошта: ${this.userData.emailValue}	

					Загальна сума замовлення: ${this.totalSum}
					`
			    	
			    	this.notificationsInTelegram(dataForTelegram)
		    },

		    async сreateInvoice () {
		    	try {
		    		const novaPoshtaApiKey = this.newPostKey;
					const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
					    apiKey: novaPoshtaApiKey,
					    modelName: 'InternetDocument',
					    calledMethod: 'save',
					    methodProperties: {
					    	
					        Recipient: '', 
					        ContactRecipient: '',
							NewAddress: '1', 
					        Sender: '', 
							ContactSender: '', 
							CityRecipient: this.adressDeliveryData.recipientCity, 
							RecipientAddress: this.adressDeliveryData.recipientAddress, 
							
							// ГОТОВО
							CitySender: 'cf46b713-d9fd-11e9-b48a-005056b24375',  
							VolumeGeneral: this.totalSize, 
							SenderAddress: '1afd1f8e-cf3c-11e9-b0c5-005056b24375', 
							ServiceType: this.selectedDeliveryPlaceType, 
							Weight: this.productWeight, 
							PaymentMethod: 'Cash', 
					        PayerType: 'Recipient', 
					        CargoType: 'Parcel', 
					        Description: this.productsTitles, 
					        SeatsAmount: '1', 
					        SendersPhone: '380638549566', 
					        RecipientsPhone: this.userData.telValue, 
					        Cost: this.totalSum 
					    }
					});


				  if (response.data.success) {
				    console.log('Накладная успешно создана', response.data.data[0]);
				  } else {
				    console.error('Ошибка при создании накладной', response.data.errors);
				  }
				} catch (error) {
				  console.error('Ошибка при выполнении запроса', error);
				}
		    }
		}
	}
</script>

<template>
	<div class="CheckoutPage">
		<h1>Оформлення замовлення</h1>

		<BackToButton></BackToButton>

		<div class="checkout-tabs">

			<!-- Только для определения почтовой компании -->
			<div class="tab-1 tab tab-active">
				<h2 class="tab-title">Крок 1 з 3</h2>

				<!-- Способ оплаты, на карту банка или наложенный платеж -->
				<ChoosingPaymentMethod
					 @update:paymentMethodValid="(data) => { this.selectedPaymentMethod = data }"
				></ChoosingPaymentMethod>

				<ChoosingDeliveryServices 
					@update:selectedDeliveryService="(data) => { this.selectedDeliveryService = data }"
				>
				</ChoosingDeliveryServices>

				<ChoosingDeliveryPlace
					:deliveryService="selectedDeliveryService"
					@update:selectedDeliveryPlaceEvent="(data) => { this.selectedDeliveryPlace = data }"
				></ChoosingDeliveryPlace>

				<div class="tab-buttons">
					<div 
						@click="tabSwitching('forward')"  
						class="next-tab-button"
					>
						<p>Далі</p>
					</div>					
				</div>
			</div>

			<!-- Вывод полей на основе места и сервиса доставки -->
			<div class="tab-2 tab">
				<h2 class="tab-title">Крок 2 з 3</h2>

				<!-- for nova -->
					<NovaPoshtaOffice 
						v-if="selectedDeliveryPlace === 'Delivery place post office' && selectedDeliveryService === 'Delivery service nova poshta'"
						@update:novaPoshtaOfficeValid="(data) => { this.adressDeliveryData = data }"
					>
					</NovaPoshtaOffice>

					<!-- === OR === -->

					<NovaPoshtaPostomat 
						v-if="selectedDeliveryPlace === 'Delivery place postomat' && selectedDeliveryService === 'Delivery service nova poshta'"
						@update:novaPoshtaPostomatValid="(data) => { this.adressDeliveryData = data }"
					>
					</NovaPoshtaPostomat>

					<!-- === OR === -->

				<!-- for ukr -->
					<UkrPoshtaOffice 
						v-if="selectedDeliveryPlace === 'Delivery place post office' && selectedDeliveryService === 'Delivery service ukr poshta'"
						@update:ukrPoshtaOfficeValid="(data) => { this.adressDeliveryData = data }"
					>
					</UkrPoshtaOffice>

					<!-- === OR === -->


				<UserAddressDelivery 
					v-if="selectedDeliveryPlace === 'Delivery place user address'"
					@update:UserAddressDeliveryFieldsAreValid="(data) => { this.adressDeliveryData = data }"
				>
				</UserAddressDelivery>

				<div class="tab-buttons">
					<div class="next-tab-button" @click="tabSwitching('backward')">
						<p>Назад</p>
					</div>
					<div 
						@click="this.adressDeliveryData.valid ? tabSwitching('forward') : null" 
						:class="this.adressDeliveryData.valid ? 'next-tab-button checkout-button' : 'checkout-button next-tab-button next-tab-button-not-active'"
					>
						<p>Далі</p>
					</div>					
				</div>
			</div>

			<div class="tab-3 tab">
				<h2 class="tab-title">Крок 3 з 3</h2>

				<UserDataFields @update:userDataFieldsIsValid="(data) => { this.userData = data }">
				</UserDataFields>

				<div ref="userDataFieldsAlert" class="user-data-fields-alert">
					<p>Заповніть усі поля коректно!</p>
				</div>

				<div class="tab-buttons">
					<div class="next-tab-button" @click="tabSwitching('backward')">
						<p>Назад</p>
					</div>
					<div 
						@click="this.checkoutButton()" 
						:class="isUserDataComplete ? 'next-tab-button checkout-button' : 'checkout-button next-tab-button next-tab-button-not-active'"
					>
						<p>Оформити</p>
					</div>
				</div>
			</div>

			<div class="tab-4 tab">
				<div class="order-data">
					<img v-lazy="{src: '/img/icons/checkbox-circle-green.svg'}" alt="">

					<h2>Дані замовлення</h2>

					<div class="order-data__text">
						<p>Номер замовлення: {{ orderUniqueNum }}</p>
						<br>
						<!-- <p>Номер накладної: *тип номер*</p> -->
						<br>
						<p>Спосіб оплати: {{ this.selectedPaymentMethod.methodName }}</p>
						<p>Сервіс доставки: {{ this.selectedDeliveryService }}</p>
						<p>Місто доставки: {{ this.selectedDeliveryPlace }}</p>
						<br>

						<div class="adress-delivery">
							<div v-if="this.adressDeliveryData.homeAddressValue"> <!-- тут переделать на type -->
								<h3>Адресна доставка:</h3>
								<p>Адреса будинку: {{ this.adressDeliveryData.homeAddressValue }}</p>
								<p v-if="this.adressDeliveryData.houseNumberValue">
									Номер будинку: {{ this.adressDeliveryData.houseNumberValue }}
								</p>
								<p v-if="this.adressDeliveryData.apartmentNumberValue">
									Номер квартири: {{ this.adressDeliveryData.apartmentNumberValue }}
								</p>
								<p>Номер поверху: {{ this.adressDeliveryData.floorNumberValue }}</p>
								<p>Наявність ліфту: {{ this.adressDeliveryData.elevator }}</p>
							</div>

							<!-- Если укр почта -->
							<div v-if="this.adressDeliveryData.indexValue">
								<h3>Укрпошта відділення:</h3>
								<p>Індекс укр пошти: {{ this.adressDeliveryData.indexValue }}</p>
							</div>

							<!-- Если новая почта -->
							<div v-if="this.adressDeliveryData.warehouseSelected">
								<h3>Нова пошта відділення:</h3>
								<p>Населений пункт: {{ this.adressDeliveryData.localitySelected }}</p>
								<p>Відділення: {{ this.adressDeliveryData.warehouseSelected }}</p>
							</div>

							<!-- если поштомат -->
							<div v-if="this.adressDeliveryData.postomatValue">
								<h3>Нова пошта поштомат:</h3>
								<p>Населений пункт: {{ this.adressDeliveryData.localityValue }}</p>
								<p>Поштомат: {{ this.adressDeliveryData.postomatValue }}</p>
							</div>
						</div>

						<br>
						<h3>Дані отримувача:</h3>
						<p>Ім'я: {{ this.userData.firstNameValue }}</p>
						<p>Прізвище: {{ this.userData.lastNameValue }}</p>
						<p>По батькові: {{ this.userData.middleNameValue }}</p>
						<p>Телефон: {{ this.userData.telValue }}</p>
						<p>Електронна пошта: {{ this.userData.emailValue }}</p>	

						<br>
						<p>Замовлені товари: </p>		
						<p v-for="product in CART">- {{ product.title }}: {{product.price}} грн | ШТ: {{product.cart_quantity}}</p>	

						<br>
						<p>Загальна сума замовлення: ${{ totalSum }}</p>		
					</div>

					<div class="tab-buttons">
						<router-link to="/" class="next-tab-button" @click="tabSwitching('forward')">
							<p>Продовжити покупки</p>
						</router-link> 
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.CheckoutPage {
	user-select: none;
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 0px 15px 45px 15px;
	align-items: center;
	color: #fff;

	h1 {
		font-size: 25px;
		margin-bottom: 10px;
		text-transform: uppercase;
		text-align: center;
		margin-top: 70px;
	}

	.checkout-tabs {
		.tab {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 30px;
			display: none;

			.user-data-fields-alert {
				display: none;
				color: red;
				font-weight: bold;
			}

			.tab-title {
				color: #005eff;
				position: relative;
				width: 200px;
				text-align: center;

				&::before,
				&::after {
				  content: "";
				  display: block;
				  height: 2px; 
				  width: 100px; 
				  background-color: #005eff; 
				  position: absolute;
				  top: 50%; 
				}

				&::before {
				  left: -50px; 
				}

				&::after {
				  right: -50px; 
				}
			}

			.tab-buttons {
				display: flex;
				gap: 15px;
			}

			.next-tab-button {
				border-radius: 1000px;
				border: 1px solid #005eff;
				display: flex;
				flex-direction: row;
				align-content: center;
				align-items: center;
				gap: 10px;
				padding: 7px 20px;
				user-select: none;
				cursor: pointer;
				width: max-content;
				position: relative;
				background: #005eff;

				img{
					width: 20px;
				}

				&:hover {
					transition: all 1s;
					background: #005eff;
				}

				p {
					color: #fff;
				}
			}

			.checkout-button {
				background: #005eff;
			}

			.next-tab-button-not-active {
				opacity: 0.5;
				border: 1px solid gray;
				background: #000;

				&:hover {
					background: #000;
				}

				p {
					color: gray;
				}
			}

			.order-data {
				display: flex;
				flex-direction: column;
			    align-content: center;
			    align-items: center;
			    gap: 20px;
			    background: rgb(19,19,19);
				background: linear-gradient(306deg, rgba(19,19,19,1) 0%, rgba(0,0,0,1) 49%, rgba(34,34,34,1) 100%);
			    padding: 30px 15px;
			    border-radius: 15px;

				h2 {
					position: relative;
					width: 200px;
					text-align: center;
				}

				img {
					width: 100px;
				}

				.order-data__text {
					width: 100%;

					p {
						text-align: left;
					}
				}
			}
		}

		.tab-active {
			display: flex;
		}
	}
}

@media screen and (max-width: 336px) {
	.CheckoutPage {
		align-items: unset;
		
		h1 {
			margin-top: 100px;
		}
		.checkout-tabs {
			.tab {
				.tab-title {
					width: 90vw;

					&::before,
					&::after {
					  display: none;
					}
				}
			}
		}
	}
}
</style>