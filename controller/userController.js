const {
  getAllUsers,
  getUserByEmail,
  getUserById,
  saveUser,
  updateUser,
  removeUser,
  removeUserById,
  removeUserByEmail,
  generateRefreshToken,
  generateAccessToken,
  verifyPassword,
} = require("../service/userService");
const jwt = require("jsonwebtoken");
const { app, authenticateToken } = require("../loaders/loaders");

app.get("/user", authenticateToken, async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const allUsers = await getAllUsers();
  res.send(allUsers);
});

app.get("/user/:uid", authenticateToken, async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.uid;
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", authenticateToken, async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    if ((await getUserByEmail(req.body.email)) ? true : false) {
      return res
        .status(403)
        .send(`User with email: ${req.body.email} allready exists`);
    }

    const response = await saveUser(req.body.email, req.body.password);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/user/:uid", authenticateToken, async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const id = req.params.uid;
    const response = await removeUserById(id);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

app.post("/token", async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const userFromDB = getUserByEmail(user.email);
    const accessToken = generateAccessToken(userFromDB);
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Successfully refreshed access token" });
  });
});

app.post("/verify", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Access token is correct" });
});

app.delete("/logout", authenticateToken, (req, res) => {
  return res
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .status(200)
    .json({ message: "Successfully logged out" });
});

app.post("/login", async (req, res) => {
  // Authentication - checking if user exists

  try {
    let userFromDataBase;
    userFromDataBase = await getUserByEmail(req.body.email);
    if (userFromDataBase == null) {
      return res.status(400).send("Cannot find user");
    }

    if (!verifyPassword(req.body.password, userFromDataBase)) {
      res.send("Not Allowed");
    }

    // Authorization - creating tokens and sending them to the client
    const accessToken = generateAccessToken(userFromDataBase);
    const refreshToken = generateRefreshToken(userFromDataBase);
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
  } catch (e) {
    res.status(500).send();
  }
});

app.post("/register", async (req, res) => {
  try {
    if ((await getUserByEmail(req.body.email)) ? true : false) {
      return res
        .status(403)
        .send(`User with email: ${req.body.email} allready exists`);
    }

    await saveUser(req.body.email, req.body.password);
    res.status(200).json({ message: "User successfully created" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
