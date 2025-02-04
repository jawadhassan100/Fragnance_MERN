const Cart = require('../model/Cart'); 


// Add item to Cart
exports.addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ sessionId });

    if (cart) {
      const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (productIndex >= 0) {
    
        cart.items[productIndex].quantity += quantity;
      } else {
       
        cart.items.push({ product: productId, quantity });
      }

      cart.lastModified = new Date();
      await cart.save();
    } else {
      
      cart = new Cart({
        sessionId,
        items: [{ product: productId, quantity }]
      });

      await cart.save();
    }

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit quantity of an item in the Cart
exports.editCartItem = async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (productIndex < 0) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    cart.items[productIndex].quantity = quantity;
    cart.lastModified = new Date();
    await cart.save();
    res.status(200).json({ message: 'Product quantity updated', cart });
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
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    cart.lastModified = new Date();
    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


