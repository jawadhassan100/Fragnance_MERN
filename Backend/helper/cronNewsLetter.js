const cron = require('node-cron');
const sendWeeklyNewsletter = require('../jobs/sendWeeklyNewsletter');
console.log('Cron job news letter initialized'); 
    // Run weekly — every Monday at 10:00 AM
    cron.schedule('0 10 * * 1', async () => {
      console.log('📬 Running weekly newsletter cron...');
      await sendWeeklyNewsletter();
    });

    console.log('🕒 Cron job scheduled for every Monday at 10AM');

