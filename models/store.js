const mongoose = require("mongoose");
const Schema = mongoose.Schema;

StoreSchema = new Schema({
    name: { type: String, required: true},
    coordinates: { type: String, required: true},
    city: { type: String, required: false},
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: false}]
});

module.exports = mongoose.model("Store", StoreSchema);