const CustomPerfumeOrder = require('../model/CustomPerfumeOrder');
const CustomPerfume = require('../model/CustomPerfume'); 
const sendEmail = require('../utils/sendMails'); 

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

    let htmlContent = `
    <h3>Order Confirmation</h3>
    <p>Thank you for your order, ${fullName}!</p>
    <p>We're thrilled to have you as a customer, and we can't wait for you to experience the unique fragrances you selected!</p>
    <p>Your order details are as follows:</p>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Shipping Address:</strong> ${shippingInfo.address}, ${shippingInfo.city}</li>
      <li><strong>Phone:</strong> ${shippingInfo.phoneNo}</li>
      <li><strong>WhatsApp:</strong> ${shippingInfo.whatsAppNo}</li>
      <li><strong>Payment Method:</strong> ${paymentMethod}</li>
      <li><strong>Total Price:</strong> $${totalPrice}</li>
    </ul>
    
    <h4>Perfume Details:</h4>
    <p>We believe every fragrance has its own story. Here's the story of the perfumes you've selected:</p>
    <ul>
      ${selectedPerfumes.map((perfume, index) => `
        <li>
          <strong>Perfume Name:</strong> ${perfumeNames}<br>
          <strong>Brand:</strong> ${perfume.brand}<br>
          <strong>Size:</strong> ${perfumeDetails[index].size}<br>
          <strong>Quantity:</strong> ${perfumeDetails[index].quantity}
        </li>
      `).join('')}
    </ul>
    
    <p>Every spray of your new perfume will bring a new and amazing impression to the room. Get ready to leave a lasting mark wherever you go!</p>
    <p>We are preparing your order, and it will be shipped soon. You’ll be one step closer to indulging in a fragrance that tells your story.</p>
    
    <p>If you have any questions or need assistance, feel free to reach out to us. We're here to help!</p>
    <p>Thank you for choosing us – we look forward to serving you again soon!</p>
  `;

  // Send confirmation email to the customer
  sendEmail(email, 'Order Confirmation', htmlContent);

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

