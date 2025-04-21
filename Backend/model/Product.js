const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
   
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  weight:{
    type: String,
    required: true
    },
  price: {
    type: Number,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  images: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],
  size: {
    type: Number,
    required: true,
  },
  categories: {
    type: String,
    enum:["For Both", "For Her", "For Him"],
    required: true
  },
  Longevity: {
    type: Number,
    required: true,
  },
  Sillage:{
    type: String,
    enum:[ "light","moderate", "strong", "intense"],
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  quantitySold: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);

