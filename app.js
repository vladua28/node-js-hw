// ДЗ
// Створіть папку
// В тій папці створіть 5 папок і 5 файлів
// І за допомогою модулю fs виведіть в консоль, чи це папка чи це файл
// FILE: {fileName}
// FOLDER: {folderName}

const creator = require('./creator');
const checker = require('./checker');

creator();

setTimeout(() => {
    checker();
}, 3000);