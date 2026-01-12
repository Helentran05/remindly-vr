
import React, { useState } from 'react';
import { Appointment, Priority, AppointmentStatus } from '../types';
import Modal from '../components/Modal';

interface AppointmentListProps {
  appointments: Appointment[];
  onUpdate: (app: Appointment) => void;
  onDelete: (id: string) => void;
  onAdd: (app: Omit<Appointment, 'id' | 'userId' | 'lastModified' | 'status'>) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onUpdate, onDelete, onAdd }) => {
  const [filter, setFilter] = useState<Priority | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Appointment | null>(null);

  const filtered = appointments
    .filter(a => filter === 'All' || a.priority === filter)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      priority: formData.get('priority') as Priority,
      reminderMinutes: parseInt(formData.get('reminderMinutes') as string)
    };

    if (editingApp) {
      onUpdate({ ...editingApp, ...data });
    } else {
      onAdd(data);
    }
    setIsModalOpen(false);
    setEditingApp(null);
  };

  const openEdit = (app: Appointment) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Appointments</h2>
          <p className="text-slate-500">Manage your scheduled events and reminders.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Priorities</option>
            <option value={Priority.HIGH}>High Priority</option>
            <option value={Priority.MEDIUM}>Medium Priority</option>
            <option value={Priority.LOW}>Low Priority</option>
          </select>
          <button 
            onClick={() => { setEditingApp(null); setIsModalOpen(true); }}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center space-x-2"
          >
            <i className="fas fa-plus"></i>
            <span>New Task</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Task Name</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                    <i className="fas fa-calendar-times text-4xl mb-4 opacity-20 block"></i>
                    No appointments found for this filter.
                  </td>
                </tr>
              ) : (
                filtered.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-slate-800 font-semibold">{app.title}</p>
                        <p className="text-xs text-slate-400 line-clamp-1">{app.description || 'No description'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        <p>{new Date(app.startTime).toLocaleDateString()}</p>
                        <p className="text-xs text-slate-400">{new Date(app.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                        app.priority === Priority.HIGH ? 'bg-red-50 text-red-600' :
                        app.priority === Priority.MEDIUM ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <span className={`w-2 h-2 rounded-full ${
                          app.status === AppointmentStatus.COMPLETED ? 'bg-green-500' :
                          app.status === AppointmentStatus.CANCELLED ? 'bg-slate-400' : 'bg-amber-500 animate-pulse'
                        }`}></span>
                        <span>{app.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => openEdit(app)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button onClick={() => onDelete(app.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingApp(null); }} title={editingApp ? "Edit Task" : "New Appointment"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Title</label>
            <input name="title" required defaultValue={editingApp?.title} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
            <textarea name="description" rows={3} defaultValue={editingApp?.description} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Start Time</label>
              <input type="datetime-local" name="startTime" required defaultValue={editingApp?.startTime.slice(0, 16)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">End Time</label>
              <input type="datetime-local" name="endTime" required defaultValue={editingApp?.endTime.slice(0, 16)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Priority</label>
              <select name="priority" defaultValue={editingApp?.priority || Priority.MEDIUM} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20">
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Reminder (Mins before)</label>
              <input type="number" name="reminderMinutes" defaultValue={editingApp?.reminderMinutes || 15} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl text-slate-600 font-bold hover:bg-slate-100 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
              {editingApp ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AppointmentList;
