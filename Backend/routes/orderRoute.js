const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController'); 
const { auth, adminAuth } = require('../middleware/authMiddleware');

router.post('/create-order', orderController.createOrder);

router.get('/all-orders', auth, adminAuth , orderController.getAllOrders);

router.get('/orders-by-email', orderController.getOrdersByEmail);

router.put('/update-order-status/:orderId', auth, adminAuth ,orderController.updateOrderStatus);

router.delete('/delete-order/:orderId',auth, adminAuth , orderController.deleteOrder);

module.exports = router;
