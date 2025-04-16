const orderConfirmation = (fullName, cart, totalPrice, shippingInfo, paymentMethod, appliedDiscount) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #000; background-color: lightgray; padding: 20px;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #000; padding: 20px;">
        <h1 style="color: #fff; padding:8px 10px; background-color: #000; text-align: center; margin-top: 5px;">
          Order Confirmation
        </h1>

        <p style="font-size: 16px;">Hello <strong>${fullName}</strong>,</p>
        <p><strong>Date:</strong> ${day}, ${formattedDate}</p>

        <p>
          Thank you for shopping with us! Your order has been successfully placed. Below are the details:
        </p>

        <h2 style="color: #000; border-bottom: 1px solid #000; padding-bottom: 5px;">Order Summary</h2>
        <ul style="list-style-type: none; padding: 0; font-size: 14px;">
          ${cart.items.map(item => `
            <li style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
              <strong>${item.product.name}</strong><br>
              Quantity: ${item.quantity}<br>
              Price: $${item.product.price} x ${item.quantity} = <strong>$${item.product.price * item.quantity}</strong>
            </li>
          `).join('')}
        </ul>

        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Subtotal:</strong> $${subtotal.toFixed(2)}
        </p>

        ${
          appliedDiscount
            ? `
            <p style="font-size: 16px; margin: 5px 0;">
              <strong>Discount Code:</strong> ${appliedDiscount.code}<br>
              <strong>Discount (${appliedDiscount.percentage}%):</strong> -$${appliedDiscount.amountSaved.toFixed(2)}
            </p>
          `
            : ''
        }

        <p style="font-size: 18px; margin: 10px 0;">
          <strong>Total Price:</strong> $${totalPrice.toFixed(2)}
        </p>

        <h2 style="color: #000; border-bottom: 1px solid #000; padding-bottom: 5px;">Shipping Information</h2>
        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Address:</strong> ${shippingInfo.address}<br>
          <strong>City:</strong> ${shippingInfo.city}<br>
          <strong>Phone:</strong> ${shippingInfo.phoneNo}<br>
          <strong>WhatsApp:</strong> ${shippingInfo.whatsAppNo}
        </p>

        <h2 style="color: #000; border-bottom: 1px solid #000; padding-bottom: 5px;">Payment Method</h2>
        <p style="font-size: 16px; margin: 10px 0;">
          ${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}
        </p>

        <h2 style="color: #000; border-bottom: 1px solid #000; padding-bottom: 5px;">What's Next?</h2>
        <p>
          Your order is currently being processed. We will send you another email once your items have been shipped. 
          If you have any questions or need assistance, feel free to contact our customer support team.
        </p>

        <h2 style="color: #000; border-bottom: 1px solid #000; padding-bottom: 5px;">Need Help?</h2>
        <p>
          Reply to this email or contact us directly at <a href="mailto:support@example.com" style="color: #000; text-decoration: underline;">support@example.com</a>.
        </p>

        <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #fff; background-color: #000; padding:8px 10px;">
          <p>Thank you for shopping with us!</p>
          <p>&copy; ${currentDate.getFullYear()} Your Brand Name</p>
        </footer>
      </div>
    </div>
  `;
};

module.exports = orderConfirmation;
