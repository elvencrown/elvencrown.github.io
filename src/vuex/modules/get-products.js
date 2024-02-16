import axios from 'axios';

const getProducts = {
  state: {
    products: [],
  },

  mutations: {
    UPDATE_PRODUCTS(state, payload) {
      state.products = payload;
    },
  },

  actions: {
    GET_PRODUCTS({ commit }, payload) {
      const categoryId = payload ? payload.categoryId || null : null;
      const subcategoryId = payload ? payload.subcategoryId || null : null;

      let url = 'http://192.168.3.140:3000/products';

      // Если передан categoryId, добавляем его в запрос
      if (categoryId !== null) {
        url += `?categoryId=${categoryId}`;
      }

      // Если передан subcategoryId, добавляем его в запрос
      if (subcategoryId !== null) {
        url += subcategoryId === null ? '' : `&subcategoryId=${subcategoryId}`;
      }

      return axios.get(url)
        .then((response) => {
          commit('UPDATE_PRODUCTS', response.data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    },
  },

  getters: {
    PRODUCTS(state) {
      return state.products;
    },
  },
};

export default getProducts;
