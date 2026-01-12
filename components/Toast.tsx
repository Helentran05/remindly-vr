
import React, { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastListeners: ((t: Toast) => void)[] = [];

export const toast = {
  success: (msg: string) => {
    toastListeners.forEach(l => l({ id: Date.now(), message: msg, type: 'success' }));
  },
  error: (msg: string) => {
    toastListeners.forEach(l => l({ id: Date.now(), message: msg, type: 'error' }));
  },
  info: (msg: string) => {
    toastListeners.forEach(l => l({ id: Date.now(), message: msg, type: 'info' }));
  }
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (t: Toast) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== t.id));
      }, 3000);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col space-y-3">
      {toasts.map(t => (
        <div 
          key={t.id} 
          className={`px-6 py-4 rounded-2xl shadow-xl flex items-center space-x-3 text-white font-medium animate-in slide-in-from-right duration-300 ${
            t.type === 'success' ? 'bg-emerald-500' : 
            t.type === 'error' ? 'bg-red-500' : 'bg-indigo-500'
          }`}
        >
          <i className={`fas ${t.type === 'success' ? 'fa-check-circle' : t.type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}`}></i>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
