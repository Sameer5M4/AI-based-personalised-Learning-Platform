const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  bio: {
    type: String
  },
  enrolledCourses: {
    type: Array
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;