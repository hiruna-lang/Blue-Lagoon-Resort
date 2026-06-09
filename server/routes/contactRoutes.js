const express = require('express');
const {
  createContactMessage,
  getContactMessages,
  deleteContactMessage
} = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', protect, adminOnly, getContactMessages);
router.delete('/:id', protect, adminOnly, deleteContactMessage);

module.exports = router;
