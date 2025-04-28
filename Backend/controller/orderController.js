const Order = require('../model/Order');
const Cart = require('../model/Cart');
const Product = require('../model/Product');
const PerfumeBundle = require('../model/PerfumeBundle');
const CustomPerfume = require('../model/CustomPerfume');

// Create a new order from cart
exports.createOrder = async (req, res) => {
  try {
    const { sessionId, customer, paymentMethod } = req.body;

    // Find cart by sessionId
    const cart = await Cart.findOne({ sessionId })
      .populate('items.product')
      .populate('bundle')
      .populate('customItems.perfumeId');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    // Prepare order items array
    const orderItems = [];
    let totalPrice = 0;

    // Add regular products
    if (cart.items && cart.items.length > 0) {
      for (const item of cart.items) {
        if (!item.product) continue;
        
        const orderItem = {
          itemType: 'Product',
          item: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        };
        
        orderItems.push(orderItem);
        totalPrice += item.product.price * item.quantity;
        
        // Update product stock
        await Product.findByIdAndUpdate(
          item.product._id,
          { 
            $inc: { 
              stock: -item.quantity,
              quantitySold: item.quantity 
            } 
          }
        );
      }
    }

    // Add bundle items
    if (cart.bundle) {
      // For bundle, we need to calculate the discount where the least expensive perfume is free
      let bundlePrice = 0;
      let selectedPerfumesWithDetails = [];
      
      if (cart.selectedPerfumes && cart.selectedPerfumes.length > 0) {
        // Sort selected perfumes by price to identify the least expensive one
        const sortedPerfumes = [...cart.selectedPerfumes].sort((a, b) => a.price - b.price);
        const leastExpensivePerfume = sortedPerfumes[0];
        
        // Calculate the total price minus the least expensive perfume
        bundlePrice = cart.selectedPerfumes.reduce((sum, p) => sum + p.price, 0) - leastExpensivePerfume.price;
        
        // Map selected perfumes to include full details
        selectedPerfumesWithDetails = cart.selectedPerfumes.map(p => ({
          perfumeName: p.name,
          brand: p.brand || '', // Use brand from the perfume if available
          price: p.price,
          isFree: p.name === leastExpensivePerfume.name // Mark the free perfume
        }));
      }
      
      const orderItem = {
        itemType: 'PerfumeBundle',
        item: cart.bundle._id,
        quantity: cart.bundleQuantity,
        size: cart.bundleSize,
        customDetails: {
          selectedPerfumes: selectedPerfumesWithDetails,
          size: cart.bundleSize,
          discount: {
            type: "buy4get1free",
            freeItemValue: selectedPerfumesWithDetails.length > 0 ? 
                           selectedPerfumesWithDetails.find(p => p.isFree)?.price || 0 : 0
          }
        },
        price: bundlePrice || cart.finalPrice || 0
      };
      
      orderItems.push(orderItem);
      totalPrice += (bundlePrice || cart.finalPrice || 0) * cart.bundleQuantity;
    }

    // Add custom perfume items
    if (cart.customItems && cart.customItems.length > 0) {
      for (const item of cart.customItems) {
        if (!item.perfumeId) continue;
        
        const orderItem = {
          itemType: 'CustomPerfume',
          item: item.perfumeId._id,
          quantity: item.quantity,
          size: item.size,
          price: item.perfumeId.price,
        };
        
        orderItems.push(orderItem);
        totalPrice += item.perfumeId.price * item.quantity;
      }
    }

    // Create the order
    const order = new Order({
      customer,
      items: orderItems,
      totalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Pending',
      orderStatus: 'Processing'
    });

    await order.save();

    // Clear the cart after successful order
    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json({ 
      message: 'Order created successfully.', 
      orderId: order._id,
      orderTotal: order.totalPrice
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    
    // Populate item details
    const populatedOrder = await Order.findById(id)
      .populate({
        path: 'items.item',
        model: (doc) => {
          switch(doc.itemType) {
            case 'Product': return 'Product';
            case 'PerfumeBundle': return 'PerfumeBundle';
            case 'CustomPerfume': return 'CustomPerfume';
            default: return 'Product';
          }
        }
      });
    
    res.status(200).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get orders by customer email
exports.getOrdersByCustomer = async (req, res) => {
  try {
    const { email } = req.params;
    
    const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    
    const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Pending'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: 'Invalid order status.' });
    }
    
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    
    res.status(200).json({ 
      message: 'Order status updated successfully.',
      order 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, transactionId } = req.body;
    
    const validStatuses = ['Pending', 'Paid', 'Failed'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ error: 'Invalid payment status.' });
    }
    
    const updates = { paymentStatus };
    if (transactionId) {
      updates.transactionId = transactionId;
    }
    
    const order = await Order.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    
    res.status(200).json({ 
      message: 'Payment status updated successfully.',
      order 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    
    // Only allow cancellation if order isn't delivered yet
    if (order.orderStatus === 'Delivered') {
      return res.status(400).json({ 
        error: 'Cannot cancel an order that has already been delivered.' 
      });
    }
    
    // Update order status
    order.orderStatus = 'Cancelled';
    await order.save();
    
    // Restore product stock for cancelled orders
    for (const item of order.items) {
      if (item.itemType === 'Product') {
        await Product.findByIdAndUpdate(
          item.item,
          { 
            $inc: { 
              stock: item.quantity,
              quantitySold: -item.quantity 
            } 
          }
        );
      }
    }
    
    res.status(200).json({ 
      message: 'Order cancelled successfully.',
      order 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order summary/stats for admin dashboard
exports.getOrderStats = async (req, res) => {
  try {
    // Get total number of orders
    const totalOrders = await Order.countDocuments();
    
    // Get orders by status
    const processingOrders = await Order.countDocuments({ orderStatus: 'Processing' });
    const shippedOrders = await Order.countDocuments({ orderStatus: 'Shipped' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'Cancelled' });
    
    // Get total revenue (from delivered orders)
    const revenueData = await Order.aggregate([
      { $match: { orderStatus: 'Delivered' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]);
    
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      totalOrders,
      statusCounts: {
        processing: processingOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders
      },
      totalRevenue,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Apply discount to order
exports.applyDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const { discountCode, percentage } = req.body;
    
    if (!discountCode || !percentage || percentage <= 0 || percentage > 100) {
      return res.status(400).json({ error: 'Invalid discount details.' });
    }
    
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    
    // Calculate discount amount
    const amountSaved = (order.totalPrice * percentage) / 100;
    const newTotalPrice = order.totalPrice - amountSaved;
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        discountApplied: {
          code: discountCode,
          percentage,
          amountSaved
        },
        totalPrice: newTotalPrice
      },
      { new: true }
    );
    
    res.status(200).json({
      message: 'Discount applied successfully.',
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};