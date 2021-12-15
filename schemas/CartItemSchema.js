const { EntitySchema } = require('typeorm');
const { CartItem } = require('../models/CartItem');

module.exports = new EntitySchema({
  name: 'CartItem',
  target: CartItem,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    quantity: {
      type: 'smallint',
    },
  },
  relations: {
    product: {
      type: 'many-to-one',
      target: 'Product',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    cart: {
      type: 'many-to-one',
      target: 'Cart',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
