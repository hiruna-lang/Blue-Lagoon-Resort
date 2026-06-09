const express = require('express');
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', createBooking);
router.get('/', protect, adminOnly, getBookings);
router.get('/:id', protect, adminOnly, getBookingById);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);
router.delete('/:id', protect, adminOnly, deleteBooking);

module.exports = router;
