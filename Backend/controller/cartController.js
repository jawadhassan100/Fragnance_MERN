const Cart = require("../model/Cart");
const { v4: uuidv4 } = require('uuid');
const Product = require('../model/Product');
const CustomPerfume = require('../model/CustomPerfume');

// Add item to Cart
exports.addToCart = async (req, res) => {
  try {
    let { sessionId, items } = req.body;

    // If no sessionId, generate one
    if (!sessionId) {
      sessionId = uuidv4(); 
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({ sessionId, items: [], customItems: [] });
    }

    // Loop through items and add to cart
    for (const item of items) {
      if (item.type === "Product") {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        const existingProductIndex = cart.items.findIndex(
          (p) => p.product.toString() === item.productId
        );

        if (existingProductIndex > -1) {
          cart.items[existingProductIndex].quantity += item.quantity;
        } else {
          cart.items.push({
            product: item.productId,
            quantity: item.quantity
          });
        }

      } else if (item.type === "CustomPerfume") {
        const customPerfume = await CustomPerfume.findById(item.productId);
        if (!customPerfume) {
          return res.status(404).json({ error: 'Custom perfume not found' });
        }

        cart.customItems.push({
          perfumeId: item.productId,
          quantity: item.quantity,
          size: customPerfume.size // or from frontend if customizable
        });
      }
    }

    cart.lastModified = new Date();
    await cart.save();

    res.status(200).json({ message: "Items added to cart", cart, sessionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Edit quantity of an item in the Cart
exports.editCartItem = async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex < 0) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    cart.items[productIndex].quantity = quantity;
    cart.lastModified = new Date();
    await cart.save();
    res.status(200).json({ message: "Product quantity updated", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete item from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { sessionId, productId } = req.body;

    // Find the cart by sessionId
    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.lastModified = new Date();
    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add this function to your cart controller
exports.updateCartEmail = async (req, res) => {
  try {
    const { sessionId, email } = req.body;

    if (!sessionId || !email) {
      return res.status(400).json({ message: 'Session ID and email are required' });
    }

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.email = email;
    await cart.save();

    res.status(200).json({ message: 'Cart updated with email', cart });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart', error: error.message });
  }
};