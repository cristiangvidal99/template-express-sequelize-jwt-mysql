const { User } = require('../models');

class UserService {
  async getAllUsers() {
    return User.findAll({ order: [['id', 'ASC']] });
  }

  async getUserById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.status = 404;
      throw error;
    }

    return user;
  }
}

module.exports = new UserService();
