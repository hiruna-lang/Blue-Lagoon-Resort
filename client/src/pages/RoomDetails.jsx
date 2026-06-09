import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiUsers, FiArrowRight } from 'react-icons/fi';
import api from '../services/api';
import { mockRooms } from '../data/mockData';
import { getImageUrl } from '../utils/getImageUrl';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await api.get(`/rooms/${id}`);
        setRoom(data);
      } catch (error) {
        setRoom(mockRooms.find((item) => item._id === id) || null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return <div className="section-shell py-20 text-white/70">Loading room details...</div>;
  }

  if (!room) {
    return <div className="section-shell py-20 text-white/70">Room not found.</div>;
  }

  return (
    <section className="section-shell py-12 md:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel overflow-hidden rounded-[2rem] border-white/10 p-3">
          <img src={getImageUrl(room.image) || room.image} alt={room.roomName} className="h-full w-full rounded-[1.5rem] object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Room Details</p>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">{room.roomName}</h1>
            <p className="mt-4 text-2xl font-semibold text-gold">${room.price} <span className="text-sm text-white/55">per night</span></p>
          </div>

          <p className="text-base leading-8 text-white/72">{room.description}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/55">Room Type</p>
              <p className="mt-1 text-lg text-white">{room.roomType}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/55">Maximum Guests</p>
              <p className="mt-1 flex items-center gap-2 text-lg text-white">
                <FiUsers className="text-gold" /> {room.maxGuests}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/55">Availability</p>
              <p className="mt-1 text-lg text-white">{room.available ? 'Available' : 'Not available'}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Facilities</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {room.facilities?.map((facility) => (
                <div key={facility} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75">
                  <FiCheckCircle className="text-gold" /> {facility}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/booking" className="luxury-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold">
              Book This Room <FiArrowRight />
            </Link>
            <Link to="/rooms" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white/85 transition hover:border-white/30">
              Back to Rooms
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RoomDetails;
