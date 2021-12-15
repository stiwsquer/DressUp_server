const { EntitySchema } = require('typeorm');
const { User } = require('../models/User');

module.exports = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: 'true',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'text',
    },
    admin: {
      type: 'smallint',
      nullable: true,
    },
    firstName: {
      type: 'varchar',
      nullable: true,
    },
    lastName: {
      type: 'varchar',
      nullable: true,
    },
    phoneNumber: {
      type: 'varchar',
      nullable: true,
    },
    companyName: {
      type: 'varchar',
      nullable: true,
    },
    birthMonth: {
      type: 'varchar',
      nullable: true,
    },
    adressLine1: {
      type: 'text',
      nullable: true,
    },
    adressLine2: {
      type: 'text',
      nullable: true,
    },
    city: {
      type: 'varchar',
      nullable: true,
    },
    state: {
      type: 'varchar',
      nullable: true,
    },
    zip: {
      type: 'varchar',
      nullable: true,
    },
    country: {
      type: 'varchar',
      nullable: true,
    },
  },
});
