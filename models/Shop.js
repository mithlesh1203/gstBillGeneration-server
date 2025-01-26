const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  gstin: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
