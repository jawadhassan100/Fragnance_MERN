const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  email: { type: String, default: null },

  // Regular products
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: { type: Number, default: 1 }
    }
  ],

  // Bundle Perfumes
  bundle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PerfumeBundle'
  },
  selectedPerfumes: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  bundleQuantity: {
    type: Number,
    default: 1,
    min: 1
  },
  bundleSize: {
    type: String,
    enum: ['50ml', '100ml', '200ml']
  },
  totalBeforeDiscount: Number,
  discountAmount: Number,
  finalPrice: Number,

  // Custom Perfumes
  customItems: [
    {
      perfumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomPerfume',
        required: true
      },
      quantity: { type: Number, default: 1 },
      size: {
        type: String,
        enum: ['50ml', '100ml', '200ml'],
        required: true
      }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema);
