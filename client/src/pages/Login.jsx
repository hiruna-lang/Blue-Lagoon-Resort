import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData);
      navigate(result.user.role === 'admin' ? '/admin' : '/');
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-shell flex min-h-[calc(100vh-9rem)] items-center py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto w-full max-w-md glass-panel rounded-[2rem] border-white/10 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Login</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Access your dashboard</h1>
        <p className="mt-3 text-sm leading-7 text-white/65">
          Admin accounts can manage rooms, bookings, gallery items, and contact messages.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block space-y-2 text-sm text-white/70">
            <span className="flex items-center gap-2 text-white"><FiMail /> Email</span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-gold"
            />
          </label>
          <label className="block space-y-2 text-sm text-white/70">
            <span className="flex items-center gap-2 text-white"><FiLock /> Password</span>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-gold"
            />
          </label>

          {error && <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}

          <button type="submit" disabled={loading} className="luxury-button w-full rounded-full px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
