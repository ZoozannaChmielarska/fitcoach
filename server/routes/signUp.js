const express = require('express');
const router = express.Router();
const signUpController = require('../controllers/signUpController');

// App routes
router.get('/signup', signUpController.signupPage);

module.exports = router;