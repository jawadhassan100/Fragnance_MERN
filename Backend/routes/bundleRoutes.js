const express = require('express');
const router = express.Router();
const bundleController = require('../controller/BundleController');

// Create bundle
router.post('/bundle', bundleController.createBundle);

// Get all bundles
router.get('/bundle', bundleController.getAllBundles);

// Get one bundle
router.get('/bundle/:id', bundleController.getBundleById);

// Update bundle
router.put('/bundle/:id', bundleController.updateBundle);

// Delete bundle
router.delete('/bundle/:id', bundleController.deleteBundle);

module.exports = router;
