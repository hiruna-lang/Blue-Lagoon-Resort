import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GalleryGrid from '../components/GalleryGrid';
import api from '../services/api';
import { mockGallery } from '../data/mockData';

const Gallery = () => {
  const [items, setItems] = useState(mockGallery);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        setItems(Array.isArray(data) && data.length ? data : mockGallery);
      } catch (error) {
        setItems(mockGallery);
      }
    };

    loadGallery();
  }, []);

  return (
    <section className="section-shell py-12 md:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Gallery</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">A look at the resort atmosphere</h1>
        <p className="text-base leading-8 text-white/70">
          Explore tranquil views, dining moments, and the resort spaces that define the Blue Lagoon experience.
        </p>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10">
        <GalleryGrid items={items} />
      </motion.div>
    </section>
  );
};

export default Gallery;
