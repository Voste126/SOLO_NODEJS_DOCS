const express = require('express');
const api = require('./api');

const port = process.env.PORT || 3000;

const app = express();
app.get('/products', api.listProducts);
app.listen(port, () => console.log(`Server running on port ${port}`));