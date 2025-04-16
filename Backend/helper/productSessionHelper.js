const Cart = require('../model/Cart');
const CustomCart = require('../model/CustomPerfumeCart');
const BundleCart = require('../model/BundleCart');
const Order = require('../model/Order');
const sendEmail = require('../utils/sendMails');
const discountTemplate = require('../utils/templates/abandonedCartDiscount');
const crypto = require('crypto');
const DiscountCode = require('../model/DiscountCode');

const generateDiscountCode = (length = 8, prefix = 'LS') => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = prefix;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return code;
};

const handleAbandonedCart = async (Model, type = 'cart') => {
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const carts = await Model.find({
    lastModified: { $lt: threeDaysAgo, $gt: fiveDaysAgo }
  }).populate('items.product', 'name price image');

  for (const cart of carts) {
    const existingOrder = await Order.findOne({ sessionId: cart.sessionId });

    if (!existingOrder && cart.items?.length > 0 && cart.email) {
      const discountCode = generateDiscountCode();
      await new DiscountCode({
        code: discountCode,
        sessionId: cart.sessionId,
        email: cart.email,
        discount: 10,
        expiresAt: new Date(Date.now() + 20 * 60 * 1000),
        isUsed: false,
      }).save();

      const emailContent = discountTemplate(cart.email, discountCode, cart.items);
      await sendEmail(cart.email, `Special discount for your ${type}`, emailContent);

      console.log(`Discount email sent to ${cart.email} for ${type} - ${cart.sessionId}`);
    }
  }

  const deletedCarts = await Model.deleteMany({ lastModified: { $lt: fiveDaysAgo } });
  console.log(`${deletedCarts.deletedCount} expired ${type}(s) deleted.`);
};

const cartManagement = async () => {
  try {
    await handleAbandonedCart(Cart, 'product cart');
    await handleAbandonedCart(CustomCart, 'custom cart');
    await handleAbandonedCart(BundleCart, 'bundle cart');
  } catch (error) {
    console.error('Error in cart management:', error.message);
  }
};

module.exports = cartManagement;
