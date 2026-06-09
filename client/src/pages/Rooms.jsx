import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import api from '../services/api';
import { mockRooms } from '../data/mockData';

const Rooms = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get('/rooms');
        setRooms(Array.isArray(data) && data.length ? data : mockRooms);
      } catch (error) {
        setRooms(mockRooms);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section className="section-shell py-12 md:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Rooms</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Find the room that fits your stay</h1>
        <p className="text-base leading-8 text-white/70">
          Choose from suites, deluxe rooms, and private villas designed for different travel styles.
        </p>
      </div>

      {loading ? (
        <div className="mt-10 text-white/70">Loading rooms...</div>
      ) : (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Rooms;
