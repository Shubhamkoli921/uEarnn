import User from "../Models/User.mjs";

export default function checkInitialPaymentStatus(req, res) {
  const uid = req["uid"];
  User.findOne({ _id: uid, initial_payment_completed: true })
    .then((user) => {
      if (user) {
        res.json({ success: true, data: true });
      } else {
        res.json({ success: true, data: false });
      }
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: "Something went wrong" });
    });
}
