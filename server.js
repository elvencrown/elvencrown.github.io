const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

// Обслуживание статических файлов из каталога 'dist'
app.use('/', serveStatic(path.join(__dirname, '/dist')));

// Обработка любого необработанного маршрута
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

// Настройка порта для прослушивания
const port = process.env.PORT || 5000;
app.listen(port);

console.log('Server started on port ' + port);
