const Product = require("../models/product");
const Store = require("../models/store");

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find().lean();
    return res.send(products);
})

router.get('/:productId', async(req, res) => {
    const product = await Product.findById(req.params.productId);

    return res.send(product)
})

router.delete("/:productId", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.productId);

    return res.send({
        'message': "Successfuly deleted",
        "_id": product._id
    })
})

router.post("/", async (req, res) => {
    const product = await Product.insertMany(req.body);
    return res.send(product);
})

module.exports = router;