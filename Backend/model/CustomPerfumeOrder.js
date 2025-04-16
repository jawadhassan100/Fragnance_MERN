const mongoose = require('mongoose');

const customPerfumeOrderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  selectedPerfumes: [{
    perfumeName: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  }],
  perfumeDetails: [{
    size: {
      type: String,
      enum: ['50ml', '100ml'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }
  }],
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    whatsAppNo: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'ziina'],
    required: true,
  },
  isPaid: { type: Boolean, default: false },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  transactionId: {
    type: String, // From Ziina
    default: null,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Pending'],
    default: 'Processing',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CustomPerfumeOrder', customPerfumeOrderSchema);
