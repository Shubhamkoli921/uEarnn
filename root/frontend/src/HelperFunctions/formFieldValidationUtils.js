//code by Nagi, Updated by Dhiraj

export function validateUsername(username) {
  username = username.trim();
  if (!username) return "Username can't be empty";
  else if (!/^[a-zA-Z0-9_]+$/.test(username))
    return "Username must not contain any special characters except _";
  else if (username.length < 6 || username.length > 20)
    return "Username must be between 6 and 20 characters long";

  return null;
}

export function validatePassword(password) {
  password = password.trim();
  const errors = [];

  if (!password) {
    errors.push("Password can't be empty");
  }
  if (password.length < 7 || password.length > 30) {
    errors.push("Password must be between 7 and 30 characters long");
  }

  if (!/.*[!@#$%^&*()\-_=+{}\[\]:;<>,.?/~].*/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return errors.length ? errors : null;
}

export function validateFirstName(firstName) {
  firstName = firstName.trim();
  if (!firstName) return "Firstname can't be empty";
  else if (firstName.length > 30)
    return "Firstname must be less than 30 characters";
  return null;
}

export function validateLastName(lastName) {
  lastName = lastName.trim();
  if (!lastName) return "Lastname can't be empty";
  else if (lastName.length > 30)
    return "Lastname must be less than 30 characters";
  return null;
}
