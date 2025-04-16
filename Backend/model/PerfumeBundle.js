const mongoose = require('mongoose');


const bundleSchema = new mongoose.Schema({
    title: String,
    mainImage: String,
    options: [ {
        name: String,
        perfumes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Perfume' }],
        }
  ],
  size: {
    type: Number,  
    required: true,
    enum: ["50ml" ,"100ml", "200ml"], 
  },
    totalPrice: Number,
    priceSaved: Number,
    percentageSaved: Number,
  });
  
  module.exports = mongoose.model('PerfumeBundle', bundleSchema);
  