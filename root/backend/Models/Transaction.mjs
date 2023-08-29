//code by Dhiraj

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  u_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  currencyIsoCode: {
    type: String,
    required: true,
  },
});

// Create the ReferralHistory model
const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
