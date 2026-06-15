const express = require('express');
const HomeController = require('../controllers/HomeController');

const router = express.Router();

router.get('/', HomeController.index.bind(HomeController));

module.exports = router;
