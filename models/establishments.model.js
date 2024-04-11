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
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // Array of numbers: [longitude, latitude]
        index: '2dsphere' // Ensure indexing for geospatial queries
      }
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
