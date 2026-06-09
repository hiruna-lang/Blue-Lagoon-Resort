const Booking = require('../models/Booking');
const Room = require('../models/Room');

const createBooking = async (req, res) => {
  try {
    const { customerName, email, phone, roomId, roomType, checkIn, checkOut, guests, specialRequest } = req.body;

    if (!customerName || !email || !phone || !roomType || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    let resolvedRoomType = roomType;
    if (roomId) {
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      resolvedRoomType = resolvedRoomType || room.roomType;
    }

    const booking = await Booking.create({
      customerName,
      email,
      phone,
      roomId: roomId || undefined,
      roomType: resolvedRoomType,
      checkIn,
      checkOut,
      guests,
      specialRequest: specialRequest || ''
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('roomId').sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('roomId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch booking', error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = req.body.status || booking.status;
    await booking.save();

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update booking', error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete booking', error: error.message });
  }
};

module.exports = { createBooking, getBookings, getBookingById, updateBookingStatus, deleteBooking };
