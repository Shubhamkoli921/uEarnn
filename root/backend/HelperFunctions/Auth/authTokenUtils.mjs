//code by Dhiraj

import jwt from "jsonwebtoken";

/**
 *
 * @param {object} data
 * @returns {String} Authentication token
 */
export function createAuthToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "20d" });
}

/**
 *
 * @param {String} Authentication TOken
 * @returns {Boolean} returns true if token is valid else false
 */

export function verifyAuthToken(AuthToken) {
  try {
    return jwt.verify(AuthToken, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
}
