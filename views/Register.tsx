
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';
import { toast } from '../components/Toast';

interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1: form, 2: OTP
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && password) {
      setStep(2);
      toast.info('Verification code sent to your email.');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      const newUser: User = {
        id: Date.now().toString(),
        email: email,
        name: name,
        syncEnabled: false,
        theme: 'light'
      };
      onRegister(newUser);
      toast.success('Account verified and created!');
      navigate('/');
    } else {
      toast.error('Invalid verification code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-600/20 mb-6">
            <i className="fas fa-plus text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            {step === 1 ? 'Create an Account' : 'Verify Identity'}
          </h1>
          <p className="text-slate-500 mt-2">
            {step === 1 ? 'Join thousands of users organizing their life' : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
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
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                  placeholder="Min 8 characters"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
              >
                Create Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6 text-center">
              <div className="flex justify-center space-x-2">
                <input 
                  type="text" 
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-[1em] text-2xl font-bold px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  placeholder="000000"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
              >
                Verify & Continue
              </button>
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-bold text-slate-400 hover:text-slate-600"
              >
                Back to sign up
              </button>
            </form>
          )}

          {step === 1 && (
            <div className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">Already have an account? <Link to="/login" className="text-indigo-600 font-bold">Sign in</Link></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
