const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', UserController.list.bind(UserController));
router.get('/:id', UserController.getById.bind(UserController));

module.exports = router;
