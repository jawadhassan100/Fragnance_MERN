const express = require('express');
const router = express.Router();
const customPerfumeController = require('../controller/customPerfumeController');
const { auth, adminAuth } = require("../middleware/authMiddleware");

router.post('/add',auth, adminAuth, customPerfumeController.createCustomPerfume);
router.get('/all', customPerfumeController.getAllCustomPerfumes);
router.get('/:id', customPerfumeController.getCustomPerfumeById); 
router.put('/edit/:id',auth, adminAuth, customPerfumeController.editCustomPerfume);
router.delete('/delete/:id',auth, adminAuth, customPerfumeController.deleteCustomPerfume);

module.exports = router;
