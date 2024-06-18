const express = require('express');
const router = express.Router();
const logInController = require('../controllers/logInController');

// App routes
router.get('/login', logInController.loginPage);

module.exports = router;