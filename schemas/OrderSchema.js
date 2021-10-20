const EntitySchema = require("typeorm").EntitySchema;
const Order = require("../models/Order").Order;

module.exports = new EntitySchema({
  name: "Order",
  target: Order,
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
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});