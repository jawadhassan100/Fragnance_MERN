const mongoose = require('mongoose');


const bundleSchema = new mongoose.Schema({
    title: String,
    mainImage: String,
    options: [
      {
        label: String,
        perfumes: [
          {
            name: String,
            price: Number,
          },
        ],
      },
    ],
    availableSizes: {
      type: [String],
      enum: ["50ml", "100ml", "200ml"],
      default: ["50ml", "100ml", "200ml"]
    },
    totalPrice: Number,
    priceSaved: Number,
    percentageSaved: Number,
  });
  
  module.exports = mongoose.model('PerfumeBundle', bundleSchema);
  