const express = require('express');

//Import routes
const productRoutes = require('./products');
const storeRoutes = require('./stores');
const userRoutes = require('./users');
const authRoutes = require('./auth');

//Define router
const router = express.Router();

//Add routes to router
router.use('/products', productRoutes);
router.use('/stores', storeRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;