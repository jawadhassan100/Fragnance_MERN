const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  bundle: { type: mongoose.Schema.Types.ObjectId, ref: 'PerfumeBundle' },
  selectedPerfumes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  quantity: { type: Number, default: 1 },
  totalBeforeDiscount: Number,
  discountAmount: Number,
  finalPrice: Number,
  lastModified: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BundleCart', cartSchema);