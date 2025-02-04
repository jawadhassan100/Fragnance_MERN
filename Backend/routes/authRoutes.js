const express = require('express');
const { register, login, logout } = require('../controller/authController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', auth, logout);


module.exports = router;
