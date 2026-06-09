import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import api from '../services/api';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      await api.post('/contact', formData);
      setMessage('Thanks for reaching out. We will contact you soon.');
      setFormData(initialState);
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Message submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel grid gap-4 rounded-[2rem] border-white/10 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-gold"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-gold"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-gold md:col-span-2"
        />
      </div>

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Write your message"
        rows="6"
        required
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-gold"
      />

      {message && <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{message}</p>}
      {error && <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="luxury-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Sending...' : 'Send Message'} <FiSend />
      </button>
    </form>
  );
};

export default ContactForm;
