const express = require('express');
const router = express.Router();
const ziinaController = require('../controller/ziinaController');

router.post('/ziina', ziinaController.createZiinaPayment);
router.post('/ziina/webhook', express.json({ type: '*/*' }), ziinaController.ziinaWebhookHandler);

module.exports = router;
