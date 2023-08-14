import bcrypt from "bcrypt";

/**
 *
 * @param {String} password
 * @returns {String} hashed password
 */
export function createPasswordHash(password) {
  return bcrypt.hashSync(password, 10);
}

/**
 *
 * @param {String} password
 * @param {String} password_hash
 * @returns {Boolean} true if password and password_hash matched else false
 */
export function comparePasswordHash(password, password_hash) {
  return bcrypt.compareSync(password, password_hash);
}
