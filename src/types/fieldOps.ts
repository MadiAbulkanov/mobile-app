export type BackendRole =
  | 'Owner'
  | 'manager'
  | 'Designer'
  | 'Seamstress'
  | 'Installer'
  | 'Warehouse'
  | 'purchaser';

export type Role = BackendRole;

export const isManagerRole = (role: Role) => ['Owner', 'manager', 'Designer'].includes(role);

export type TaskStatus = 'created' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled';
export type OwnerOrdersTab = 'all' | 'inwork' | 'payment' | 'overdue' | 'materials';

export type ManagerTab = 'statistics' | 'tasks' | 'create' | 'employees';
export type EmployeeTab = 'tasks' | 'detail' | 'execute' | 'history' | 'profile';

export type OwnerOrderDraft = {
  customerId: string;
  customerName: string;
  selectedDesigner: string;
  measurementDate: string;
  plannedCompletion: string;
  installationCity: string;
  installationStreet: string;
  installationBuilding: string;
  installationApartment: string;
  installationNotes: string;
  notes?: string;
};

export type OwnerOrderCard = OwnerOrderDraft & {
  id: string;
  order_number: string;
  created_at: string;
  status: 'in_work' | 'waiting_final_payment' | 'completed' | 'expired';
  amount: string;
};

export type Measurement = {
  id: string;
  orderId: string;
  room_name: string;
  window_size: string;
  cost: string;
  created_at: string;
};

export type MeasurementDraft = {
  room_name: string;
  window_size: string;
  cost: string;
};

export type OwnerClient = {
  id: string;
  fullName: string;
  phone: string;
};

export type OwnerClientDraft = {
  fullName: string;
  phone: string;
};

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
  subtasks?: { text: string; completed: boolean }[];
};

export type CreateTaskForm = {
  title: string;
  description: string;
  created_at: string;
  employeeId: string;
  subtasks?: { text: string; completed: boolean }[];
};

export type MetricSummary = {
  total: number;
  completed: number;
  inProgress: number;
  reports: number;
};
