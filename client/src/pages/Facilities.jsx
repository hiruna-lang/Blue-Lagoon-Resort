import { motion } from 'framer-motion';
import FacilityCard from '../components/FacilityCard';
import { mockFacilities } from '../data/mockData';

const Facilities = () => {
  return (
    <section className="section-shell py-12 md:py-20">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Facilities</p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">Designed for comfort, wellness, and effortless enjoyment</h1>
        <p className="text-base leading-8 text-white/70">
          Blue Lagoon Resort combines practical guest services with luxury experiences so every stay feels smooth and memorable.
        </p>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {mockFacilities.map((facility) => (
          <FacilityCard key={facility.title} facility={facility} />
        ))}
      </motion.div>
    </section>
  );
};

export default Facilities;
