
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';
import { toast } from '../components/Toast';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const mockUser: User = {
        id: 'u1',
        email: email,
        name: email.split('@')[0],
        syncEnabled: false,
        theme: 'light'
      };
      onLogin(mockUser);
      toast.success(`Welcome back, ${mockUser.name}!`);
      navigate('/');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-600/20 mb-6">
            <i className="fas fa-bolt text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Sign in to Remindly</h1>
          <p className="text-slate-500 mt-2">Manage your time with AI-powered efficiency</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                placeholder="hello@example.com"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">Don't have an account? <Link to="/register" className="text-indigo-600 font-bold">Sign up for free</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
