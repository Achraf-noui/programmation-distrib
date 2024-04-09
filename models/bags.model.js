const mongoose = require('mongoose');

const { Schema } = mongoose;

const bagSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number, requiered: true },
  collectTime: { type: Date },
  establishmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Establishment', requiered: true }
});

module.exports = mongoose.model('Bag', bagSchema);
