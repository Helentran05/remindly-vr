
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Appointment, Notification, Priority, AppointmentStatus } from './types';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import AppointmentList from './views/AppointmentList';
import Profile from './views/Profile';
import Settings from './views/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { ToastContainer, toast } from './components/Toast';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('remindly_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('remindly_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    localStorage.setItem('remindly_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('remindly_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Simulated Reminder Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      appointments.forEach(app => {
        if (app.status === AppointmentStatus.PENDING) {
          const start = new Date(app.startTime);
          const diffMs = start.getTime() - now.getTime();
          const diffMins = Math.floor(diffMs / 60000);

          if (diffMins === app.reminderMinutes && diffMs > 0) {
            const newNotif: Notification = {
              id: Math.random().toString(36).substr(2, 9),
              title: 'Upcoming Appointment',
              message: `${app.title} starts in ${app.reminderMinutes} minutes!`,
              type: 'reminder',
              timestamp: new Date().toISOString(),
              isRead: false
            };
            setNotifications(prev => [newNotif, ...prev]);
            toast.info(`Reminder: ${app.title}`);
          }
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [appointments]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('remindly_user');
  };

  const addAppointment = (newApp: Omit<Appointment, 'id' | 'userId' | 'lastModified' | 'status'>) => {
    if (!user) return;
    const fullApp: Appointment = {
      ...newApp,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      status: AppointmentStatus.PENDING,
      lastModified: new Date().toISOString()
    };
    setAppointments(prev => [...prev, fullApp]);
    toast.success('Appointment created!');
  };

  const updateAppointment = (updatedApp: Appointment) => {
    setAppointments(prev => prev.map(a => a.id === updatedApp.id ? { ...updatedApp, lastModified: new Date().toISOString() } : a));
    toast.success('Appointment updated!');
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    toast.error('Appointment deleted');
  };

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        {user && <Sidebar onLogout={handleLogout} />}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {user && <Header user={user} notifications={notifications} />}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />} />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register onRegister={setUser} />} />
              <Route 
                path="/" 
                element={user ? <Dashboard appointments={appointments} addAppointment={addAppointment} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/appointments" 
                element={
                  user ? (
                    <AppointmentList 
                      appointments={appointments} 
                      onUpdate={updateAppointment} 
                      onDelete={deleteAppointment} 
                      onAdd={addAppointment}
                    />
                  ) : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/profile" 
                element={user ? <Profile user={user} onUpdate={setUser} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/settings" 
                element={user ? <Settings user={user} onUpdate={setUser} /> : <Navigate to="/login" />} 
              />
            </Routes>
          </main>
        </div>
      </div>
      <ToastContainer />
    </HashRouter>
  );
};

export default App;
