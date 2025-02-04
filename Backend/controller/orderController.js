const Order = require('../model/Order'); 
const Cart = require('../model/Cart'); 
const sendEmail = require('../utils/sendMails'); 

// Create a new order
exports.createOrder = async (req, res) => {
    try {
      const {
        fullName,
        email,
        sessionId,
        shippingInfo,
        paymentMethod,
      } = req.body;
  
      // Validate sessionId
      const cart = await Cart.findOne({ sessionId }).populate('items.product', 'name price');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this session ID' });
      }
  
      // Calculate total price
      const totalPrice = cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
  
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
      });
  
      // Save the order
      await order.save();
  
      // Email content
      const htmlContent = `
        <h2 style="color: #4CAF50;">Order Confirmation</h2>
        <p>Hi <strong>${fullName}</strong>,</p>
        <p>Thank you for shopping with us! Your order has been successfully placed. Below are the details:</p>
  
        <h3>Order Summary:</h3>
        <ul style="list-style-type: none; padding: 0;">
          ${cart.items
            .map(
              item =>
                `<li style="margin-bottom: 10px;">
                  <strong>${item.product.name}</strong><br>
                  Quantity: ${item.quantity}<br>
                  Price: $${item.product.price} x ${item.quantity} = <strong>$${item.product.price * item.quantity}</strong>
                </li>`
            )
            .join('')}
        </ul>
        <p style="font-size: 16px;"><strong>Total Price:</strong> $${totalPrice}</p>
  
        <h3>Shipping Information:</h3>
        <p>
          <strong>Address:</strong> ${shippingInfo.address}<br>
          <strong>City:</strong> ${shippingInfo.city}<br>
          <strong>Phone:</strong> ${shippingInfo.phoneNo}<br>
          <strong>WhatsApp:</strong> ${shippingInfo.whatsAppNo}
        </p>
  
        <h3>Payment Method:</h3>
        <p>${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}</p>
  
        <h3>What’s Next?</h3>
        <p>Your order is currently being processed. We will send you another email once your items have been shipped. If you have any questions or need assistance, feel free to contact our customer support team.</p>
  
        <h3>Need Help?</h3>
        <p>Reply to this email or contact us directly at <a href="mailto:support@example.com">support@example.com</a>.</p>
  
        <p style="color: #4CAF50; font-size: 14px;">Best Regards, <br>Your Brand Name</p>
      `;
  
      // Send email
      await sendEmail(email, 'Order Confirmation', htmlContent);
  
      res.status(201).json({ message: 'Order created successfully', order });
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
