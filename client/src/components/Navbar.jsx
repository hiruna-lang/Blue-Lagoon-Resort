import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiSun, FiShield } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Booking', to: '/booking' },
  { label: 'Contact', to: '/contact' }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/80 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gold text-navy-950 shadow-luxury">
            <FiSun />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-sky-200/80">Blue Lagoon Resort</p>
            <p className="text-sm text-white/70">Luxury beach escape</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link text-sm text-white/80 transition hover:text-white">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-gold transition hover:bg-gold hover:text-navy-950"
            >
              <FiShield />
              Admin
            </Link>
          )}
          {user ? (
            <button
              onClick={logout}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="luxury-button rounded-full px-5 py-2.5 text-sm font-semibold">
              Login
            </Link>
          )}
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-950/95 px-4 pb-5 pt-3 lg:hidden">
          <nav className="section-shell flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-white/85 transition hover:bg-white/5"
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-gold transition hover:bg-gold/10"
              >
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <button onClick={logout} className="rounded-2xl px-4 py-3 text-left text-white/85 transition hover:bg-white/5">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="luxury-button rounded-2xl px-4 py-3 text-center font-semibold">
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
