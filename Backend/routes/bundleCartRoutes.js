const express = require('express');
const router = express.Router();
const cartController = require('../controller/bundleCartController');

router.post('/add', cartController.addToBundleCart);
router.post('/update-quantity', cartController.updateQuantity);
router.post('/clear', cartController.clearCart);
router.get('/:sessionId', cartController.getCart);

module.exports = router;