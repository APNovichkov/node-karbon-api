const express = require("express");
const app = express();

// Define Middleware
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Setup Router
const router = require('./controllers/index');
app.use(router);

// Setup DB
require('./data/karbon-db');

// Start Server
app.listen(process.env.PORT, () => {
    console.log('Node Karbon API listening on port: ' + process.env.PORT);
});

module.exports = app;