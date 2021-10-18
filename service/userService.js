const {
  getAllUsersDAL,
  getUserByEmailDAL,
  getUserByIdDAL,
  saveUserDAL,
  removeUserDAL,
  removeUserByIdDAL,
  removeUserByEmailDAL,
} = require("../dao/userDao");
const jwt = require("jsonwebtoken");
const User = require("../models/User").User;

async function getAllUsers() {
  try {
    const allUsers = await getAllUsersDAL();
    return allUsers;
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(id) {
  try {
    const user = await getUserByIdDAL(id);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function getUserByEmail(email) {
  try {
    const userFromDataBase = await getUserByEmailDAL(email);
    return userFromDataBase;
  } catch (err) {
    console.log(err);
  }
}

async function saveUser(email, password) {
  try {
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.hashPassword();
    const response = await saveUserDAL(newUser);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(email, password, id) {
  try {
    const userToUpdate = id ? getUserByIdDAL(id) : getUserByEmailDAL(email);
    userToUpdate.password = password;
    userToUpdate.hashPassword();
    const response = await saveUserDAL(userToUpdate);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function removeUser(userObj) {
  try {
    const response = await removeUserDAL(userObj);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function removeUserById(id) {
  try {
    return await removeUserByIdDAL(id);
  } catch (err) {
    console.log(err);
  }
}

async function removeUserByEmail(email) {
  try {
    return await removeUserByEmailDAL(email);
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

async function verifyPassword(password, user) {
  try {
    return user.verifyPassword(password);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  saveUser,
  updateUser,
  removeUser,
  removeUserById,
  removeUserByEmail,
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
};
