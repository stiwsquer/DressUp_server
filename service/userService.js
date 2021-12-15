const bcrypt = require('bcrypt');
const {
  getAllUsersDAO,
  getUserByEmailDAO,
  getUserByIdDAO,
  saveUserDAO,
  removeUserDAO,
  removeUserByIdDAO,
} = require('../dao/userDao');
const User = require('../models/User').User;

async function getAllUsers() {
  try {
    const allUsers = await getAllUsersDAO();
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(id) {
  try {
    const user = await getUserByIdDAO(id);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByEmail(email) {
  try {
    const userFromDataBase = await getUserByEmailDAO(email);
    return userFromDataBase;
  } catch (err) {
    console.log(err);
  }
}

async function saveUser(data) {
  try {
    const newUser = new User(data);
    newUser.password = await bcrypt.hash(data.password, 10);
    return await saveUserDAO(newUser);
  } catch (err) {
    console.log(err);
  }
}

async function removeUser(userObj) {
  try {
    const response = await removeUserDAO(userObj);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function removeUserById(id) {
  try {
    return await removeUserByIdDAO(id);
  } catch (err) {
    console.log(err);
  }
}

function generateAccessToken(user) {
  return user.generateAccessToken();
}

function generateRefreshToken(user) {
  return user.generateRefreshToken();
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  saveUser,
  removeUser,
  removeUserById,
  generateAccessToken,
  generateRefreshToken,
};
