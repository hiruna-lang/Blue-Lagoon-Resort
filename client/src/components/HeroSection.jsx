import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import { resortHighlights } from '../data/mockData';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-8 pt-14 md:pb-16 md:pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(123,223,242,0.2),transparent_30%),radial-gradient(circle_at_right,rgba(212,175,55,0.15),transparent_22%)]" />
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-gold">
            <FiStar /> Blue Lagoon Resort
          </div>
          <div className="max-w-3xl space-y-5">
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Experience the calm luxury of a true coastal sanctuary.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/72 md:text-lg">
              Welcome to Blue Lagoon Resort, where elegant stays, curated experiences, and warm hospitality come together on a pristine beachfront.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/booking" className="luxury-button inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold">
              Book Now <FiArrowRight />
            </Link>
            <Link
              to="/rooms"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white/85 transition hover:border-white/35 hover:text-white"
            >
              Explore Rooms
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {resortHighlights.map((item) => (
              <div key={item.label} className="glass-panel rounded-3xl p-4">
                <p className="text-2xl font-semibold text-gold">{item.value}</p>
                <p className="mt-1 text-sm text-white/65">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -left-6 top-6 h-24 w-24 rounded-full bg-gold/20 blur-2xl" />
          <div className="absolute -right-8 bottom-8 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="glass-panel overflow-hidden rounded-[2rem] border-white/10 p-3 shadow-luxury">
            <img
              src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
              alt="Blue Lagoon Resort beachfront view"
              className="h-[520px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
