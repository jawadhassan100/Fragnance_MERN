const express = require('express');
const router = express.Router();
const bundleOrderController = require('../controller/bundleOrder');


router.post('/bundle/order', bundleOrderController.placeOrder);

module.exports = router;
