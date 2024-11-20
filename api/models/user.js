const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  address: { type: String },
  country: { type: String },
  city: { type: String },
  email: { type: String, required: true },
  birthDay: { type: Date, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  notification: {
    newoffer: { type: Boolean, default: false },
    allnotifi: { type: Boolean, default: false },
  },
  cohost: { type: mongoose.Schema.ObjectId, ref: "User" },
  idNumber: { type: Number },
  idImage: {
    front: { type: String },
    back: { type: String },
  },
});

module.exports = mongoose.model("User", userSchema);
