const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const upload = require("../config/multer");
const { auth, adminAuth } = require("../middleware/authMiddleware");


router.post('/add',auth,adminAuth, upload.array('images', 5), productController.addProduct);
router.get('/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/edit/:id',auth,adminAuth, upload.array('images', 5), productController.editProduct);
router.delete('/delete/:id',auth,adminAuth, productController.deleteProduct);
router.get('/admin/stock',auth,adminAuth, productController.getProductStockForAdmin);

module.exports = router;
