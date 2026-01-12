
import React from 'react';
import { User } from '../types';
import { toast } from '../components/Toast';

interface SettingsProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate }) => {
  const toggleSync = () => {
    onUpdate({ ...user, syncEnabled: !user.syncEnabled });
    toast.info(`Calendar sync ${!user.syncEnabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Application Settings</h2>
        <p className="text-slate-500">Configure notifications, synchronization, and visual appearance.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <i className="fas fa-sync text-indigo-600 mr-3"></i>
            Calendar Synchronization
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                  <i className="fab fa-google text-lg"></i>
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Google Calendar</p>
                  <p className="text-xs text-slate-500">Auto-sync your Google events</p>
                </div>
              </div>
              <button 
                onClick={toggleSync}
                className={`w-12 h-6 rounded-full transition-colors relative ${user.syncEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${user.syncEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-400 shadow-sm">
                  <i className="fab fa-windows text-lg"></i>
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Outlook / 365</p>
                  <p className="text-xs text-slate-500">Coming soon</p>
                </div>
              </div>
              <button disabled className="w-12 h-6 bg-slate-200 rounded-full cursor-not-allowed">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <i className="fas fa-bell text-indigo-600 mr-3"></i>
            Notification Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">Email Notifications</p>
                <p className="text-sm text-slate-500">Receive summaries and important alerts via email.</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <p className="font-semibold text-slate-800">Push Notifications</p>
                <p className="text-sm text-slate-500">Get real-time browser alerts for upcoming appointments.</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <i className="fas fa-shield-alt text-indigo-600 mr-3"></i>
            Security
          </h3>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
            Change Password
          </button>
          <button className="ml-3 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition-colors">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
