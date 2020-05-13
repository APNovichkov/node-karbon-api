const User = require('../models/user');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    users = await User.find().lean();
    return res.send(users);
})

router.post('/', (req, res) => {

    let result = {};
    let status = 201;

    const {name, password} = req.body;
    const user = new User({name, password}); 
    
    user.save()
    .then(user => {
        result.status = status;
        result.result = user;
        return res.status(status).send(result);
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;