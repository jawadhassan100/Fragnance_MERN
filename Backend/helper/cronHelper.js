const cron = require('node-cron');
const cartManagement = require('./productSessionHelper')
console.log('Cron job initialized'); 

// Schedule the cleanup function to run once a day at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running cart cleanup cron job');
    cartManagement();
});
