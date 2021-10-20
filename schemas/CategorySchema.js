const EntitySchema = require("typeorm").EntitySchema;
const Category = require("../models/Category").Category;

module.exports = new EntitySchema({
  name: "Category",
  target: Category,
  columns: {
    id: {
      primary: true,
      type: "bigint",
      generated: "true",
    },
    title: {
      type: "varchar",
    },
  },
  relations: {
    _: {
      type: "many-to-many",
      target: "Product",
      joinTable: true,
    },
  },
});
