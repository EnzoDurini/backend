const express = require('express');

const productsRoutes = require('./products/products.routes.js');
const carritosRoutes = require('./carritos/carritos.routes.js');
    
const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carts', carritosRoutes);

module.exports = router;