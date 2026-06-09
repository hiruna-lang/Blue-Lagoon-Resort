import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-gold">Blue Lagoon Resort</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
            A refined coastal retreat where calm waters, luxury rooms, and attentive hospitality meet.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link to="/rooms">Rooms</Link>
            <Link to="/booking">Book Now</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p className="flex items-center gap-2">
              <FiMapPin className="text-gold" />
              Ocean Drive, Blue Bay Coast
            </p>
            <p className="flex items-center gap-2">
              <FiPhone className="text-gold" />
              +1 (555) 014-2026
            </p>
            <p className="flex items-center gap-2">
              <FiMail className="text-gold" />
              hello@bluelagoonresort.com
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="mt-4 flex gap-3 text-2xl text-white/70">
            <a href="#" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs tracking-[0.2em] text-white/45">
        © {new Date().getFullYear()} Blue Lagoon Resort. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
