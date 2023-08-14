import jwt from "jsonwebtoken";

/**
 *
 * @param {String} Authentication TOken
 * @returns {Boolean} returns true if token is valid else false
 */

function verifyAuthToken(AuthToken) {
  try {
    return jwt.verify(AuthToken, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
}

export default verifyAuthToken;
