const Cart = require('../model/Cart');

// Cleanup function to delete carts older than 3 days
const deleteExpiredCarts = async () => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3); // Set to 3 days ago

    // Delete carts where lastModified is older than 3 days
    const deletedCarts = await Cart.deleteMany({
      lastModified: { $lt: threeDaysAgo }
    });

    console.log(`${deletedCarts.deletedCount} expired cart(s) deleted.`);
  } catch (error) {
    console.error('Error deleting expired carts:', error.message);
  }
};

module.exports = deleteExpiredCarts;
