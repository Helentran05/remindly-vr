
import React, { useState } from 'react';
import { User, Notification } from '../types';

interface HeaderProps {
  user: User;
  notifications: Notification[];
}

const Header: React.FC<HeaderProps> = ({ user, notifications }) => {
  const [showNotifs, setShowNotifs] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="lg:hidden">
        <h1 className="text-xl font-bold text-indigo-600">Remindly</h1>
      </div>
      <div className="hidden lg:block">
        <h2 className="text-lg font-semibold text-slate-800">Welcome back, {user.name}!</h2>
        <p className="text-sm text-slate-500">Plan your day effectively with AI.</p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors relative"
          >
            <i className="far fa-bell"></i>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <span className="font-semibold">Notifications</span>
                <span className="text-xs text-indigo-600 font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-400">
                    <i className="far fa-bell-slash text-2xl mb-2 block"></i>
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-indigo-50/50' : ''}`}>
                      <p className="text-sm font-medium text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                      <span className="text-[10px] text-slate-400 mt-2 block">{new Date(n.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
          <img 
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-slate-200"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
