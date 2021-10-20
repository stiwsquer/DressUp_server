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
      entities: [
        require("../schemas/UserSchema"),
        require("../schemas/CartSchema"),
        require("../schemas/ImageSchema"),
        require("../schemas/CartItemSchema"),
        require("../schemas/CategorySchema"),
        require("../schemas/OrderItemSchema"),
        require("../schemas/OrderSchema"),
        require("../schemas/ProductSchema"),
      ],
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  connect,
};
