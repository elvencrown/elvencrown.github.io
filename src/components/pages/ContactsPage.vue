<script lang="ts">
	export default {
		data() {
		  return {
		  };
		},
	}
</script>

<template>
	<div class="ContactsPage">
		<h1>Контакти</h1>

		<div class="social-icons">
            <h3>Напишіть нам у будь яку з соц мереж щоб поставити запитання</h3>

            <div class="social-icons-list">
              <a href="https://t.me/manager0070" target="_blank">
              	<img v-lazy="{src: '/img/icons/social/telegram_icon.svg'}" alt="Телеграм">
              </a>
              <a href="https://wa.me/380638549566" target="_blank">
              	<img  v-lazy="{src: '/img/icons/social/whatsapp_icon.svg'}" alt="Вотсап">
              </a>        
              <a href="viber://chat?number=%2B380636717262" target="_blank">
              	<img  v-lazy="{src: '/img/icons/social/viber_icon.svg'}" alt="Вайбер">
              </a>   
              <a href="https://www.instagram.com/direct/t/17847989355061263/" target="_blank">
              	<img v-lazy="{src: '/img/icons/social/instagram_icon.svg'}" alt="Інстаграм">
              </a>     
            </div>
        </div>
	</div>
</template>

<style scoped lang="scss">

	.ContactsPage {
		color: #fff;
		padding: 50px 15px;

		h1 {
			font-size: 25px;
			margin-bottom: 30px;
			text-transform: uppercase;
			text-align: center;
		}

		.social-icons {
			padding: 0px 0 60px 0;
			display: flex;
			flex-direction: column;
			gap: 15px;
			justify-content: center;

			h3 {
				text-align: center;
				color: #fff;
				margin-bottom: 30px;
				font-size: 20px;
			}

			.social-icons-list {
				display: flex;
				flex-wrap: wrap;
				gap: 25px;
				justify-content: center;

				img {
					width: 60px;
				}			
			}
		}
	}

</style>