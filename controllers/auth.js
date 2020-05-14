// Require models
const User = require('../models/user');

// Require packages
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign-up
router.post('/signup', (req, res) => {

    let result = {};
    let status = 201;

    const {name, password} = req.body;
    const user = new User({name, password}); 
    
    user.save()
    .then(user => {

        //Setup JWT token
        const payload = { user: user.name };
        const options = { expiresIn: '2d', issuer: 'node-karbon-api' };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);

        result.token = token;
        result.status = status;
        result.result = user;
        return res.status(status).send(result);
    }).catch(err => {
        console.log(err);
    });
})


//Login
router.post('/login', (req,res) => {
    //Get params from request body
    const {name, password} = req.body;

    let result = {};
    let status = 200;

    User.findOne({name})
    .then(user => {
        //Compare password of user to what was entered
        bcrypt.compare(password, user.password)
        .then(match => {
            if(match) {
                //Setup JWT token
                const payload = { user: user.name };
                const options = { expiresIn: '2d', issuer: 'node-karbon-api' };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);

                result.token = token;
                result.status = status;
                result.result = user;
            }else{
                status = 401;
                result.status = status;
                result.error = "Authentication error";
            }

            return res.send(result);
        }).catch(err => {
            //Error comparing password...
            console.log(err);
            return res.send(err);
        })
    }).catch(err => {
        //Error with getting user by username
        console.log(err);
        return res.send(err);
    }) 

})



module.exports = router;