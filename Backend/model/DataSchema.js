const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sale_price: {
    type: Number
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
