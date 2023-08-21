//code by Dhiraj

import mongoose from "mongoose";

// Define the User schema
const referralHistorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },

  referrer_user_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
    index: true,
  },
  referred_user_id: { type: mongoose.Schema.ObjectId, required: true },
  reward_amount: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

// Create the ReferralHistory model
const ReferralHistory = mongoose.model(
  "ReferralHistory",
  referralHistorySchema
);

export default ReferralHistory;
