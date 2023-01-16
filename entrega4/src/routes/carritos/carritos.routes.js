const express = require('express');
const { createCarrito, showProducts, addProduct }  = require('../../api/carritos.api.js');

const router = express.Router();

router.post('/', createCarrito);

router.get('/:cid', showProducts);

router.post('/:cid/products/:pid', addProduct);


module.exports = router;