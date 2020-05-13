const express = require('express');

//Import routes
const productRoutes = require('./products');
const storeRoutes = require('./stores');
const userRoutes = require('./users')

//Define router
const router = express.Router();

//Add routes to router
router.use('/products', productRoutes);
router.use('/stores', storeRoutes);
router.use('/users', userRoutes);

module.exports = router;