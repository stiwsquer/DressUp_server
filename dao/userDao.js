const { getConnection } = require('typeorm');
const { User } = require('../models/User');

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
  return userRepository.findOne({ email });
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
    return null;
  }
}

module.exports = {
  getAllUsersDAO,
  getUserByEmailDAO,
  getUserByIdDAO,
  saveUserDAO,
  removeUserDAO,
  removeUserByIdDAO,
};
