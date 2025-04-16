// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  bundle: { type: mongoose.Schema.Types.ObjectId, ref: 'PerfumeBundle' },
  selectedPerfumes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  quantity: Number,
  price: Number,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Ziina'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('BundleOrder', orderSchema);
