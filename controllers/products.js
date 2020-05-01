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

    const product = new Product(req.body);

    console.log(req.body);

    product.save()
    .then(product => {
        return Store.findById(req.body.store);
    })
    .then(store => {
        store.products.unshift(product);
        store.save()
    }).catch(err => {
        console.log(err);
    })

    return res.send(product);
})

module.exports = router;