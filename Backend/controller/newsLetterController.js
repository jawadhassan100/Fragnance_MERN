const Newsletter = require('../model/NewsLetter');

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(200).json({ success: true, message: 'Already subscribed!' });
    }

    // Save to database
    const newSub = new Newsletter({ email });
    await newSub.save();

  
    res.status(201).json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Newsletter Error:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};
