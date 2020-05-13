require('dotenv').config();

/* Mongoose Connection */
const mongoose = require('mongoose')
const mongo_uri = process.env.MONGODB_URI
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })

assert = require("assert");

const url = "mongodb://localhost/karbon-node-db";

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/karbon-node-db",
  
);

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;