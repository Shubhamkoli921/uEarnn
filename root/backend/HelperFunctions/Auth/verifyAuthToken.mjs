import jwt from "jsonwebtoken";

/**
 *
 * @param {String} Authentication TOken
 * @returns {Boolean} return if token is valid
 */

function verifyAuthToken(AuthToken) {
  try {
    return jwt.verify(AuthToken, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
}

export default verifyAuthToken;
