//code by Dhiraj

import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  f_name: {
    type: String,
    required: true,
  },
  l_name: {
    type: String,
    required: true,
  },
  u_name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  m_number: {
    type: Number,
    default: "1234567890",
    required: true,
  },
  p_hash: {
    type: String,
    required: true,
  },
  initial_payment_completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  uearn_coins: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  is_referred: {
    type: Boolean,
    required: true,
  },
  referrer_id: {
    type: String,
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
