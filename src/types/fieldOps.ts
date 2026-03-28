export type Role = 'manager' | 'employee';

export type TaskStatus =
  | 'created'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rescheduled';

export type ManagerTab = 'statistics' | 'tasks' | 'create' | 'employees';
export type EmployeeTab = 'tasks' | 'detail' | 'execute' | 'history' | 'profile';

export type Employee = {
  id: string;
  name: string;
  role: string;
  phone: string;
  region: string;
  shiftStart: string;
  shiftEnd: string;
  rating: number;
  completedTasks: number;
};

export type PhotoReport = {
  id: string;
  label: string;
  time: string;
  note: string;
  accent: string;
};

export type TaskPriority = 'high' | 'medium' | 'low';

export type Task = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  employeeId: string;
  status: TaskStatus;
  photoReports: PhotoReport[];
  subtasks?: { text: string; completed: boolean; }[];
};

export type CreateTaskForm = {
  title: string;
  description: string;
  created_at: string;
  employeeId: string;
  subtasks?: { text: string; completed: boolean; }[];
};

export type MetricSummary = {
  total: number;
  completed: number;
  inProgress: number;
  reports: number;
};
