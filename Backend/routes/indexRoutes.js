const express = require('express');
const router = express.Router();
const userRoutes = require('./authRoutes');
const productRoutes  =require('./productRoutes')
const customPerfumeRoutes  =require('./customPerfumeRoutes')
const cartRoutes  =require('./cartRoutes')
const customPerfumeOrderRoutes  =require('./customPerfumeOrderRoutes')
const orderRoute  =require('./orderRoute')
const contactRoutes  =require('./contactRoutes')
const paymentRoutes = require('./paymentRoutes')
const newsLetterRoutes = require('./newsLetterRoutes')
const bundleCartRoutes = require('./bundleCartRoutes')
const bundleOrderRoutes = require('./bundleOrder')
const customCartRoutes = require('./customCartRoutes')  
const bundleRoutes = require('./bundleRoutes')


router.use('/api', userRoutes);
router.use('/product', productRoutes);
router.use('/customPerfume', customPerfumeRoutes);
router.use('/cart', cartRoutes);
router.use('/customOrder', customPerfumeOrderRoutes);
router.use('/order', orderRoute);
router.use('/contact', contactRoutes);
router.use('/payment', paymentRoutes);
router.use('/newsletter', newsLetterRoutes);
router.use('/bundleCart', bundleCartRoutes);
router.use('/bundleOrder', bundleOrderRoutes);
router.use('/customCart', customCartRoutes);
router.use('/bundle', bundleRoutes);


module.exports = router;