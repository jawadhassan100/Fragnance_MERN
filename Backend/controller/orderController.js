const Order = require('../model/Order'); 
const Cart = require('../model/Cart'); 
const sendEmail = require('../utils/sendMails'); 
const orderConfirmation = require('../utils/templates/orderConfirmation');
const Product = require('../model/Product'); 
const DiscountCode = require('../model/DiscountCode');
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,
      sessionId,
      shippingInfo,
      paymentMethod,
      discountCode // New field for discount code
    } = req.body;

    // Validate sessionId
    const cart = await Cart.findOne({ sessionId }).populate('items.product', 'name price');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this session ID' });
    }

    // Check stock and update product quantities
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product.name}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `${product.name} is out of stock or has insufficient quantity.` });
      }

      // Update stock and quantitySold
      product.stock -= item.quantity;
      product.quantitySold = (product.quantitySold || 0) + item.quantity;

      await product.save();
    }

    // Calculate total price
    let totalPrice = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    let discountAmount = 0;
    let appliedDiscount = null;

    // Process discount code if provided
    if (discountCode) {
      const discount = await DiscountCode.findOne({
        code: discountCode,
        isUsed: false,
        expiresAt: { $gt: Date.now() }
      });

      if (discount) {
        // Verify the discount code is for this session or email
        if (discount.sessionId === sessionId || discount.email === email) {
          discountAmount = (totalPrice * discount.discount) / 100;
          totalPrice -= discountAmount;
          
          // Mark discount code as used
          discount.isUsed = true;
          await discount.save();
          
          appliedDiscount = {
            code: discount.code,
            percentage: discount.discount,
            amountSaved: discountAmount
          };
        } else {
          return res.status(400).json({ message: 'Invalid discount code for this session' });
        }
      } else {
        return res.status(400).json({ message: 'Invalid or expired discount code' });
      }
    }

    // Create the order
    const order = new Order({
      fullName,
      email,
      sessionId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      shippingInfo,
      paymentMethod,
      totalPrice,
      discountApplied: appliedDiscount // Add this field to your Order schema
    });

    // Save the order
    await order.save();

    // Save email to cart for future reference
    if (!cart.email) {
      cart.email = email;
      await cart.save();
    }

    const customerHtmlContent = orderConfirmation(
      fullName, 
      cart, 
      totalPrice, 
      shippingInfo, 
      paymentMethod, 
      appliedDiscount
    );
    
    // Send email
    await sendEmail(email, 'Order Confirmation', customerHtmlContent);

    res.status(201).json({ 
      message: 'Order created successfully', 
      order,
      discountApplied: appliedDiscount
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product', 'name price')
      .exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// get order by email 
exports.getOrdersByEmail = async (req, res) => {
    try {
      const { email } = req.query;
  
      if (!email) {
        return res.status(400).json({ message: 'Email is required to fetch orders' });
      }
  
      const orders = await Order.find({ email })
        .populate('items.product', 'name price')
        .exec();
  
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this email' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
  };
// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};
