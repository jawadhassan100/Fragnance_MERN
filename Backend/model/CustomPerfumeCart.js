// models/CustomPerfumeCart.js
const mongoose = require('mongoose');

const customPerfumeCartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  items: [
    {
      perfumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomPerfume',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      },
      size: {
        type: String,
        enum: ['50ml', '100ml', '200ml'],
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('CustomPerfumeCart', customPerfumeCartSchema);
 