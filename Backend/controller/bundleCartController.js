const BundleCart = require('../model/BundleCart');
const PerfumeBundle = require('../model/PerfumeBundle');

exports.addToBundleCart = async (req, res) => {
  try {
    const { sessionId, bundleId, selectedPerfumes, quantity, size } = req.body;
    
    if (!sessionId) return res.status(400).json({ success: false, message: "Session ID required" });
    
    // Validate perfumes array
    if (!Array.isArray(selectedPerfumes) || selectedPerfumes.length === 0) {
      return res.status(400).json({ success: false, message: "Selected perfumes are required" });
    }
    
    // Get the bundle to verify the selected perfumes
    const bundle = await PerfumeBundle.findById(bundleId);
    if (!bundle) {
      return res.status(404).json({ success: false, message: "Bundle not found" });
    }
    
    // Calculate price based on the selected perfumes
    const perfumePrices = selectedPerfumes.map(perfume => perfume.price);
    const totalPrice = perfumePrices.reduce((sum, price) => sum + price, 0);
    const mostExpensive = Math.max(...perfumePrices);
    const discounted = totalPrice - mostExpensive;
    const finalPrice = discounted * quantity;
    
    let existing = await BundleCart.findOne({ sessionId });
    
    if (existing) {
      existing.bundle = bundleId;
      existing.selectedPerfumes = selectedPerfumes;
      existing.quantity = quantity;
      existing.size = size;
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
      size,
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
    
    // Calculate the updated price based on quantity
    const perfumePrices = cart.selectedPerfumes.map(perfume => perfume.price);
    const totalPrice = perfumePrices.reduce((sum, price) => sum + price, 0);
    const mostExpensive = Math.max(...perfumePrices);
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

exports.updateSize = async (req, res) => {
  const { sessionId, size } = req.body;
  
  try {
    const cart = await BundleCart.findOne({ sessionId });
    
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
    
    // Validate size
    if (!['50ml', '100ml', '200ml'].includes(size)) {
      return res.status(400).json({ success: false, message: "Invalid size" });
    }
    
    cart.size = size;
    cart.lastModified = new Date();
    
    await cart.save();
    
    res.status(200).json({ success: true, message: "Size updated", cart });
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
    // Populate only the bundle reference, not the selectedPerfumes since they're now embedded
    const cart = await BundleCart.findOne({ sessionId }).populate('bundle');
    
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });
    
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};