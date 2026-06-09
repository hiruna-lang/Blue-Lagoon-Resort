const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
      trim: true
    },
    roomType: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    facilities: {
      type: [String],
      default: []
    },
    maxGuests: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
