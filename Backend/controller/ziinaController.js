const axios = require('axios');
const Order = require('../model/Order');
const CustomPerfumeOrder = require('../model/CustomPerfumeOrder');

require('dotenv').config();

// Create Payment Link
exports.createZiinaPayment = async (req, res) => {
  const { fullName, email, amount, orderType, orderId } = req.body;
  
  // Validate request data
  if (!fullName || !email || !amount || !orderType || !orderId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

  // Get base URL from environment variables
  const baseUrl = process.env.FRONTEND_URL || 'https://yourperfumesite.com';
  
  try {
    const response = await axios.post('https://api-v2.ziina.com/api/payment_intent', {
      amount: Number(amount),
      currency_code: 'AED',
      customer: {
        name: fullName,
        email,
      },
      metadata: {
        orderId,
        orderType,
      },
      test: true, 
      success_url: `${baseUrl}/payment-success?orderId=${orderId}&type=${orderType}`,
      cancel_url: `${baseUrl}/payment-cancelled?orderId=${orderId}&type=${orderType}`,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.ZIINA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Ziina Payment Response:', response.data);
    
    // Save payment attempt to database
    if (orderType === 'regular') {
      await Order.findByIdAndUpdate(orderId, {
        paymentMethod: 'ziina',
        paymentStatus: 'Pending',
      });
    } else if (orderType === 'custom') {
      await CustomPerfumeOrder.findByIdAndUpdate(orderId, {
        paymentMethod: 'ziina',
        paymentStatus: 'Pending',
      });
    }

    res.status(200).json({
      success: true,
      paymentUrl: response.data?.redirect_url,
paymentId: response.data?.id,
    });
  } catch (err) {
    console.error('Ziina Error:', err.response?.data || err.message);
    
    // More detailed error response
    res.status(500).json({ 
      success: false, 
      message: 'Payment link creation failed', 
      error: err.response?.data?.message || err.message 
    });
  }
};

// Webhook to update payment status
exports.ziinaWebhookHandler = async (req, res) => {
  try {
    // Verify webhook signature (add this for security)
    const signature = req.headers['ziina-signature'];
    // TODO: Implement signature verification with Ziina's documentation
    
    const event = req.body;

    // Extract important information
    const orderId = event?.metadata?.orderId;
    const orderType = event?.metadata?.orderType;
    const paymentStatus = event.status;
    const transactionId = event.transaction_id || event.id;

    if (!orderId || !orderType) {
      return res.status(400).json({ success: false, message: 'Invalid webhook data' });
    }

    // Log the incoming webhook data
    console.log('Ziina Webhook received:', {
      status: paymentStatus,
      orderId,
      orderType,
      transactionId
    });

    if (paymentStatus === 'paid') {
      // Common payment updates
      const paymentUpdates = {
        isPaid: true,
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        paymentMethod: 'ziina',
        transactionId: transactionId,
        updatedAt: new Date()
      };

      // Update the appropriate order type
      if (orderType === 'regular') {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          paymentUpdates,
          { new: true }
        );
        
        if (!updatedOrder) {
          console.error('Order not found:', orderId);
          return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        console.log('Regular order updated:', updatedOrder._id);
      } else if (orderType === 'custom') {
        const updatedCustomOrder = await CustomPerfumeOrder.findByIdAndUpdate(
          orderId,
          paymentUpdates,
          { new: true }
        );
        
        if (!updatedCustomOrder) {
          console.error('Custom order not found:', orderId);
          return res.status(404).json({ success: false, message: 'Custom order not found' });
        }
        
        console.log('Custom order updated:', updatedCustomOrder._id);
      } else {
        console.error('Unknown order type:', orderType);
        return res.status(400).json({ success: false, message: 'Unknown order type' });
      }
    } else if (paymentStatus === 'failed' || paymentStatus === 'canceled') {
      // Handle failed payments
      const failureUpdates = {
        paymentStatus: 'Failed',
        orderStatus: 'Cancelled',
        transactionId: transactionId,
        updatedAt: new Date()
      };
      
      if (orderType === 'regular') {
        await Order.findByIdAndUpdate(orderId, failureUpdates);
      } else if (orderType === 'custom') {
        await CustomPerfumeOrder.findByIdAndUpdate(orderId, failureUpdates);
      }
      
      console.log(`Payment ${paymentStatus} for order:`, orderId);
    }

    // Acknowledge the webhook
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
