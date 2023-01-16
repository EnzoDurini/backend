const express = require('express');
const { getProducts, getProductId, saveProduct, updateProduct, deleteProduct }  = require('../../api/products.api.js');

const router = express.Router();

router.get('/', getProducts);

router.get('/:pid', getProductId);

router.post('/', saveProduct);

router.put('/:pid', updateProduct);

router.delete('/:pid', deleteProduct);

module.exports = router;