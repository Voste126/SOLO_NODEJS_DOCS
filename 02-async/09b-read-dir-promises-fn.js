const fs = require('fs').promises;
const path = require('path');

// This is a program to handle a directory with files using promises


const targetDirectory = process.argv[2] || './';

getFileLengths(targetDirectory)
    .then(results => {
        results.forEach(([file, length]) => console.log(`${file}: ${length}`));
        console.log('done!');
    })
    .catch(console.error);

function getFileLengths(directory) {
    return fs.readdir(directory)
        .then(fileList => {
            const readFiles = fileList.map(file => {
                const filePath = path.join(directory, file);
                return readFile(filePath);
            });
            return Promise.all(readFiles);
        });
}

function readFile(file) {
    return fs
        .readFile(file)
        .then(data => [file, data.length])
        .catch(err => {
            if (err.code === 'EISDIR') return [file, 0];
            throw err;
        });
}
