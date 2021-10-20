const EntitySchema = require("typeorm").EntitySchema;
const Cart = require("../models/Cart").User;

module.exports = new EntitySchema({
  name: "Cart",
  target: Cart,
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: "true",
    },
    status: {
      type: "varchar",
    },
  },
  relations: {
    user: {
      type: "one-to-one",
      target: "User",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});
