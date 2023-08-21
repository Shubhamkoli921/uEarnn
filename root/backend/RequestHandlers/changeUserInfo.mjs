// create a request handler named changeUserInfo.mjs, it updates the user information saved in our database.
// it gets all the information to update using req['body'] in json format like: {u_name:dhiraj_12}.
// validate the fields received in the req['body'] against their validator, ex: for example for request body {u_name:dhiraj_12} validate if dhiraj_12 is a valid username or not if not then respond with invalid data
// get the _id of user from req['uid'] and update the fields acordingly

// the possible informations that can be updated is firstname, lastname, username, password
// _id cannot be changed


import User from "../Models/User.mjs";
import { validateUsername, validateFirstname,validateLastname,validatePassword } from './validators'; 
import { getUserById, updateUserById } from './database'; 

// Define the route for the changeUserInfo request
app.post('/changeUserInfo', async (req, res) => {
  try {
    const updateData = req.body;
    const uid = req.uid; 

    // Fetch the user from the database
    const user = await getUserById(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate and update fields
    if ('username' in updateData) {
      const isValidUsername = validateUsername(updateData.username);
      if (!isValidUsername) {
        return res.status(400).json({ error: 'Invalid username' });
      }
      user.username = updateData.username;
    }

    if ('firstname' in updateData) {
      const isValidFirstname = validateFirstname(updateData.firstname);
      if (!isValidFirstname) {
        return res.status(400).json({ error: 'Invalid firstname' });
      }
      user.firstname = updateData.firstname;
    }

    if ('lastname' in updateData) {
      const isValidLastname = validateLastname(updateData.lastname);
      if (!isValidLastname) {
        return res.status(400).json({ error: 'Invalid lastname' });
      }
      user.lastname = updateData.lastname;
    }

    if ('password' in updateData) {
      const isValidPassword = validatePassword(updateData.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      user.password = updateData.password;
    }

    const updatedFields = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      password: user.password,
    };

    const updatedUser = await updateUserById(uid, updatedFields);

    res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default changeUserInfo;
