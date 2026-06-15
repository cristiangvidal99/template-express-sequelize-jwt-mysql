const { User } = require('../models');

async function getAllUsers() {
    return User.findAll({ order: [['id', 'ASC']] });
  }

async function getUserById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.status = 404;
      throw error;
    }

    return user;
  }

module.exports = {
    getAllUsers,
    getUserById
}
