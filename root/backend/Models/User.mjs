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
  p_hash: {
    type: String,
    required: true,
  },
  uearn_coins: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
