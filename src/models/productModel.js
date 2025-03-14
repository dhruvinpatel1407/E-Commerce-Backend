const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number
  },
  rating: {
    type: Number
  },
  stock: {
    type: Number
  },
  brand: {
    type: String
  },
  sku: {
    type: String
  },
  weight: {
    type: Number
  },
  dimensions: {
    type: Object
  },
  warrantyInformation: {
    type: String
  },
  shippingInformation: {
    type: String
  },
  availabilityStatus: {
    type: String
  },
  reviews: {
    type: Array
  },
  returnPolicy: {
    type: String
  },
  minimumOrderQuantity: {
    type: Number
  },
  meta: {
    type: Object
  },
  images: {
    type: Array
  },
  thumbnail: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProductCollection = mongoose.model('Product', productSchema);

module.exports = ProductCollection;