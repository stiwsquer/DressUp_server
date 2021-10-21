const User = require("../models/User").User;
const getConnection = require("typeorm").getConnection;

function getAllUsersDAO() {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.find();
}

function getUserByIdDAO(id) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.findOne(id);
}

function getUserByEmailDAO(email) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.findOne({ email: email });
}

function getUserByPlainObjectDAO(plainObject) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.find(plainObject);
}

function saveUserDAO(user) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.save(user);
}

function removeUserDAO(userObj) {
  const connection = getConnection();
  const userRepository = connection.getRepository(User);
  return userRepository.remove(userObj);
}

async function removeUserByIdDAO(id) {
  try {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const userToRemove = await userRepository.findOne(id);
    return userRepository.remove(userToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeUserByEmailDAO(email) {
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
  getAllUsersDAO,
  getUserByEmailDAO,
  getUserByIdDAO,
  saveUserDAO,
  removeUserDAO,
  removeUserByIdDAO,
  removeUserByEmailDAO,
  getUserByPlainObjectDAO,
};
