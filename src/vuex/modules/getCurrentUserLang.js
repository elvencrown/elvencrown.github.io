import axios from 'axios';

let getCurrentUserLang = {
  state: {
    lang: 'en'
  },

  mutations: {
    UPDATE_LANG: (state, payload) => {
      state.lang = payload;
    },
  },

  actions: {
    async SET_LANG({ commit }, payload) {
      try {
        // Ваш запрос к базе данных для получения языка пользователя
        const response = await axios.get('http://192.168.3.140:3000/users?id=1');

        // Извлекаем язык из ответа
        let userLang = response.data.lang;

        // Если язык пользователя не определен, используем язык браузера
        userLang = userLang || navigator.language || navigator.userLanguage;

        // Приведение формата к общему виду (например, преобразование 'uk-UA' в 'uk')
        userLang = userLang.split('-')[0];

        // Обновляем состояние языка
        commit('UPDATE_LANG', userLang);
      } catch (error) {
        console.error('Ошибка при получении языка пользователя:', error);
      }
    },
  },

  getters: {
    GET_LANG(state) {
      return state.lang;
    },
  }
}; 

export default getCurrentUserLang;
