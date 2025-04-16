const NewsLetter = require('../model/NewsLetter');
const sendEmail = require('../utils/sendMails');

const sendWeeklyNewsletter = async () => {
  try {
    const subscribers = await NewsLetter.find();

    if (!subscribers.length) {
      console.log('No subscribers found.');
      return;
    }

    for (let sub of subscribers) {
      const content = `
         <h1>Welcome to our Newsletter!</h1>
      <p>Thank you for subscribing to our newsletter. Stay tuned for updates!</p>
      <p>Email: ${sub.email}</p>
      `;

      await sendEmail(sub.email, 'Weekly Newsletter 💌', content);
    }

    console.log(`✅ Newsletter sent to ${subscribers.length} users`);
  } catch (error) {
    console.error('❌ Error sending newsletter:', error);
  }
};

module.exports = sendWeeklyNewsletter;
