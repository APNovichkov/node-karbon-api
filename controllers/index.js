const express = require('express');
const productRoutes = require('./products');
const storeRoutes = require('./stores');

const router = express.Router();

router.use('/products', productRoutes);
router.use('/stores', storeRoutes);

module.exports = router;