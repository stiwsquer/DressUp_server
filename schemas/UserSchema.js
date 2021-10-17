const EntitySchema = require("typeorm").EntitySchema;
const User = require("../models/User").User;

module.exports = new EntitySchema({
  name: "User",
  target: User,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "true",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "text",
    },
  },
});
