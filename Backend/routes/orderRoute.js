const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController'); 
const { auth, adminAuth } = require('../middleware/authMiddleware');

// Create a new order
router.post('/create', orderController.createOrder);

// Get all orders (admin)
router.get('/all', orderController.getAllOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Get orders by customer email
router.get('/customer/:email', orderController.getOrdersByCustomer);

// Update order status
router.patch('/:id/status', orderController.updateOrderStatus);

// Update payment status
router.patch('/:id/payment', orderController.updatePaymentStatus);

// Cancel order
router.patch('/:id/cancel', orderController.cancelOrder);

// Get order stats for admin dashboard
router.get('/stats/admin', orderController.getOrderStats);

// Apply discount to order
router.patch('/:id/discount', orderController.applyDiscount);


module.exports = router;
