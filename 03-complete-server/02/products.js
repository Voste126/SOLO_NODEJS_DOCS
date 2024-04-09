const fs = require
const path = require('path');

const productsFile = path.join(__dirname, './products.json');

module.exports = {
    list
}
async function list(){
    const data = await fs.readFile(productsFile);
    return JSON.parse(data);
}