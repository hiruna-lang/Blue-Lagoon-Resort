const express = require('express');
const { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoomById);
router.post('/', protect, adminOnly, upload.single('image'), createRoom);
router.put('/:id', protect, adminOnly, upload.single('image'), updateRoom);
router.delete('/:id', protect, adminOnly, deleteRoom);

module.exports = router;
