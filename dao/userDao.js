const User = require("../models/User").User;
const getConnection = require("typeorm").getConnection;

function getAllUsersDAL() {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.find();
}

function getUserByIdDAL(id) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.findOne(id);
}

function getUserByEmailDAL(email) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.findOne({ email: email });
}

function saveUserDAL(user) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.save(user);
}

function removeUserDAL(userObj) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.remove(userObj);
}

async function removeUserByIdDAL(id) {
  try {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const userToRemove = await userRepository.findOne(id);
    return userRepository.remove(userToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeUserByEmailDAL(email) {
  try {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const userToRemove = await userRepository.findOne({ email: email });
    return userRepository.remove(userToRemove);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllUsersDAL,
  getUserByEmailDAL,
  getUserByIdDAL,
  saveUserDAL,
  removeUserDAL,
  removeUserByIdDAL,
  removeUserByEmailDAL,
};
