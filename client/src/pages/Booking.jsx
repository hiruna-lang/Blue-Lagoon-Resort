import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';
import api from '../services/api';
import { mockRooms } from '../data/mockData';

const Booking = () => {
  const [rooms, setRooms] = useState(mockRooms);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get('/rooms');
        if (Array.isArray(data) && data.length) {
          setRooms(data);
        }
      } catch (error) {
        setRooms(mockRooms);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section className="section-shell py-12 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Booking</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">Reserve your stay in a few simple steps</h1>
          <p className="text-base leading-8 text-white/70">
            Choose a room, share your dates, and send your request. Our team will confirm availability and get back to you quickly.
          </p>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white/70">
            <p className="text-lg font-semibold text-white">Booking tips</p>
            <ul className="mt-4 space-y-3 text-sm leading-7">
              <li>• Select a room that matches your guest count and comfort needs.</li>
              <li>• Add a special request if you need airport pickup or celebration arrangements.</li>
              <li>• Confirm your check-in and check-out dates before sending the form.</li>
            </ul>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <BookingForm rooms={rooms} />
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
