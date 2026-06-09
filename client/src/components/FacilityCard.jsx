import { motion } from 'framer-motion';
import { FiActivity, FiCoffee, FiMoon, FiUmbrella, FiHeart, FiMapPin, FiWind, FiShield } from 'react-icons/fi';

const iconMap = {
  pool: FiActivity,
  beach: FiUmbrella,
  spa: FiHeart,
  dining: FiCoffee,
  comfort: FiMoon,
  location: FiMapPin,
  breeze: FiWind,
  safety: FiShield
};

const FacilityCard = ({ facility }) => {
  const Icon = iconMap[facility.icon] || FiActivity;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-panel rounded-[1.75rem] border-white/10 p-6 transition"
    >
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-2xl text-gold">
        <Icon />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{facility.title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/68">{facility.description}</p>
    </motion.div>
  );
};

export default FacilityCard;
