
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navItems = [
    { to: '/', icon: 'fa-chart-pie', label: 'Dashboard' },
    { to: '/appointments', icon: 'fa-calendar-alt', label: 'Appointments' },
    { to: '/profile', icon: 'fa-user-circle', label: 'Profile' },
    { to: '/settings', icon: 'fa-cog', label: 'Settings' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fas fa-bolt text-lg"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">Remindly AI</span>
        </div>
        <nav className="space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors"
        >
          <i className="fas fa-sign-out-alt w-5"></i>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
