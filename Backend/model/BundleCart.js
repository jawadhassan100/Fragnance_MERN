const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  bundle: { type: mongoose.Schema.Types.ObjectId, ref: 'PerfumeBundle' },
  selectedPerfumes: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  size: {
    type: String,
    enum: ['50ml', '100ml', '200ml'],
    required: true
  },
  totalBeforeDiscount: {
    type: Number,
    required: true
  },
  discountAmount: {
    type: Number,
    required: true
  },
  finalPrice: {
    type: Number,
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BundleCart', cartSchema);