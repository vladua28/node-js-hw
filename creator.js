const fs = require('fs');
const path = require('path');

const mainFolderPath = './mainFolder';

const creator = () => {
    fs.mkdir(mainFolderPath, {recursive: true},(err) => {
        if (err) {
            console.error(err);
            throw new Error();
        } else {
            console.log('Папка "mainFolder" успішно створена.');

            for (let i = 1; i <= 5; i++) {
                const childFolderName = `childFolder${i}`;
                const childFolderPath = path.join(mainFolderPath, childFolderName);

                const childFileName = `childFile${i}.txt`;
                const childFilePath = path.join(mainFolderPath, childFileName);

                fs.mkdir(childFolderPath, {recursive: true},(err) => {
                    if (err) {
                        console.error(err);
                        throw new Error();
                    } else {
                        console.log(`Папка "${childFolderName}" успішно створена.`);
                    }

                    fs.appendFile(childFilePath, `Якийсь контент в файлі ${i}`, (err) => {
                        if (err) {
                            console.error(err);
                            throw new Error();
                        } else {
                            console.log(`Файл "${childFileName}" успішно створений.`);
                        }
                    });
                });
            }
        }
    });
}

module.exports = creator;
