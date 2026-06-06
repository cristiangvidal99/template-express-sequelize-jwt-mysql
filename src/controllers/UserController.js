const UserService = require('../services/UserService');

class UserController {
  async list(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.json({ data: users });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
