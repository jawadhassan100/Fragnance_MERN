const Cart = require('../model/CustomPerfumeCart');
const Perfume = require('../model/CustomPerfume');

// Add to cart
exports.addToCart = async (req, res) => {
  const { email, perfumeId, quantity, size } = req.body;

  let cart = await Cart.findOne({ email });

  if (!cart) {
    cart = new Cart({ email, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    item => item.perfumeId.toString() === perfumeId && item.size === size
  );

  if (existingItemIndex !== -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ perfumeId, quantity, size });
  }

  await cart.save();
  res.status(200).json({ message: 'Item added to cart', cart });
};

// Get Cart
exports.getCart = async (req, res) => {
  const { email } = req.query;
  const cart = await Cart.findOne({ email }).populate('items.perfumeId');
  if (!cart) return res.status(404).json({ message: 'Cart not found' });
  res.status(200).json(cart);
};

// Update Quantity
exports.updateCartItem = async (req, res) => {
  const { email, perfumeId, size, quantity } = req.body;

  const cart = await Cart.findOne({ email });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(
    item => item.perfumeId.toString() === perfumeId && item.size === size
  );

  if (!item) return res.status(404).json({ message: 'Item not found in cart' });

  item.quantity = quantity;
  await cart.save();
  res.status(200).json({ message: 'Quantity updated', cart });
};

// Remove item
exports.removeItemFromCart = async (req, res) => {
  const { email, perfumeId, size } = req.body;

  const cart = await Cart.findOne({ email });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(
    item => !(item.perfumeId.toString() === perfumeId && item.size === size)
  );

  await cart.save();
  res.status(200).json({ message: 'Item removed', cart });
};
