const bcrypt = require("bcrypt");
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

async function saveUser(
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  companyName,
  birthMonth,
  adressLine1,
  adressLine2,
  city,
  state,
  zip,
  country
) {
  try {
    const newUser = new User();
    newUser.email = email;
    newUser.password = await bcrypt.hash(password, 10);
    newUser.admin = 0;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.companyName = companyName;
    newUser.phoneNumber = phoneNumber;
    newUser.birthMonth = birthMonth;
    newUser.adressLine1 = adressLine1;
    newUser.adressLine2 = adressLine2;
    newUser.city = city;
    newUser.state = state;
    newUser.zip = zip;
    newUser.country = country;
    return await saveUserDAL(newUser);
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(
  email,
  id,
  password,
  firstName,
  lastName,
  phoneNumber,
  companyName,
  birthMonth,
  adressLine1,
  adressLine2,
  city,
  state,
  zip,
  country
) {
  try {
    const userToUpdate = id
      ? await getUserByIdDAL(id)
      : await getUserByEmailDAL(email);
    userToUpdate.password = password
      ? await bcrypt.hash(password, 10)
      : userToUpdate.password;
    userToUpdate.firstName = firstName ? firstName : userToUpdate.firstName;
    userToUpdate.lastName = lastName ? lastName : userToUpdate.lastName;
    userToUpdate.companyName = companyName
      ? companyName
      : userToUpdate.companyName;
    userToUpdate.phoneNumber = phoneNumber
      ? phoneNumber
      : userToUpdate.phoneNumber;
    userToUpdate.birthMonth = birthMonth ? birthMonth : userToUpdate.birthMonth;
    userToUpdate.adressLine1 = adressLine1
      ? adressLine1
      : userToUpdate.adressLine1;
    userToUpdate.adressLine2 = adressLine2
      ? adressLine2
      : userToUpdate.adressLine2;
    userToUpdate.city = city ? city : userToUpdate.city;
    userToUpdate.state = state ? state : userToUpdate.state;
    userToUpdate.zip = zip ? zip : userToUpdate.zip;
    userToUpdate.country = country ? country : userToUpdate.country;
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
};
