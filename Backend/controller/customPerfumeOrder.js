const CustomPerfumeOrder = require('../model/CustomPerfumeOrder');
const CustomPerfume = require('../model/CustomPerfume'); 
const sendEmail = require('../utils/sendMails'); 
const customOrderConfirmation = require('../utils/templates/customOrderConfirmation');


exports.createCustomPerfumeOrder = async (req, res) => {
  try {
    const { fullName, email, shippingInfo, paymentMethod, selectedPerfumes, perfumeDetails } = req.body;

    let totalPrice = 0;

    // Loop through the perfume details and calculate the total price
    for (const detail of perfumeDetails) {
      const perfume = await CustomPerfume.findOne({ perfumeName: selectedPerfumes.find(p => p.brand === detail.brand).perfumeName, brand: detail.brand });

      if (!perfume) {
        return res.status(404).json({ error: 'Perfume not found' });
      }

      const perfumePrice = perfume.price * detail.quantity;
      totalPrice += perfumePrice;
    }

    // Create the custom perfume order
    const customPerfumeOrder = new CustomPerfumeOrder({
      fullName,
      email,
      selectedPerfumes,
      perfumeDetails,
      shippingInfo,
      paymentMethod,
      totalPrice,
    });

    // Save the order
    await customPerfumeOrder.save();

    const perfumeNames = selectedPerfumes.map((perfume) => perfume.perfumeName).join(' - ');
    const customerHtmlContent = customOrderConfirmation(fullName, selectedPerfumes, perfumeDetails, totalPrice, shippingInfo, paymentMethod , perfumeNames);

  // Send confirmation email to the customer
  sendEmail(email, 'Order Confirmation', customerHtmlContent);

  // Send a response to the client
  res.status(201).json({
    message: 'Order created successfully!',
    order: newOrder,
  });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while creating the order',
      message: error.message
    });
  }
};

// fetch all orders
exports.getCustomPerfumeOrders = async (req, res) => {
  try {
    const orders = await CustomPerfumeOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch orders',
      message: error.message
    });
  }
};


exports.getCustomPerfumeOrderByEmail = async (req, res) => {
    try {
        const { email } = req.query; // Get email from query parameters
    
        if (!email) {
          return res.status(400).json({ message: "Email is required to fetch orders" });
        }
    
        const orders = await CustomPerfumeOrder.find({ email })
        
    
        if (orders.length === 0) {
          return res.status(404).json({ message: "No orders found for this email" });
        }
    
        res.status(200).json({ orders });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

// To delete an order by ID
exports.deleteCustomPerfumeOrder = async (req, res) => {
  try {
    const { id } = req.params; // Get order ID from the URL params

    const order = await CustomPerfumeOrder.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete the order',
      message: error.message
    });
  }
};

// Admin can update the order status 
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { orderStatus } = req.body; 

    // Ensure the order status is valid
    const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned', 'Pending'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }

    const order = await CustomPerfumeOrder.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order status
    order.orderStatus = orderStatus;
    await order.save(); // Save the updated order

    res.status(200).json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update the order status',
      message: error.message
    });
  }
};

