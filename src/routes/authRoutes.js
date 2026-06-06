const express = require('express');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', AuthController.register.bind(AuthController));
router.post('/login', AuthController.login.bind(AuthController));
router.get('/me', authMiddleware, AuthController.me.bind(AuthController));

module.exports = router;
