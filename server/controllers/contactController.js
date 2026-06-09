const ContactMessage = require('../models/ContactMessage');

const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'Missing required contact fields' });
    }

    const contactMessage = await ContactMessage.create({ name, email, phone, message });
    return res.status(201).json(contactMessage);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch contact messages', error: error.message });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    return res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete contact message', error: error.message });
  }
};

module.exports = { createContactMessage, getContactMessages, deleteContactMessage };
