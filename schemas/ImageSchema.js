const { EntitySchema } = require('typeorm');
const { Image } = require('../models/Image');

module.exports = new EntitySchema({
  name: 'Image',
  target: Image,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    src: {
      type: 'varchar',
    },
    srcHover: {
      type: 'varchar',
    },
    color: {
      type: 'varchar',
    },
    imgAlt: {
      type: 'varchar',
    },
  },
  relations: {
    product: {
      type: 'many-to-one',
      target: 'Product',
      joinColumn: true,
      onDelete: 'CASCADE',
    },
  },
});
