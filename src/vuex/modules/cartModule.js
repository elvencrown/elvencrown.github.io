const cartModule = {
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART_PRODUCT(state, product) {
      const existingProduct = state.cart.find(item => item.id.toString() === product.id.toString());
      if (existingProduct) {
        existingProduct.cart_quantity++;
        return;
      }

      product['cart_quantity'] = 1;
      state.cart.push(product);
    },

    REMOVE_PRODUCT_IN_CART(state, product) {
      const newArray = state.cart.filter(item => item.id.toString() !== product.id.toString());
      state.cart = [...newArray];
    },

    UPDATE_QUANTITY_IN_CART(state, { product, newQuantity }) {
      const existingProduct = state.cart.find(item => item.id.toString() === product.id.toString());
      if (existingProduct) {
        existingProduct.cart_quantity = newQuantity;
      }
    },
  },
  actions: {
    ACTION_REMOVE_PRODUCT_IN_CART({ commit }, product) {
      commit('REMOVE_PRODUCT_IN_CART', product);
    },

    ACTION_ADD_TO_CART({ commit }, product) {
      commit('ADD_TO_CART_PRODUCT', product);
    },

    ACTION_UPDATE_QUANTITY_IN_CART({ commit }, { product, newQuantity }) {
      commit('UPDATE_QUANTITY_IN_CART', { product, newQuantity });
    },
  },
  getters: {
    CART(state) {
      return state.cart;
    },
  },
};

export default cartModule;
