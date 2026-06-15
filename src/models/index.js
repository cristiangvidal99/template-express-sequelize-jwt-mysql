const { sequelize } = require('../db/connection');
const User = require('./User');

module.exports = {
  sequelize,
  User,
};
