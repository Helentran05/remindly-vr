
export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum AppointmentStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  priority: Priority;
  status: AppointmentStatus;
  reminderMinutes: number; // minutes before start
  userId: string;
  lastModified: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  syncEnabled: boolean;
  theme: 'light' | 'dark';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'reminder' | 'update' | 'error';
  timestamp: string;
  isRead: boolean;
}
