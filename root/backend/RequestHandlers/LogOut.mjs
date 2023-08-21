export default function Logout(req, res) {
  res.clearCookie("authToken");
  res.json({ success: true, data: null });
}
