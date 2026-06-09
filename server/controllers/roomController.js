const Room = require('../models/Room');

const parseFacilities = (facilities) => {
  if (Array.isArray(facilities)) {
    return facilities;
  }

  if (typeof facilities === 'string') {
    try {
      const parsed = JSON.parse(facilities);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (error) {
      return facilities
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    return res.json(rooms);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.json(room);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch room', error: error.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const { roomName, roomType, price, description, facilities, maxGuests, available } = req.body;

    if (!roomName || !roomType || !price || !description || !maxGuests) {
      return res.status(400).json({ message: 'Missing required room fields' });
    }

    const room = await Room.create({
      roomName,
      roomType,
      price,
      description,
      facilities: parseFacilities(facilities),
      maxGuests,
      available: available === 'false' || available === false ? false : true,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create room', error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const updatedData = {
      roomName: req.body.roomName ?? room.roomName,
      roomType: req.body.roomType ?? room.roomType,
      price: req.body.price ?? room.price,
      description: req.body.description ?? room.description,
      facilities: req.body.facilities ? parseFacilities(req.body.facilities) : room.facilities,
      maxGuests: req.body.maxGuests ?? room.maxGuests,
      available:
        req.body.available !== undefined
          ? req.body.available === 'false' || req.body.available === false
            ? false
            : true
          : room.available,
      image: req.file ? `/uploads/${req.file.filename}` : room.image
    };

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.json(updatedRoom);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update room', error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete room', error: error.message });
  }
};

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
