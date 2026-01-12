
import React, { useState } from 'react';
import { Appointment, Priority, AppointmentStatus } from '../types';
import { parseAppointmentFromText } from '../services/geminiService';
import { toast } from '../components/Toast';

interface DashboardProps {
  appointments: Appointment[];
  addAppointment: (app: Omit<Appointment, 'id' | 'userId' | 'lastModified' | 'status'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ appointments, addAppointment }) => {
  const [aiText, setAiText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const upcoming = appointments
    .filter(a => new Date(a.startTime) > new Date() && a.status === AppointmentStatus.PENDING)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 3);

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiText.trim()) return;

    setIsAiLoading(true);
    const parsed = await parseAppointmentFromText(aiText);
    setIsAiLoading(false);

    if (parsed) {
      addAppointment({
        title: parsed.title,
        description: parsed.description || '',
        startTime: parsed.startTime,
        endTime: parsed.endTime || new Date(new Date(parsed.startTime).getTime() + 3600000).toISOString(),
        priority: parsed.priority || Priority.MEDIUM,
        reminderMinutes: parsed.reminderMinutes || 15
      });
      setAiText('');
      toast.success('AI parsed your request perfectly!');
    } else {
      toast.error('AI couldn\'t understand that. Try being more specific.');
    }
  };

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case Priority.HIGH: return 'bg-red-100 text-red-600';
      case Priority.MEDIUM: return 'bg-orange-100 text-orange-600';
      case Priority.LOW: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* AI Quick Add Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 shadow-2xl shadow-indigo-200 text-white">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">What's on your mind?</h2>
          <p className="text-indigo-100 mb-8 text-lg">Type naturally and let Gemini AI schedule your meetings, tasks, and reminders.</p>
          <form onSubmit={handleAiSubmit} className="relative group">
            <input 
              type="text"
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              placeholder='e.g., "Meeting with the team tomorrow at 2pm for coffee"'
              className="w-full h-16 pl-6 pr-32 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-md transition-all text-lg"
              disabled={isAiLoading}
            />
            <button 
              type="submit"
              disabled={isAiLoading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center space-x-2 shadow-lg disabled:opacity-50"
            >
              {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sparkles text-indigo-500"></i>}
              <span>{isAiLoading ? 'Parsing...' : 'Create'}</span>
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-indigo-200">Suggestions:</span>
            <button onClick={() => setAiText("Doctor appointment next Monday morning")} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">Doctor appointment next Monday</button>
            <button onClick={() => setAiText("Gym session tonight at 7")} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors">Gym session tonight</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stats Section */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
              <i className="fas fa-calendar-check text-xl"></i>
            </div>
            <p className="text-slate-500 font-medium">Total Appointments</p>
            <h3 className="text-3xl font-bold text-slate-800">{appointments.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-4">
              <i className="fas fa-exclamation-circle text-xl"></i>
            </div>
            <p className="text-slate-500 font-medium">High Priority Tasks</p>
            <h3 className="text-3xl font-bold text-slate-800">{appointments.filter(a => a.priority === Priority.HIGH).length}</h3>
          </div>
        </div>

        {/* Next Up Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Coming Up Next</h3>
            <span className="text-xs font-bold text-indigo-600 cursor-pointer">View All</span>
          </div>
          <div className="space-y-4 flex-1">
            {upcoming.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <img src="https://picsum.photos/200/200?blur=10" className="w-20 h-20 rounded-full mb-4 grayscale opacity-30" alt="empty" />
                <p className="text-slate-400 text-sm italic">Clear schedule, peaceful mind.</p>
              </div>
            ) : (
              upcoming.map(app => (
                <div key={app.id} className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">{app.title}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        <i className="far fa-clock mr-1"></i>
                        {new Date(app.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getPriorityColor(app.priority)}`}>
                      {app.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
