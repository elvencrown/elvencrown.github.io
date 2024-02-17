package main

import (
	"fmt"
	"net/http"
	"os"
)

func startServer() {
	// Получаем порт из переменной среды PORT.
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // По умолчанию используем порт 8080.
	}

	// Регистрируем обработчик запросов.
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Привет от сервера на Heroku!") // Отправляем ответ на запрос.
	})

	// Запускаем сервер на указанном порту.
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		fmt.Println("Ошибка запуска сервера:", err)
	}
}
