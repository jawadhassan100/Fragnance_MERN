// controllers/bundleCartController.js
const Product = require('../model/Product');
const BundleCart = require('../model/BundleCart');

exports.addToBundleCart = async (req, res) => {
  try {
    const { sessionId, bundleId, selectedPerfumes, quantity } = req.body;

    if (!sessionId) return res.status(400).json({ success: false, message: "Session ID required" });
    if (!Array.isArray(selectedPerfumes) || selectedPerfumes.length !== 4) {
      return res.status(400).json({ success: false, message: "Select exactly 4 perfumes" });
    }

    const perfumesData = await Product.find({ _id: { $in: selectedPerfumes } });
    const prices = perfumesData.map(p => p.price);
    const totalPrice = prices.reduce((sum, p) => sum + p, 0);
    const mostExpensive = Math.max(...prices);
    const discounted = totalPrice - mostExpensive;
    const finalPrice = discounted * quantity;

    let existing = await BundleCart.findOne({ sessionId });

    if (existing) {
      existing.bundle = bundleId;
      existing.selectedPerfumes = selectedPerfumes;
      existing.quantity = quantity;
      existing.totalBeforeDiscount = totalPrice;
      existing.discountAmount = mostExpensive;
      existing.finalPrice = finalPrice;
      existing.lastModified = new Date();
      await existing.save();
      return res.status(200).json({ success: true, message: "Bundle cart updated", cart: existing });
    }

    const newCart = new BundleCart({
      sessionId,
      bundle: bundleId,
      selectedPerfumes,
      quantity,
      totalBeforeDiscount: totalPrice,
      discountAmount: mostExpensive,
      finalPrice,
    });

    await newCart.save();

    res.status(200).json({ success: true, message: "Bundle cart created", cart: newCart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
    const { sessionId, quantity } = req.body;
  
    try {
      const cart = await BundleCart.findOne({ sessionId });
  
      if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
  
      const perfumesData = await Product.find({ _id: { $in: cart.selectedPerfumes } });
      const prices = perfumesData.map(p => p.price);
      const totalPrice = prices.reduce((sum, p) => sum + p, 0);
      const mostExpensive = Math.max(...prices);
      const discounted = totalPrice - mostExpensive;
      const finalPrice = discounted * quantity;
  
      cart.quantity = quantity;
      cart.totalBeforeDiscount = totalPrice;
      cart.discountAmount = mostExpensive;
      cart.finalPrice = finalPrice;
      cart.lastModified = new Date();
  
      await cart.save();
  
      res.status(200).json({ success: true, message: "Quantity updated", cart });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  

  exports.clearCart = async (req, res) => {
    const { sessionId } = req.body;
  
    try {
      const deleted = await BundleCart.findOneAndDelete({ sessionId });
  
      if (!deleted) return res.status(404).json({ success: false, message: "No cart to delete" });
  
      res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  
  exports.getCart = async (req, res) => {
    const { sessionId } = req.params;
  
    try {
      const cart = await BundleCart.findOne({ sessionId }).populate('selectedPerfumes');
  
      if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
  
      res.status(200).json({ success: true, cart });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  