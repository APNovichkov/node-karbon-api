const Product = require("../models/product");
const Store = require("../models/store");

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({'message': "hello from stores!"})
})

module.exports = router;