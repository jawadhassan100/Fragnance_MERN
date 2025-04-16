module.exports = (email, discountCode, cartItems) => {
    const totalValue = cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  
    const itemsHtml = cartItems.map(item => {
      return `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #444; color: #eee;">
            ${item.product.name}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #444; color: #eee;">
            ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #444; color: #eee;">
            $${item.product.price.toFixed(2)}
          </td>
        </tr>
      `;
    }).join('');
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #fff;
            background-color: #000;
            padding: 0;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 30px;
            background-color: #111;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
          }
          .discount-code {
            background-color: #000;
            color: #fff;
            border: 2px dashed #fff;
            padding: 15px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin: 30px 0;
            border-radius: 6px;
          }
          .cart-items {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .cart-items th {
            background-color: #222;
            color: #fff;
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #444;
          }
          .button {
            display: inline-block;
            background-color: #fff;
            color: #000;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #888;
          }
          a {
            color: #ccc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #fff;">Still thinking about your items?</h1>
            <p style="color: #ccc;">We noticed you left some great items in your cart! Don’t miss out on them.</p>
          </div>
          
          <p>Hello,</p>
          <p>We noticed you have some items in your shopping cart that you haven't checked out yet. We thought you might like a special discount to help you complete your purchase.</p>
          
          <p><strong>Here's what's waiting in your cart:</strong></p>
          
          <table class="cart-items">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="text-align: right; padding: 10px; color: #fff;"><strong>Total:</strong></td>
                <td style="padding: 10px; color: #fff;"><strong>$${totalValue.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
          
          <p>To make your decision easier, we're offering you a special <strong>10% discount</strong> on your entire order!</p>
          
          <div class="discount-code">
            ${discountCode}
          </div>
          
          <p><strong>This code expires in 20 minutes</strong> and can only be used once, so act fast!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://yourwebsite.com/checkout" class="button">Complete Your Purchase</a>
          </div>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our customer service team.</p>
          
          <p>Happy Shopping!</p>
          
          <div class="footer">
            <p>This email was sent to ${email}. If you no longer wish to receive these emails, you can <a href="#">unsubscribe</a>.</p>
            <p>&copy; 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  