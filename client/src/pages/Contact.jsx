import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiMessageCircle } from 'react-icons/fi';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <section className="section-shell py-12 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Contact</p>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">We are here to help plan your stay</h1>
          <p className="text-base leading-8 text-white/70">
            Reach out for booking questions, event requests, or general resort information. Our team is ready to assist.
          </p>

          <div className="space-y-4 text-white/72">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <FiMapPin className="mt-1 text-gold" />
              <div>
                <p className="font-semibold text-white">Address</p>
                <p>Ocean Drive, Blue Bay Coast, Blue Lagoon Resort</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <FiPhone className="mt-1 text-gold" />
              <div>
                <p className="font-semibold text-white">Phone</p>
                <p>+1 (555) 014-2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <FiMail className="mt-1 text-gold" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <p>hello@bluelagoonresort.com</p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/15550142026"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
          >
            <FiMessageCircle /> WhatsApp Us
          </a>

          <div className="glass-panel overflow-hidden rounded-[2rem] border-white/10">
            <div className="flex h-64 items-center justify-center bg-[linear-gradient(135deg,rgba(16,37,79,0.95),rgba(8,17,38,0.95))] text-white/55">
              Google Map Placeholder
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
