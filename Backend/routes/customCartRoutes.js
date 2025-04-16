const express = require('express');
const router = express.Router();
const customCartController = require('../controller/customPerfumeCartController'); 

router.post('/custom/cart/add', customCartController.addToCart);
router.get('/custom/cart', customCartController.getCart);
router.post('/custom/cart/update', customCartController.updateCartItem);
router.post('/custom/cart/remove', customCartController.removeItemFromCart);

module.exports = router;
