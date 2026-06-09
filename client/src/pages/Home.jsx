import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import RoomCard from '../components/RoomCard';
import FacilityCard from '../components/FacilityCard';
import ReviewCard from '../components/ReviewCard';
import GalleryGrid from '../components/GalleryGrid';
import api from '../services/api';
import { mockRooms, mockFacilities, mockGallery, mockReviews } from '../data/mockData';

const Home = () => {
  const [rooms, setRooms] = useState(mockRooms);
  const [gallery, setGallery] = useState(mockGallery);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [roomsResponse, galleryResponse] = await Promise.all([api.get('/rooms'), api.get('/gallery')]);
        if (Array.isArray(roomsResponse.data) && roomsResponse.data.length) {
          setRooms(roomsResponse.data);
        }
        if (Array.isArray(galleryResponse.data) && galleryResponse.data.length) {
          setGallery(galleryResponse.data);
        }
      } catch (error) {
        setRooms(mockRooms);
        setGallery(mockGallery);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <HeroSection />

      <section className="section-shell py-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Welcome</p>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">A resort experience crafted for rest, celebration, and escape.</h2>
            <p className="text-base leading-8 text-white/70">
              Blue Lagoon Resort blends seaside serenity with modern luxury. From intimate stays to family getaways, every corner is designed to feel calm, polished, and welcoming.
            </p>
            <Link to="/about" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition hover:border-white/30">
              Learn More About Us
            </Link>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {rooms.slice(0, 2).map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-10 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Facilities</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Everything you need for a seamless stay</h2>
          </div>
          <Link to="/facilities" className="hidden text-sm text-white/70 transition hover:text-white md:block">
            View all facilities
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {mockFacilities.map((facility) => (
            <FacilityCard key={facility.title} facility={facility} />
          ))}
        </div>
      </section>

      <section className="section-shell py-10 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Gallery</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Moments from the resort</h2>
          </div>
          <Link to="/gallery" className="hidden text-sm text-white/70 transition hover:text-white md:block">
            Open full gallery
          </Link>
        </div>
        <div className="mt-8">
          <GalleryGrid items={gallery.slice(0, 3)} />
        </div>
      </section>

      <section className="section-shell py-10 md:py-16">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Guest Reviews</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Loved by guests from around the world</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mockReviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </section>

      <section className="section-shell py-10 md:py-16">
        <div className="glass-panel rounded-[2rem] border-white/10 px-6 py-10 text-center md:px-12">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Plan Your Stay</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Ready to book your Blue Lagoon escape?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/68">
            Secure your preferred room, check availability, and let our team prepare a stay shaped around your comfort.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="luxury-button rounded-full px-6 py-3 font-semibold">
              Book Now
            </Link>
            <Link to="/contact" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white/85 transition hover:border-white/30">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
