import {
  Employee,
  EmployeeTab,
  ManagerTab,
  Task,
  TaskPriority,
  TaskStatus,
} from '../types/fieldOps';

export const employees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Иван Петров',
    role: 'Электромонтажник',
    phone: '+7 999 120-44-11',
    region: 'ЦАО',
    shiftStart: '08:00',
    shiftEnd: '18:00',
    rating: 4.9,
    completedTasks: 128,
  },
  {
    id: 'emp-2',
    name: 'Мария Соколова',
    role: 'Инженер сервиса',
    phone: '+7 999 555-80-44',
    region: 'ЮАО',
    shiftStart: '09:00',
    shiftEnd: '19:00',
    rating: 4.8,
    completedTasks: 98,
  },
  {
    id: 'emp-3',
    name: 'Алексей Воронов',
    role: 'Техник ОВиК',
    phone: '+7 999 777-34-21',
    region: 'СЗАО',
    shiftStart: '08:30',
    shiftEnd: '17:30',
    rating: 4.7,
    completedTasks: 84,
  },
];

export const initialTasks: Task[] = [
  {
    id: 'TSK-104',
    title: 'Проверка кондиционирования в серверной',
    description:
      'Провести диагностику блока охлаждения, заменить фильтр и подготовить акт выполненных работ.',
    created_at: '2026-03-22T09:30:00',
    employeeId: 'emp-3',
    status: 'created',
    photoReports: [],
  },
  {
    id: 'TSK-105',
    title: 'Ремонт освещения в торговом зале',
    description:
      'Заменить светильники на линии B, проверить автомат и зафиксировать фото до/после.',
    created_at: '2026-03-22T11:00:00',
    employeeId: 'emp-1',
    status: 'in_progress',
    photoReports: [
      {
        id: 'PH-1',
        label: 'До ремонта',
        time: '10:58',
        note: 'Не горят 3 светильника на линии B.',
        accent: '#F97316',
      },
    ],
  },
  {
    id: 'TSK-103',
    title: 'Ремонт освещения',
    description:
      'Заменить светильники на линии А, проверить автомат и зафиксировать фото до/после.',
    created_at: '2026-03-22T13:00:00',
    employeeId: 'emp-1',
    status: 'created',
    photoReports: [
      {
        id: 'PH-4',
        label: 'До ремонта',
        time: '10:58',
        note: 'Не горят 3 светильника на линии А.',
        accent: '#F97316',
      },
    ],
  },
  {
    id: 'TSK-106',
    title: 'Пусконаладка счётчика воды',
    description:
      'Подключить модуль передачи данных, выполнить контрольный замер и согласовать запуск с управляющей компанией.',
    created_at: '2026-03-22T14:30:00',
    employeeId: 'emp-2',
    status: 'completed',
    photoReports: [],
  },
  {
    id: 'TSK-099',
    title: 'Осмотр вентиляции ресторана',
    description: 'Проверка воздуховодов и подготовка рекомендаций по очистке.',
    created_at: '2026-03-21T15:00:00',
    employeeId: 'emp-2',
    status: 'completed',
    photoReports: [
      {
        id: 'PH-2',
        label: 'Фото узла',
        time: '15:38',
        note: 'Засорение умеренное, требуется чистка через 2 недели.',
        accent: '#14B8A6',
      },
      {
        id: 'PH-3',
        label: 'Финальный результат',
        time: '15:52',
        note: 'Работа завершена, рекомендации согласованы.',
        accent: '#0F766E',
      },
    ],
  },
  {
    id: 'TSK-101',
    title: 'Замена датчика утечки',
    description: 'Согласовать доступ в серверную, заменить неисправный датчик и проверить сигнал.',
    created_at: '2026-03-23T10:00:00',
    employeeId: 'emp-1',
    status: 'rescheduled',
    photoReports: [],
  },
  {
    id: 'TSK-102',
    title: 'Замена датчика',
    description: 'Согласовать доступ в серверную, заменить неисправный датчик и проверить сигнал.',
    created_at: '2026-03-23T13:00:00',
    employeeId: 'emp-1',
    status: 'completed',
    photoReports: [
      {
        id: 'PH-2',
        label: 'Фото узла',
        time: '15:38',
        note: 'Засорение умеренное, требуется чистка через 2 недели.',
        accent: '#14B8A6',
      },
    ],
  },
];

export const statusMeta: Record<
  TaskStatus,
  { label: string; color: string; tint: string; order: number }
> = {
  created: { label: 'Создана', color: '#475569', tint: '#F1F5F9', order: 1 },
  in_progress: { label: 'В работе', color: '#B45309', tint: '#FEF3C7', order: 3 },
  completed: { label: 'Завершена', color: '#047857', tint: '#ECFDF5', order: 4 },
  cancelled: { label: 'Отменена', color: '#B91C1C', tint: '#FEF2F2', order: 5 },
  rescheduled: { label: 'Перенесена', color: '#475569', tint: '#E2E8F0', order: 6 },
};

export const priorityMeta: Record<TaskPriority, { label: string; color: string; tint: string }> = {
  high: { label: 'Срочно', color: '#B91C1C', tint: '#FEF2F2' },
  medium: { label: 'Планово', color: '#2563EB', tint: '#EFF6FF' },
  low: { label: 'Низкий приоритет', color: '#475569', tint: '#F1F5F9' },
};

export const employeeTabs: { key: EmployeeTab; label: string }[] = [
  { key: 'tasks', label: 'Сегодня' },
  { key: 'detail', label: 'Карточка' },
  { key: 'execute', label: 'Выполнение' },
  { key: 'history', label: 'История' },
  { key: 'profile', label: 'Профиль' },
];

export const managerTabs: { key: ManagerTab; label: string }[] = [
  { key: 'statistics', label: 'Статистика' },
  { key: 'tasks', label: 'Задачи' },
  { key: 'employees', label: 'Сотрудники' },
];

export const workflowSteps: TaskStatus[] = ['created', 'in_progress', 'completed'];
export const photoReportAccents = ['#FB7185', '#F97316', '#0EA5E9', '#14B8A6'];
