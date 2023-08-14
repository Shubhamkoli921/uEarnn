import User from "../Models/User.mjs";

export default function CheckUsername(req, res) {
  const userName = req.params["userName"];
  if (userName) {
    User.findOne({ u_name: userName })
      .exec()
      .then((user) => {
        if (user) {
          res.json({ success: true, data: true });
        } else {
          res.json({ success: true, data: false });
        }
      })
      .catch((e) => {});
  } else {
    res.status(400).json({ success: false, error: "Invalid username" });
  }
}
