const Product = require("../models/product");
const Store = require("../models/store");

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const stores = await Store.find().populate('products');
    return res.send(stores);
});

router.get('/:storeId', async (req, res) => {
    const store = await Store.findById(req.params.storeId);
    return res.send(store);
});

router.delete('/:storeId', async (req, res) => {
    const store = await Store.findByIdAndDelete(req.params.storeId);
    return res.send({
        'message': 'Successfuly Deleted', 
        "_id": store._id
    });
});

router.post('/', async (req, res) => {
    const store = await Store.insertMany(req.body);
    return res.send(store);
});

module.exports = router;