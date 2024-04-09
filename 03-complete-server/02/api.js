const products = require('./products');

module.exports = {
    listProducts
}

async function listProducts(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        res.json(await products.list());
    }catch(err){
        res.status(500).send({error:err.message});
    }
}