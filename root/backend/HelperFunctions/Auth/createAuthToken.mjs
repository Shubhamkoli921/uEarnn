import jwt from "jsonwebtoken";

/**
 *
 * @param {object} data
 * @returns {String} Authentication token
 */
function createAuthToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export default createAuthToken;
