const jwt = require('jsonwebtoken');

class User {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phoneNumber = data.phoneNumber;
    this.admin = data.admin;
    this.companyName = data.companyName;
    this.birthMonth = data.birthMonth;
    this.addressLine1 = data.addressLine1;
    this.addressLine2 = data.addressLine2;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
    this.country = data.country;
  }

  generateAccessToken() {
    return jwt.sign(
      { email: this.email, id: this.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
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
