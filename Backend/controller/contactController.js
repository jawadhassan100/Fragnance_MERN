const Contact = require('../model/Contact');

// Create a new contact form submission
exports.createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'There was a problem saving your message' });
  }
};

// Get all contact submissions (if needed for admin view)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'There was a problem fetching the messages' });
  }
};



exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  console.log('Deleting contact with ID:', id);

  try {
    const contact = await Contact.findByIdAndDelete(id); // Use findByIdAndDelete

    if (!contact) {
      console.log('Contact not found');
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.log('Error deleting contact:', error);
    res.status(500).json({ error: 'There was a problem deleting the contact' });
  }
};