const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    whatsAppNo: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  items: [
    {
      itemType: {
        type: String,
        enum: ["Product", "PerfumeBundle", "CustomPerfume"],
        required: true,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId, // ID of Product, Bundle, or CustomPerfume
        required: true,
        refPath: "items.itemType", // Dynamic reference based on itemType
      },
      quantity: { type: Number, required: true },
      size: { type: String }, // For perfumes if needed
      customDetails: {
        selectedPerfumes: [
          {
            perfumeName: String,
            brand: String,
          },
        ],
        size: { type: String },
      },
      price: { type: Number, required: true }, // unit price
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["COD", "Ziina"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  transactionId: { type: String, default: null },
  orderStatus: {
    type: String,
    enum: [
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Returned",
      "Pending",
    ],
    default: "Processing",
  },
  discountApplied: {
    code: String,
    percentage: Number,
    amountSaved: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
