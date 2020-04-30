/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = "mongodb://localhost/karbon-node-db";

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/karbon-node-db",
  { useNewUrlParser: true }
);

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;