const { EntitySchema } = require('typeorm');
const { Product } = require('../models/Product');

module.exports = new EntitySchema({
  name: 'Product',
  target: Product,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    title: {
      type: 'varchar',
      unique: true,
    },
    text: {
      type: 'text',
    },
    price: {
      type: 'int',
    },
    quantity: {
      type: 'smallint',
    },
  },
});
