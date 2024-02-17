package main

import (
    "fmt"
)

func main() {
    // Запуск HTTP сервера
    go startServer()

    // Ваш основной код приложения
    fmt.Println("Ваше основное приложение запущено...")
}