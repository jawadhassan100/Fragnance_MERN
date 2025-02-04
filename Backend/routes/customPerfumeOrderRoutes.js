const express = require('express');
const router = express.Router();
const customPerfumeOrder = require('../controller/customPerfumeOrder');
const { auth, adminAuth } = require("../middleware/authMiddleware");

router.post('/create' , customPerfumeOrder.createCustomPerfumeOrder)
router.get('/orders/custom/all', auth, adminAuth , customPerfumeOrder.getCustomPerfumeOrders);
router.get('/custom/getByEmail', customPerfumeOrder.getCustomPerfumeOrderByEmail);
router.delete('/orders/custom/:id',auth, adminAuth , customPerfumeOrder.deleteCustomPerfumeOrder); 
router.patch('/orders/custom/:id/status',auth, adminAuth , customPerfumeOrder.updateOrderStatus);


module.exports = router;
