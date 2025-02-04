const express = require('express');
const router = express.Router();
const userRoutes = require('./authRoutes');
const productRoutes  =require('./productRoutes')
const customPerfumeRoutes  =require('./customPerfumeRoutes')
const cartRoutes  =require('./cartRoutes')
const customPerfumeOrderRoutes  =require('./customPerfumeOrderRoutes')
const orderRoute  =require('./orderRoute')
const contactRoutes  =require('./contactRoutes')

router.use('/api', userRoutes);
router.use('/product', productRoutes);
router.use('/customPerfume', customPerfumeRoutes);
router.use('/cart', cartRoutes);
router.use('/customOrder', customPerfumeOrderRoutes);
router.use('/order', orderRoute);
router.use('/contact', contactRoutes);


module.exports = router;