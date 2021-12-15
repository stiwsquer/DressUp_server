const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  getAllUsers,
  getUserByEmail,
  getUserById,
  saveUser,
  removeUserById,
  generateRefreshToken,
  generateAccessToken,
} = require('../service/userService');
const { app, authenticateToken } = require('../loaders/loaders');

app.get('/user', authenticateToken, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const allUsers = await getAllUsers();
  res.send(allUsers);
});

app.get('/user/:uid', authenticateToken, async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.uid;
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});

app.delete('/user/:uid', authenticateToken, async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.uid;
    const response = await removeUserById(id);
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});

app.post('/token', async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.sendStatus(401);

  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      const userFromDB = getUserByEmail(user.email);
      const accessToken = generateAccessToken(userFromDB);
      return res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ message: 'Successfully refreshed access token' });
    },
  );
});

app.post('/verify', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Access token is correct' });
});

app.delete('/logout', authenticateToken, (req, res) =>
  res
    .clearCookie('access_token')
    .clearCookie('refresh_token')
    .status(200)
    .json({ message: 'Successfully logged out' }),
);

app.post('/login', async (req, res) => {
  // Authentication - checking if user exists
  try {
    const userFromDataBase = await getUserByEmail(req.body.email);
    if (userFromDataBase == null) {
      return res.status(400).send('Cannot find user');
    }

    if (!(await bcrypt.compare(req.body.password, userFromDataBase.password))) {
      res.send('Not Allowed');
    }

    // Authorization - creating tokens and sending them to the client
    const accessToken = generateAccessToken(userFromDataBase);
    const refreshToken = generateRefreshToken(userFromDataBase);
    return res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json({ message: 'Logged in successfully' });
  } catch (e) {
    return res.status(500).send();
  }
});

app.post('/register', async (req, res) => {
  try {
    if (await getUserByEmail(req.body.email)) {
      return res
        .status(403)
        .send(`User with email: ${req.body.email} already exists`);
    }

    await saveUser(req.body);
    return res.status(200).json({ message: 'User successfully created' });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});
