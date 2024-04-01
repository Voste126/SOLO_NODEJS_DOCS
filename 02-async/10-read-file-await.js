const fs = require('fs').promises

printLength('10-read-file-await.js')

async function printLength(filename) {
    try {
        const fileData = await fs.readFile(filename)
        console.log(`${filename}: ${fileData.length}`)
    } catch (err) {
        console.error(err)
    }
}