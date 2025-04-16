const Product = require('../model/Product'); 
const BundleOrder = require('../model/BundleOrder');

exports.placeOrder = async (req, res) => {
    const {
      bundleId,
      selectedPerfumes,
      quantity,
      customer,
      paymentMethod
    } = req.body;
  
    if (selectedPerfumes.length !== 4) {
      return res.status(400).json({ success: false, message: "Must select exactly 4 perfumes" });
    }
  
    const perfumes = await Product.find({ _id: { $in: selectedPerfumes } });
    const total = perfumes.reduce((sum, p) => sum + p.price, 0);
    const discounted = total - Math.max(...perfumes.map(p => p.price));
    const finalPrice = discounted * quantity;
  
    const order = new BundleOrder({
      bundle: bundleId,
      selectedPerfumes,
      quantity,
      price: finalPrice,
      customer,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid'
    });
  
    await order.save();
    res.status(201).json({ success: true, order });
  };
  