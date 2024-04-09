//createana express server
//GET request on /prducts route
//create a request handler that reads products.json
ACCESS_KEY = 'fT76e2PDYi7usDalelDv_PP43MzM2PriCwfzsdT4v2o'
SECRET_KEY ='9svf-OYjgXGLRh4SyX1wVgIFmFEWryI9rKhRF9TDm3I'
const fs =  require('fs').promises;
const express = require('express');
const path = require('path');

//specify the port
const PORT = process.env.PORT || 3000;

//create an express app
const app = express();
app.get('/products', listproducts);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function listproducts(req, res){
    const productFile = path.join(__dirname, './products.json');
    try{
        const data = await fs.readFile(productFile);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(JSON.parse(data));
    }catch(err){
        res.status(500).send({error:err.message});
    }
}

module.exports = { listproducts}