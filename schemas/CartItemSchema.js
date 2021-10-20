const EntitySchema = require("typeorm").EntitySchema;
const CartItem = require("../models/CartItem").CartItem;

module.exports = new EntitySchema({
  name: "CartItem",
  target: CartItem,
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: "true",
    },
    quantity: {
      type: "smallint",
    },
  },
  relations: {
    products: {
      type: "many-to-one",
      target: "Product",
      joinColumn: true,
      onDelete: "CASCADE",
    },
    carts: {
      type: "many-to-one",
      target: "Cart",
      joinColumn: true,
      onDelete: "CASCADE",
    },
  },
});
