const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      sessionId: {
        type: String,
        required: true, // The session ID from the cart
      },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },],
  shippingInfo: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phoneNo: {
      type: String,
      required: true
    },
    whatsAppNo: {
        type: String,
        required: true
      },
  },
  paymentMethod: {
    type: String,
    enum: ['cod'],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Pending'],
    default: 'Processing',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
