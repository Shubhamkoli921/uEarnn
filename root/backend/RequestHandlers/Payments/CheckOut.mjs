import braintree from "braintree";
import Transaction from "../../Models/Transaction.mjs";
import mongoose from "mongoose";
import ReferralHistory from "../../Models/ReferralHistory.mjs";
import User from "../../Models/User.mjs";

export default function CheckOut(req, res) {
  const uid = req["uid"];
  const { nonce } = req.body;
  const transactionType = req.query["transaction-type"];
  if (!nonce) {
    res.status(400).json({ success: false, error: "No nonce found" });
  }

  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BT_MERCHANT_ID,
    publicKey: process.env.BT_PUBLIC_KEY,
    privateKey: process.env.BT_PRIVATE_KEY,
  });
  gateway.transaction.sale(
    {
      amount:
        transactionType && transactionType === "account-activation"
          ? process.env.ACCOUNT_ACTIVATION_FEE
          : "100.00", //the else condition will be replaced with the variable amount as per the requirement
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result["success"] === true) {
        new Transaction({
          _id: new mongoose.Types.ObjectId(),
          u_id: uid,
          transaction_id: result["transaction"]["id"],
          amount: result["transaction"]["amount"],
          currencyIsoCode: result["transaction"]["currencyIsoCode"],
        })
          .save()
          .then((newTransaction) => {
            if (transactionType && transactionType === "account-activation") {
              async function referralTransaction() {
                const transactionSession = await mongoose.startSession();

                try {
                  transactionSession.startTransaction();
                  const user = await User.findById(uid);
                  if (!user["initial_payment_completed"]) {
                    user["initial_payment_completed"] = true;
                    user["uearn_coins"] += Number(
                      process.env.ACCOUNT_ACTIVATION_FEE
                    );
                    await user.save();
                  }
                  if (user["is_referred"]) {
                    await new ReferralHistory({
                      _id: new mongoose.Types.ObjectId(),
                      referred_user_id: uid,
                      referrer_user_id: user["referrer_id"],
                      reward_amount: Number(process.env.REFERRER_REWARD_UNIT),
                      created_at: new Date(),
                    }).save();
                    const referrerUser = await User.findById(
                      user["referrer_id"]
                    );
                    referrerUser["uearn_coins"] += Number(
                      process.env.REFERRER_REWARD_UNIT
                    );
                    await referrerUser.save();
                  }
                } catch (error) {
                  await transactionSession.abortTransaction();
                } finally {
                  await transactionSession.endSession();
                }
              }
              referralTransaction().then(() => {
                res.json({ success: true, data: null });
              });
            } else {
              res.json({ success: true, data: null });
            }
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({ success: false, error: "Something went Wrong!" });
          });
      } else {
        console.log(JSON.stringify(result));
        res
          .status(402)
          .json({ success: false, error: "Transaction unsuccessful" });
      }
    }
  );
}
