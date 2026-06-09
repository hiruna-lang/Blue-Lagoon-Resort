import { FiHome, FiBed, FiCalendar, FiMessageSquare, FiImage, FiPlusCircle, FiLogOut } from 'react-icons/fi';

const adminItems = [
  { key: 'overview', label: 'Overview', icon: FiHome },
  { key: 'add-room', label: 'Add Room', icon: FiPlusCircle },
  { key: 'rooms', label: 'Manage Rooms', icon: FiBed },
  { key: 'bookings', label: 'Manage Bookings', icon: FiCalendar },
  { key: 'messages', label: 'Contact Messages', icon: FiMessageSquare },
  { key: 'gallery', label: 'Gallery', icon: FiImage }
];

const AdminSidebar = ({ activeTab, onTabChange, onLogout }) => {
  return (
    <aside className="glass-panel h-full rounded-[1.75rem] border-white/10 p-4 lg:sticky lg:top-28">
      <div className="space-y-1 border-b border-white/10 px-3 pb-4">
        <p className="text-xs uppercase tracking-[0.32em] text-gold">Admin</p>
        <h2 className="text-xl font-semibold text-white">Dashboard</h2>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {adminItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.key;

          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                active ? 'bg-gold text-navy-950' : 'text-white/75 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={onLogout}
        className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-left text-white/75 transition hover:border-white/25 hover:text-white"
      >
        <FiLogOut /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
