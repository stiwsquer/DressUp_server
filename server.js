const express = require("express");
const app = express();
const {
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
} = require("./database/connect");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// for .env file
require("dotenv").config();

// With out this 2 lines we can't read json from requests
///////////////////////
const jwt = require("jsonwebtoken");
app.use(express.json());
//////////////////////

//FOR Cross origin
///////////////////////////////////
const cors = require("cors");
const { User } = require("./models/User");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
////////////////////////////////////

const PORT = 3001;
let connection;

// USER
app.get("/user", authenticateToken, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const allUsers = await getAllUsers(connection);
  res.send(allUsers);
});

app.get("/user/:uid", authenticateToken, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.uid;
  const user = await getUserById(connection, id);
  res.send(JSON.stringify(user));
});

app.post("/user", authenticateToken, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const newUser = new User();
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  const response = await updateOrSaveUser(connection, newUser);
  res.send(JSON.stringify(response));
});

app.delete("/user/:uid", authenticateToken, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.uid;
  const response = await removeUserById(connection, id);
  res.send(JSON.stringify(response));
});

// TOKEN
// app.get("/token", async (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   const allTokens = await getAllTokens(connection);
//   res.send(JSON.stringify(allTokens));
// });

// app.get("/token/:tid", async (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   const id = req.params.tid;
//   const token = await getTokenById(connection, id);
//   res.send(JSON.stringify(token));
// });

app.delete("/token/:tid", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const id = req.params.tid;
  const response = await removeTokenById(connection, id);
  res.send(JSON.stringify(response));
});

function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  // if (token == null) return res.sendStatus(401);
  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   req.user = user;
  //   next();
  // });

  const token = req.cookies.access_token;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(PORT, async () => {
  console.log(`Listening at localhost:${PORT}`);
  connection = await connect();
});

module.exports = { default: app, authenticateToken };
