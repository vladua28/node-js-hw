const fs = require('fs');
const path = require('path');

const mainFolderPath = './mainFolder';

const checker = () => {
    fs.readdir(mainFolderPath, (err, items) => {
        if (err) {
            console.error(err);
            throw new Error();
        } else {
            items.forEach(item => {
                const itemPath = path.join(mainFolderPath, item);
                fs.stat(itemPath, (err, stats) => {
                    if (err) {
                        console.error(err);
                        throw new Error();
                    } else {
                        if (stats.isFile()) {
                            console.log(`${item} є файлом`);
                        } else if (stats.isDirectory()) {
                            console.log(`${item} є папкою`);
                        } else {
                            console.log(`${item} є іншим`);
                        }
                    }
                });
            });
        }
    });
}

module.exports = checker;
