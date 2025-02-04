const mongoose = require('mongoose');

const customPerfumeSchema = new mongoose.Schema({
  perfumeName: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    enum: ['50ml', '100ml'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CustomPerfume', customPerfumeSchema);