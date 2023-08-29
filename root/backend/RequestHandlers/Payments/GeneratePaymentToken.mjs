import braintree from "braintree";

export default function GeneratePaymentToken(req, res) {
  const uid = req["uid"];
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BT_MERCHANT_ID,
    publicKey: process.env.BT_PUBLIC_KEY,
    privateKey: process.env.BT_PRIVATE_KEY,
  });
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, error: "Unable to generate payment token!" });
    }
    // pass clientToken to your front-end
    const clientToken = response.clientToken;
    res.json({ success: true, data: clientToken });
  });
}
