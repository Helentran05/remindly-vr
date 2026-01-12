
import React, { useState } from 'react';
import { User } from '../types';
import { toast } from '../components/Toast';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, ...formData });
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
        <p className="text-slate-500">Manage your account information and preferences.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12 mb-12">
          <div className="relative group">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`} 
              alt="Profile" 
              className="w-32 h-32 rounded-3xl border-4 border-slate-100 group-hover:opacity-75 transition-opacity"
            />
            <button className="absolute bottom-2 right-2 w-8 h-8 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <i className="fas fa-camera text-xs"></i>
            </button>
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-slate-800">{user.name}</h3>
            <p className="text-slate-500">{user.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
              <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Premium Plan</span>
              <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Verified User</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Display Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                disabled
                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                placeholder="+84 000 000 000"
              />
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button 
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
