import { createApp } from 'vue'
import './style.css' 
import axios from 'axios'
import store from './vuex/vuex' 
import router from './router/router'
import VueAxios from 'vue-axios'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'

import notificationsInTelegram from './mixins/notifications-in-telegram.js'

const app = createApp(App)

app
.use(VueAxios, axios) 
.use(store) 
.use(router)
.use(VueLazyload, {
  preLoad: 0,
  error: '/img/placeholders/placeholder-error.svg',
  loading: '/img/placeholders/placeholder.svg',
  attempt: 1,
  observer: true,
  observerOptions: {
    // Обработка ошибок
    onError(error, vnode) {
      console.error('Lazyload error:', error);
      console.error('Image vnode:', vnode);
    },
  }
})
.mixin(notificationsInTelegram)
.mount('#app')
