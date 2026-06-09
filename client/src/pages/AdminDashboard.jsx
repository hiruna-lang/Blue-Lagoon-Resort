import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiSave, FiRefreshCw } from 'react-icons/fi';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { mockGallery, mockRooms } from '../data/mockData';
import { getImageUrl } from '../utils/getImageUrl';

const initialRoom = {
  roomName: '',
  roomType: '',
  price: '',
  description: '',
  facilities: '',
  maxGuests: '',
  available: true,
  image: null
};

const initialGallery = {
  title: '',
  category: '',
  image: null
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [rooms, setRooms] = useState(mockRooms);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState(mockGallery);
  const [roomForm, setRoomForm] = useState(initialRoom);
  const [galleryForm, setGalleryForm] = useState(initialGallery);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    try {
      const [roomsResponse, bookingsResponse, messagesResponse, galleryResponse] = await Promise.all([
        api.get('/rooms'),
        api.get('/bookings'),
        api.get('/contact'),
        api.get('/gallery')
      ]);

      setRooms(Array.isArray(roomsResponse.data) && roomsResponse.data.length ? roomsResponse.data : mockRooms);
      setBookings(Array.isArray(bookingsResponse.data) ? bookingsResponse.data : []);
      setMessages(Array.isArray(messagesResponse.data) ? messagesResponse.data : []);
      setGallery(Array.isArray(galleryResponse.data) && galleryResponse.data.length ? galleryResponse.data : mockGallery);
    } catch (fetchError) {
      setRooms(mockRooms);
      setGallery(mockGallery);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleRoomChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setRoomForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleGalleryChange = (event) => {
    const { name, value, files } = event.target;
    setGalleryForm((current) => ({
      ...current,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const addRoom = async (event) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');

    try {
      const formData = new FormData();
      Object.entries(roomForm).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          if (key === 'facilities') {
            formData.append(key, JSON.stringify(value.split(',').map((item) => item.trim()).filter(Boolean)));
          } else {
            formData.append(key, value);
          }
        }
      });

      await api.post('/rooms', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setRoomForm(initialRoom);
      setStatusMessage('Room added successfully.');
      loadDashboard();
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Failed to add room');
    }
  };

  const addGalleryItem = async (event) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');

    try {
      const formData = new FormData();
      formData.append('title', galleryForm.title);
      formData.append('category', galleryForm.category);
      formData.append('image', galleryForm.image);

      await api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setGalleryForm(initialGallery);
      setStatusMessage('Gallery item added successfully.');
      loadDashboard();
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Failed to add gallery item');
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    await api.put(`/bookings/${bookingId}/status`, { status });
    loadDashboard();
  };

  const deleteRoom = async (roomId) => {
    await api.delete(`/rooms/${roomId}`);
    loadDashboard();
  };

  const deleteBooking = async (bookingId) => {
    await api.delete(`/bookings/${bookingId}`);
    loadDashboard();
  };

  const deleteMessage = async (messageId) => {
    await api.delete(`/contact/${messageId}`);
    loadDashboard();
  };

  const deleteGalleryItem = async (itemId) => {
    await api.delete(`/gallery/${itemId}`);
    loadDashboard();
  };

  return (
    <section className="section-shell py-12 md:py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Admin Dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Manage resort content and guest requests</h1>
        </div>
        <button onClick={loadDashboard} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/80 transition hover:border-white/30">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={logout} />

        <div className="space-y-6">
          {statusMessage && <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{statusMessage}</p>}
          {error && <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}

          {activeTab === 'overview' && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Rooms', value: rooms.length },
                { label: 'Bookings', value: bookings.length },
                { label: 'Messages', value: messages.length },
                { label: 'Gallery Items', value: gallery.length }
              ].map((item) => (
                <div key={item.label} className="glass-panel rounded-[1.75rem] border-white/10 p-6">
                  <p className="text-sm text-white/60">{item.label}</p>
                  <p className="mt-3 text-4xl font-semibold text-gold">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'add-room' && (
            <motion.form onSubmit={addRoom} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel rounded-[2rem] border-white/10 p-6 md:p-8 space-y-4">
              <h2 className="text-2xl font-semibold text-white">Add Room</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="roomName" value={roomForm.roomName} onChange={handleRoomChange} placeholder="Room Name" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
                <input name="roomType" value={roomForm.roomType} onChange={handleRoomChange} placeholder="Room Type" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
                <input name="price" type="number" value={roomForm.price} onChange={handleRoomChange} placeholder="Price" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
                <input name="maxGuests" type="number" value={roomForm.maxGuests} onChange={handleRoomChange} placeholder="Max Guests" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
                <textarea name="description" value={roomForm.description} onChange={handleRoomChange} placeholder="Description" rows="4" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none md:col-span-2" />
                <input name="facilities" value={roomForm.facilities} onChange={handleRoomChange} placeholder="Facilities (comma separated)" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none md:col-span-2" />
                <input name="image" type="file" accept="image/*" onChange={handleRoomChange} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none md:col-span-2" />
                <label className="flex items-center gap-2 text-white/75 md:col-span-2">
                  <input name="available" type="checkbox" checked={roomForm.available} onChange={handleRoomChange} /> Available
                </label>
              </div>
              <button type="submit" className="luxury-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold">
                <FiSave /> Save Room
              </button>
            </motion.form>
          )}

          {activeTab === 'rooms' && (
            <div className="space-y-4">
              {rooms.map((room) => (
                <div key={room._id} className="glass-panel flex flex-col gap-4 rounded-[1.75rem] border-white/10 p-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img src={getImageUrl(room.image) || room.image} alt={room.roomName} className="h-20 w-20 rounded-2xl object-cover" />
                    <div>
                      <p className="text-white font-semibold">{room.roomName}</p>
                      <p className="text-sm text-white/60">{room.roomType} · ${room.price}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteRoom(room._id)} className="inline-flex items-center gap-2 self-start rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-200 transition hover:bg-red-400/10">
                    <FiTrash2 /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="glass-panel rounded-[1.75rem] border-white/10 p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-white font-semibold">{booking.customerName}</p>
                      <p className="text-sm text-white/60">{booking.roomType} · {booking.email} · {booking.phone}</p>
                      <p className="text-sm text-white/60">{new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <select value={booking.status} onChange={(event) => updateBookingStatus(booking._id, event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none">
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Checked In</option>
                        <option>Checked Out</option>
                        <option>Cancelled</option>
                      </select>
                      <button onClick={() => deleteBooking(booking._id)} className="inline-flex items-center gap-2 rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-200 transition hover:bg-red-400/10">
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message._id} className="glass-panel rounded-[1.75rem] border-white/10 p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-white font-semibold">{message.name}</p>
                      <p className="text-sm text-white/60">{message.email} · {message.phone}</p>
                      <p className="mt-3 text-sm leading-7 text-white/70">{message.message}</p>
                    </div>
                    <button onClick={() => deleteMessage(message._id)} className="inline-flex items-center gap-2 rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-200 transition hover:bg-red-400/10">
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <motion.form onSubmit={addGalleryItem} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel rounded-[2rem] border-white/10 p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-white">Add Gallery Item</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <input name="title" value={galleryForm.title} onChange={handleGalleryChange} placeholder="Title" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
                  <input name="category" value={galleryForm.category} onChange={handleGalleryChange} placeholder="Category" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" />
                  <input name="image" type="file" accept="image/*" onChange={handleGalleryChange} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none md:col-span-2" />
                </div>
                <button type="submit" className="luxury-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold">
                  <FiSave /> Save Gallery Item
                </button>
              </motion.form>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {gallery.map((item) => (
                  <div key={item._id} className="glass-panel overflow-hidden rounded-[1.75rem] border-white/10">
                    <img src={getImageUrl(item.image) || item.image} alt={item.title} className="h-56 w-full object-cover" />
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-white/55">{item.category}</p>
                      </div>
                      <button onClick={() => deleteGalleryItem(item._id)} className="rounded-full border border-red-400/20 px-3 py-2 text-red-200 transition hover:bg-red-400/10">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
