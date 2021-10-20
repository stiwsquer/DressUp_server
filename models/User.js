const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor(
    id,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    admin,
    companyName,
    birthMonth,
    adressLine1,
    adressLine2,
    city,
    state,
    zip,
    country
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.admin = admin;
    this.companyName = companyName;
    this.birthMonth = birthMonth;
    this.adressLine1 = adressLine1;
    this.adressLine2 = adressLine2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
  }

  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  // async verifyPassword(password) {
  //   try {
  //     if (await bcrypt.compare(password, this.password)) {
  //       return true;
  //     } else return false;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
