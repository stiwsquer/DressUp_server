const typeorm = require("typeorm");

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
      entities: [require("../schemas/UserSchema")],
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  connect,
};
