const typeorm = require("typeorm");
const User = require("../models/User").User;
const Token = require("../models/Token").Token;

async function connect() {
  try {
    return await typeorm.createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "dressup",
      synchronize: "true",
      logging: false,
      entities: [
        require("../schemas/TokenSchema"),
        require("../schemas/UserSchema"),
      ],
    });
  } catch (err) {
    console.log(err);
  }
}

// async function mockData(connection) {
//   const user = new User();
//   user.email = "kuba@kuba";
//   user.password = "password";
//   const token = new Token(
//     0,
//     "db9a3b1210c6b69fc0273d46dd0a3b6d9307e891ebd26d1c109564652684f1227c273c00997c6d28d329db14bf7b3cfeb493c74cdee3eedaca58eb14ba8b5a35"
//   );

//   const userRepository = connection.getRepository(User);
//   const tokenRepository = connection.getRepository(Token);

//   const savedUser = await userRepository.save(user);
//   const savedToken = await tokenRepository.save(token);

//   console.log("User has been saved: ", savedUser);
//   console.log("Token has been saved: ", savedToken);
// }

/// USER
function getAllUsers(connection) {
  const userRepository = connection.getRepository(User);
  return userRepository.find();
}

function getUserById(connection, id) {
  const userRepository = connection.getRepository(User);
  return userRepository.findOne(id);
}

function getUserByEmail(connection, email) {
  const userRepository = connection.getRepository(User);
  return userRepository.findOne({ email: email });
}

async function updateOrSaveUser(connection, userObj, email, password) {
  try {
    const userRepository = connection.getRepository(User);
    const userToUpdate = await userRepository.findOne(userObj);
    if (userToUpdate) {
      if (email) userToUpdate.email = email;
      if (password) userToUpdate.password = password;
      return userRepository.save(userToUpdate);
    }
    return userRepository.save(userObj);
  } catch (err) {
    console.log(err);
  }
}

function removeUser(connection, userObj) {
  const userRepository = connection.getRepository(User);
  return userRepository.remove(userObj);
}

async function removeUserById(connection, id) {
  try {
    const userRepository = connection.getRepository(User);
    const userToRemove = await userRepository.findOne(id);
    return userRepository.remove(userToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeUserByEmail(connection, email) {
  try {
    const userRepository = connection.getRepository(User);
    const userToRemove = await userRepository.findOne({ email: email });
    return userRepository.remove(userToRemove);
  } catch (err) {
    console.log(err);
  }
}

/// TOKEN
function getAllTokens(connection) {
  const tokenRepository = connection.getRepository(Token);
  return tokenRepository.find();
}

function getTokenByValue(connection, tokenValue) {
  const tokenRepository = connection.getRepository(Token);
  return tokenRepository.findOne({ token: tokenValue });
}

function getTokenById(connection, id) {
  const tokenRepository = connection.getRepository(Token);
  return tokenRepository.findOne(id);
}

async function saveToken(connection, tokenObj) {
  const tokenRepository = connection.getRepository(Token);
  return tokenRepository.save(tokenObj);
}

function removeToken(connection, tokenObj) {
  const tokenRepository = connection.getRepository(Token);
  return tokenRepository.remove(tokenObj);
}

async function removeTokenById(connection, id) {
  try {
    const tokenRepository = connection.getRepository(Token);
    const tokenToRemove = await tokenRepository.findOne(id);
    return tokenRepository.remove(tokenToRemove);
  } catch (err) {
    console.log(err);
  }
}

async function removeTokenByValue(connection, tokenValue) {
  try {
    const tokenRepository = connection.getRepository(Token);
    const tokenToRemove = await tokenRepository.findOne({ token: tokenValue });
    return tokenRepository.remove(tokenToRemove);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  connect,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateOrSaveUser,
  removeUser,
  removeUserById,
  removeUserByEmail,
  getAllTokens,
  getTokenById,
  getTokenByValue,
  saveToken,
  removeToken,
  removeTokenById,
  removeTokenByValue,
};
