import React from 'react';

function index() {
  function isValidUsername(username) {
    // Your validation logic here
    const errors = [];

    if (!username) {
        errors.push("Username can't be empty");
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("Invalid username");
    } else if (username.length < 7) {
        errors.push("Username must be at least 7 characters long");
    }

    return errors.length === 0 ? true : errors;

  }

  function isValidPassword(password) {
    // Your validation logic here
    const errors = [];

    if (!password) {
        errors.push("Password must not be empty");
    } else if (password.length < 7) {
        errors.push("Password must be at least 7 characters long");
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }

    return errors.length === 0 ? true : errors;

  }

  function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const usernameValidation = isValidUsername(username);
    const passwordValidation = isValidPassword(password);

    if (usernameValidation === true && passwordValidation === true) {
      alert("Login successful");
    } else {
      let errorMessage = "";
      if (Array.isArray(usernameValidation)) {
        errorMessage += usernameValidation.join(", ") + "\n";
      }
      if (Array.isArray(passwordValidation)) {
        errorMessage += passwordValidation.join(", ");
      }
      alert("Login failed:\n" + errorMessage);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Login Page</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-lg font-semibold mb-1">Username:</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-1">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button
            type="button"
            onClick={validateLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default index;
