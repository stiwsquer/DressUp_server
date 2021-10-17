// This server is only for login, logout and refresh tokens

require("dotenv").config();

const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const {
  connect,
  getTokenByValue,
  saveToken,
  removeTokenByValue,
  getUserByEmail,
  updateOrSaveUser,
} = require("./database/connect");

const PORT = 3002;
let connection;
app.use(express.json());
app.use(cookieParser());

///////////////////////////////////
const cors = require("cors");
const { Token } = require("./models/Token");
const { User } = require("./models/User");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
////////////////////////////////////

app.post("/token", authenticateToken, async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken == null) return res.sendStatus(401);
  const tokenFromDB = await getTokenByValue(connection, refreshToken);
  if (!tokenFromDB) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({
      email: user.email,
      password: user.password,
    });
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Successfully refreshed access token" });
  });
});

app.delete("/logout", authenticateToken, async (req, res) => {
  await removeTokenByValue(connection, req.cookies.refresh_token);
  return res
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .status(200)
    .json({ message: "Successfully logged out" });
});

app.post("/login", async (req, res) => {
  // Authentication - checking if user exists
  const userFromDataBase = await getUserByEmail(connection, req.body.email);
  if (userFromDataBase == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (!(await bcrypt.compare(req.body.password, userFromDataBase.password))) {
      res.send("Not Allowed");
    }
  } catch (e) {
    res.status(500).send();
  }

  // Authorization - creating tokens and sending them to the client
  const user = {
    email: userFromDataBase.email,
    password: userFromDataBase.password,
  };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  const tokenObj = new Token();
  tokenObj.token = refreshToken;
  await saveToken(connection, tokenObj);
  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully" });
});

app.post("/register", async (req, res) => {
  try {
    if ((await getUserByEmail(connection, req.body.email)) ? true : false) {
      return res
        .status(403)
        .send(`User with email: ${req.body.email} allready exists`);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = hashedPassword;
    await updateOrSaveUser(connection, newUser);
    res.status(200).json({ message: "User successfully created" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

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
