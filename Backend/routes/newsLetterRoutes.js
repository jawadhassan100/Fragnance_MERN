const express = require('express');
const router = express.Router();
const { subscribe } = require('../controller/newsletterController');

router.post('/subscribe', subscribe);

module.exports = router;
    