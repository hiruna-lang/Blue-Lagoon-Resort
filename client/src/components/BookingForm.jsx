import { useEffect, useState } from 'react';
import { FiCalendar, FiSend, FiUser } from 'react-icons/fi';
import api from '../services/api';
import { mockRooms } from '../data/mockData';

const initialState = {
  customerName: '',
  email: '',
  phone: '',
  roomId: '',
  roomType: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  specialRequest: ''
};

const BookingForm = ({ rooms: roomsProp = [] }) => {
  const [rooms, setRooms] = useState(roomsProp.length ? roomsProp : mockRooms);
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get('/rooms');
        if (Array.isArray(data) && data.length) {
          setRooms(data);
        }
      } catch (fetchError) {
        setRooms(roomsProp.length ? roomsProp : mockRooms);
      }
    };

    if (!roomsProp.length) {
      fetchRooms();
    }
  }, [roomsProp]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roomId') {
      const selectedRoom = rooms.find((room) => room._id === value);
      setFormData((current) => ({
        ...current,
        roomId: value,
        roomType: selectedRoom?.roomType || ''
      }));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      await api.post('/bookings', formData);
      setMessage('Your booking request has been submitted successfully.');
      setFormData(initialState);
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Booking submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel grid gap-4 rounded-[2rem] border-white/10 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/70">
          <span className="flex items-center gap-2 text-white">
            <FiUser /> Customer Name
          </span>
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-gold"
            placeholder="Enter your name"
          />
        </label>

        <label className="space-y-2 text-sm text-white/70">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-gold"
            placeholder="you@example.com"
          />
        </label>

        <label className="space-y-2 text-sm text-white/70">
          <span>Phone Number</span>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-gold"
            placeholder="+1 555 000 0000"
          />
        </label>

        <label className="space-y-2 text-sm text-white/70">
          <span>Room Type</span>
          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-gold"
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.roomName} - {room.roomType}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-white/70">
          <span className="flex items-center gap-2 text-white">
            <FiCalendar /> Check-in Date
          </span>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-gold"
          />
        </label>

        <label className="space-y-2 text-sm text-white/70">
          <span className="flex items-center gap-2 text-white">
            <FiCalendar /> Check-out Date
          </span>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-gold"
          />
        </label>

        <label className="space-y-2 text-sm text-white/70">
          <span>Number of Guests</span>
          <input
            type="number"
            name="guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-gold"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-white/70">
        <span>Special Request</span>
        <textarea
          name="specialRequest"
          value={formData.specialRequest}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-gold"
          placeholder="Any special arrangements you'd like?"
        />
      </label>

      {message && <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{message}</p>}
      {error && <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="luxury-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Submitting...' : 'Submit Booking'} <FiSend />
      </button>
    </form>
  );
};

export default BookingForm;
