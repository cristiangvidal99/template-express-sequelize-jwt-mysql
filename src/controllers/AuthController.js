const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await AuthService.login(req.body);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      const user = await UserService.getUserById(req.user.userId);
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
