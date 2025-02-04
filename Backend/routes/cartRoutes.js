const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');


router.post('/add', cartController.addToCart); 
router.put('/edit', cartController.editCartItem); 
router.delete('/remove', cartController.removeFromCart); 


module.exports = router;
