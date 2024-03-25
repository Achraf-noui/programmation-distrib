const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagSchema = new Schema({
    businessId: {type: String},
    name: { type: String },
    bagDescription: { type: String },
    price: { type: Number, required: true },
    collectTime: {type: Date},
    status: {type: String}
});

module.exports = mongoose.model('Bag', bagSchema);