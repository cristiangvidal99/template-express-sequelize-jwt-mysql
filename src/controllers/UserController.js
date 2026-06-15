const UserService = require('../services/UserService');

async function list(req, res, next) {
    try {
        const users = await UserService.getAllUsers();
        res.json({ data: users });
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const user = await UserService.getUserById(req.params.id);
        res.json({ data: user });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    list,
    getById
}
