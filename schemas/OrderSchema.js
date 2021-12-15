const { EntitySchema } = require('typeorm');
const { Order } = require('../models/Order');

module.exports = new EntitySchema({
  name: 'Order',
  target: Order,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    status: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamp',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
