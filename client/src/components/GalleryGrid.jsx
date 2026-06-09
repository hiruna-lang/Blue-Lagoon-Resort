import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/getImageUrl';

const GalleryGrid = ({ items = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(items.map((item) => item.category).filter(Boolean))], [items]);

  const filteredItems = activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeCategory === category
                ? 'border-gold bg-gold text-navy-950'
                : 'border-white/15 text-white/75 hover:border-white/30'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <motion.figure
            key={item._id}
            whileHover={{ y: -6 }}
            className="glass-panel overflow-hidden rounded-[1.75rem] border-white/10"
          >
            <img src={getImageUrl(item.image) || item.image} alt={item.title} className="h-72 w-full object-cover" />
            <figcaption className="p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gold/80">{item.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
