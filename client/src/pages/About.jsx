import { motion } from 'framer-motion';
import { resortHighlights } from '../data/mockData';

const About = () => {
  return (
    <section className="section-shell py-12 md:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">About Us</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">A coastal retreat shaped by comfort, design, and genuine hospitality.</h1>
          <p className="text-base leading-8 text-white/70">
            Blue Lagoon Resort was created to deliver a warm, premium stay experience on the beachfront. We combine elegant rooms, thoughtful service, and relaxing spaces to help each guest slow down and enjoy the shore.
          </p>
          <p className="text-base leading-8 text-white/70">
            Whether you are celebrating a special occasion, traveling with family, or planning a quiet break, our resort offers the atmosphere and service to make every stay memorable.
          </p>
        </div>

        <div className="glass-panel rounded-[2rem] border-white/10 p-6 md:p-8">
          <img
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
            alt="Resort view"
            className="h-72 w-full rounded-[1.5rem] object-cover"
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {resortHighlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold text-gold">{item.value}</p>
                <p className="text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
