import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import { getImageUrl } from '../utils/getImageUrl';

const RoomCard = ({ room }) => {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="glass-panel overflow-hidden rounded-[1.75rem] border-white/10"
    >
      <img src={getImageUrl(room.image) || room.image} alt={room.roomName} className="h-56 w-full object-cover" />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-gold/85">{room.roomType}</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{room.roomName}</h3>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-lg font-semibold text-gold">
              <FiDollarSign /> {room.price}
            </p>
            <p className="text-xs text-white/55">per night</p>
          </div>
        </div>

        <p className="text-sm leading-7 text-white/70">{room.description}</p>

        <div className="flex flex-wrap gap-2 text-xs text-white/65">
          {room.facilities?.slice(0, 4).map((facility) => (
            <span key={facility} className="rounded-full border border-white/10 px-3 py-1">
              {facility}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 text-sm text-white/65">
          <span className="flex items-center gap-2">
            <FiUsers className="text-gold" /> Max {room.maxGuests} guests
          </span>
          <span>{room.available ? 'Available' : 'Sold Out'}</span>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            to={`/rooms/${room._id}`}
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/85 transition hover:border-white/35"
          >
            View Details
          </Link>
          <Link to="/booking" className="luxury-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
            Book Now <FiArrowRight />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default RoomCard;
