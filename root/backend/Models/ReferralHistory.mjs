import mongoose from "mongoose";

// Define the User schema
const referralHistorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  history: [
    {
      f_name: {
        type: String,
        required: true,
      },
      l_name: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

// Create the ReferralHistory model
const ReferralHistory = mongoose.model(
  "ReferralHistory",
  referralHistorySchema
);

export default ReferralHistory;
