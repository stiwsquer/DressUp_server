const EntitySchema = require("typeorm").EntitySchema;
const Product = require("../models/Product").Product;

module.exports = new EntitySchema({
  name: "Product",
  target: Product,
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: "true",
    },
    title: {
      type: "varchar",
    },
    text: {
      type: "text",
    },
    price: {
      type: "int",
    },
    quantity: {
      type: "smallint",
    },
  },
});
