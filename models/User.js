const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async verifyPassword(password) {
    try {
      if (await bcrypt.compare(password, this.password)) {
        return true;
      } else return false;
    } catch (err) {
      console.log(err);
    }
  }

  generateAccessToken() {
    return jwt.sign(
      { email: this.email, id: this.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
  }

  generateRefreshToken() {
    return jwt.sign(
      { email: this.email, id: this.id },
      process.env.REFRESH_TOKEN_SECRET
    );
  }
}

module.exports = {
  User,
};
