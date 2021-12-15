const { EntitySchema } = require('typeorm');
const { Category } = require('../models/Category');

module.exports = new EntitySchema({
  name: 'Category',
  target: Category,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    title: {
      type: 'varchar',
    },
  },
  relations: {
    categories: {
      type: 'many-to-many',
      target: 'Product',
      joinTable: {
        name: 'category_product',
      },
    },
  },
});
