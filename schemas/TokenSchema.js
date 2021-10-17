const EntitySchema = require("typeorm").EntitySchema;
const Token = require("../models/Token").Token;

module.exports = new EntitySchema({
  name: "Token",
  target: Token,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    token: {
      type: "text",
    },
  },
});
