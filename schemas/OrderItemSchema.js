const { EntitySchema } = require('typeorm');
const { OrderItem } = require('../models/OrderItem');

module.exports = new EntitySchema({
  name: 'OrderItem',
  target: OrderItem,
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
    order: {
      type: 'many-to-one',
      target: 'Order',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
