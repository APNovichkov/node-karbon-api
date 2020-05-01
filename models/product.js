const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: false },
    price: { type: Number, required: true },
    store: { type: Schema.Types.ObjectId, ref: 'Store', require: true }
});

module.exports = mongoose.model("Product", ProductSchema);