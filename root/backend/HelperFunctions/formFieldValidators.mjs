export function isValidName(name) {
  name = name.trim();
  if (name === "" || name.length > 30) return false;
  return true;
}

export function isValidPassword(password) {
  password = password.trim();
  if (
    password === "" ||
    password.length < 6 ||
    password.length > 30 ||
    !/.*[!@#$%^&*()\-_=+{}\[\]:;<>,.?/~].*/i.test(password)
  ) {
    return false;
  }
  return true;
}

export function isValidUsername(username) {
  username = username.trim();
  if (
    username === "" ||
    username.length < 6 ||
    username.length > 20 ||
    !/^[a-zA-Z0-9_]+$/i.test(username)
  ) {
    return false;
  }
  return true;
}
