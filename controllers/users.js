const User = require('../models/user');

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

    let result = {};
    let status = 201;

    const {name, password} = req.body;
    const user = new User({name, password}); 
    
    user.save().then((err, user) => {
        if (!err) {
            result.status = status;
            result.result = user;
        } else {
            status = 500;
            result.status = status;
            result.error = err;
        }
        res.status(status).send(result);
    });
})