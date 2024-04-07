const mongoose = require('mongoose');

const establishmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    photos: {
      type: [String], // Array of photo URLs or file paths
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Establishment = mongoose.model('Establishment', establishmentSchema);

module.exports = Establishment;
