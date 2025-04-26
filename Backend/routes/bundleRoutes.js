const express = require('express');
const router = express.Router();
const bundleController = require('../controller/BundleController');
const upload = require("../config/multer");

// Create bundle (with image)
router.post('/', upload.single('mainImage'), bundleController.createBundle);

// Get all bundles
router.get('/', bundleController.getAllBundles);

// Get one bundle
router.get('/:id', bundleController.getBundleById);

// Update bundle (with optional image update)
router.put('/:id', upload.single('mainImage'), bundleController.updateBundle);

// Delete bundle
router.delete('/:id', bundleController.deleteBundle);

module.exports = router;
