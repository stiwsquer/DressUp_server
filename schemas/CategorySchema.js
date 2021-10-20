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
    parentCategory: {
      type: "one-to-many",
      target: "Category",
      joinColumn: true,
      onDelete: "CASCADE",
      nullable: true,
    },
    products: {
      type: "many-to-many",
      target: "Product",
      joinTable: true,
    },
  },
});
