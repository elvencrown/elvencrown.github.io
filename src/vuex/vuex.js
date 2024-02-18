import Vuex from 'vuex'
import cartModule from './modules/cartModule'
import headerModule from './modules/headerModule'
import getProducts from './modules/get-products'
import getInterfaceData from './modules/getInterfaceData'
import getCurrentUserLang from './modules/getCurrentUserLang'

const store = Vuex.createStore({

  modules: {
    cart: cartModule,
    header: headerModule,
    products: getProducts,
    interface: getInterfaceData,
    lang: getCurrentUserLang
  },

  plugins: [Vuex.createLogger()]
})

export default store;