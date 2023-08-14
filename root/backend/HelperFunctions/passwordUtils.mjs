import bcrypt from "bcrypt";

export function createPasswordHash(password) {
  return bcrypt.hashSync(password, 10);
}

export function comparePasswordHash(password, password_hash) {
  return bcrypt.compareSync(password, password_hash);
}
