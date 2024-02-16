import axios from 'axios'

export default {
  
  methods: {

    notificationsInTelegram(text) {
     
      function createMarkdownMessage(formData) {
        let markdownMessage = '<b>Событие на сайте:</b>\n';

        for (let key in formData) {
          if (Array.isArray(formData[key])) {
            // Если значение является массивом (например, продукты)
            markdownMessage += `\n<b>${key}:</b>\n`;
            formData[key].forEach(item => {
              markdownMessage += `- ${createMarkdownMessage(item)}\n`;
            });
          } else if (typeof formData[key] === 'object') {
            // Если значение является объектом (например, продукт)
            markdownMessage += createMarkdownMessage(formData[key]);
          } else {
            // В противном случае добавляем как обычное поле
            markdownMessage += `<b>${key}:</b> ${formData[key]}\n`;
          }
        }

        return markdownMessage;
      }

      function analitycsEc () {

        // Уведомления в тг о посещении сайта пользователем

        // собираем данные
          let formData = {'msg': text};
          let token = "6524213767:AAG5wpR_5xscAMnLF6O3NJAZqeGhdmz1iHU";
          let chat_id = "-1002044858106";

            try {

              axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
                chat_id: chat_id,
                parse_mode: 'html',
                text: createMarkdownMessage(formData)
              });
            } catch (error) {
              console.error('Ошибка при отправке данных:', error);
            }    
      }

      analitycsEc()
    }
  }
};