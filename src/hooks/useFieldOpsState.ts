import { startTransition, useEffect, useMemo, useState } from 'react';

import { loginRequest } from '../api/authApi';
import {
  createTask as createTaskRequest,
  fetchTasks as fetchTasksRequest,
  setApiAuthToken,
  updateTask as updateTaskRequest,
} from '../api/tasksApi';
import { photoReportAccents } from '../mocks/fieldOpsData';
import {
  BackendRole,
  CreateTaskForm,
  ManagerTab,
  MetricSummary,
  OwnerClient,
  OwnerClientDraft,
  OwnerOrderCard,
  OwnerOrderDraft,
  OwnerOrdersTab,
  Role,
  Task,
  TaskStatus,
} from '../types/fieldOps';

const demoLoginRoleByEmail: Record<string, BackendRole> = {
  'demo-owner@local': 'Owner',
  'demo-designer@local': 'Designer',
  'demo-warehouse@local': 'Warehouse',
  'demo-seamstress@local': 'Seamstress',
  'demo-installer@local': 'Installer',
};

const initialOwnerClients: OwnerClient[] = [
  { id: 'customer-1', fullName: 'Алина Морозова', phone: '+7 999 100-20-30' },
  { id: 'customer-2', fullName: 'Дмитрий Захаров', phone: '+7 999 111-22-33' },
  { id: 'customer-3', fullName: 'Ирина Лебедева', phone: '+7 999 222-33-44' },
];

type DesignerMeasurementDraft = {
  room: string;
  product: string;
  width: string;
  height: string;
  curtainFabric: string;
  curtainCentimeter: string;
  tulleFabric: string;
  tulleCentimeter: string;
  mountType: string;
  note: string;
};

type DesignerMeasurement = DesignerMeasurementDraft & {
  id: string;
  orderId: string;
  cost: string;
};

type CurrentUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  isSuperuser: boolean;
  groups: string[];
};

const initialDesignerMeasurements: DesignerMeasurement[] = [
  {
    id: 'measurement-1',
    orderId: 'mock-1',
    room: 'Гостиная',
    product: 'Окно 1',
    width: '120',
    height: '100',
    curtainFabric: 'блэкаут',
    curtainCentimeter: '300',
    tulleFabric: 'лен',
    tulleCentimeter: '300',
    mountType: 'Потолочное',
    note: 'Без подхватов',
    cost: '45 000 ₸',
  },
  {
    id: 'measurement-2',
    orderId: 'mock-1',
    room: 'Спальня',
    product: 'Окно 1',
    width: '150',
    height: '120',
    curtainFabric: 'велюр',
    curtainCentimeter: '250',
    tulleFabric: 'вуаль',
    tulleCentimeter: '250',
    mountType: 'Стеновое',
    note: 'С подкладом',
    cost: '62 500 ₸',
  },
  {
    id: 'measurement-3',
    orderId: 'mock-1',
    room: 'Кухня',
    product: 'Окно 1',
    width: '100',
    height: '80',
    curtainFabric: 'рогожка',
    curtainCentimeter: '200',
    tulleFabric: 'органза',
    tulleCentimeter: '200',
    mountType: 'Скрытое',
    note: 'Короткий подгиб',
    cost: '35 000 ₸',
  },
];

const createOwnerOrderCard = (draft: OwnerOrderDraft): OwnerOrderCard => {
  const timestamp = new Date().toISOString();

  return {
    id: `owner-order-${Date.now()}`,
    order_number: `О-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    created_at: timestamp,
    status: 'in_work',
    amount: '—',
    customerId: draft.customerId,
    customerName: draft.customerName,
    selectedDesigner: draft.selectedDesigner,
    measurementDate: draft.measurementDate,
    plannedCompletion: draft.plannedCompletion,
    installationCity: draft.installationCity,
    installationStreet: draft.installationStreet,
    installationBuilding: draft.installationBuilding,
    installationApartment: draft.installationApartment,
    installationNotes: draft.installationNotes,
    notes: draft.notes,
  };
};

export const useFieldOpsState = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ownerOrders, setOwnerOrders] = useState<OwnerOrderCard[]>([]);
  const [ownerOrderDraft, setOwnerOrderDraft] = useState<OwnerOrderDraft | null>(null);
  const [ownerEditingOrderId, setOwnerEditingOrderId] = useState<string | null>(null);
  const [isOwnerOrderEditing, setIsOwnerOrderEditing] = useState(false);
  const [designerMeasurements, setDesignerMeasurements] = useState<DesignerMeasurement[]>(
    initialDesignerMeasurements
  );
  const [designerMeasurementDraft, setDesignerMeasurementDraft] =
    useState<DesignerMeasurementDraft | null>(null);
  const [designerEditingMeasurementId, setDesignerEditingMeasurementId] = useState<string | null>(
    null
  );
  const [isDesignerMeasurementEditing, setIsDesignerMeasurementEditing] = useState(false);
  const [ownerClients, setOwnerClients] = useState<OwnerClient[]>(initialOwnerClients);
  const [role, setRole] = useState<Role | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [managerTab, setManagerTab] = useState<ManagerTab>('statistics');
  const [ownerScreen, setOwnerScreen] = useState<
    'analytics' | 'orders' | 'create' | 'clients' | 'detail' | 'measurement-create'
  >('analytics');
  const [ownerOrdersTab, setOwnerOrdersTab] = useState<OwnerOrdersTab>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    setApiAuthToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    let isActive = true;

    const loadTasks = async () => {
      try {
        const remoteTasks = await fetchTasksRequest();

        if (!isActive) {
          return;
        }

        setTasks(remoteTasks);
        setSelectedTaskId(currentId =>
          remoteTasks.some(task => task.id === currentId) ? currentId : (remoteTasks[0]?.id ?? null)
        );
      } catch (error) {
        console.warn('Не удалось загрузить задачи из API.', error);
      }
    };

    void loadTasks();

    return () => {
      isActive = false;
    };
  }, []);

  const selectedTask = useMemo(
    () => tasks.find(task => task.id === selectedTaskId) ?? tasks[0],
    [selectedTaskId, tasks]
  );

  const selectedOrder = useMemo(
    () => ownerOrders.find(order => order.id === selectedOrderId),
    [selectedOrderId, ownerOrders]
  );

  const metrics = useMemo<MetricSummary>(() => {
    const completed = tasks.filter(task => task.status === 'completed').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const reports = tasks.reduce((total, task) => total + task.photoReports.length, 0);

    return {
      total: tasks.length,
      completed,
      inProgress,
      reports,
    };
  }, [tasks]);

  const openTask = (taskId: string) => {
    startTransition(() => {
      setSelectedTaskId(taskId);
    });
  };

  const login = async (email: string, password: string) => {
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const demoRole = demoLoginRoleByEmail[normalizedEmail];

      if (demoRole) {
        setAccessToken(`demo-token-${demoRole}`);
        setRefreshToken(null);
        setCurrentUser({
          id: `demo-${demoRole.toLowerCase()}`,
          username: normalizedEmail,
          email: normalizedEmail,
          firstName: '',
          lastName: '',
          isStaff: demoRole === 'Owner',
          isSuperuser: demoRole === 'Owner',
          groups: [demoRole],
        });
        setRole(demoRole);
        setOwnerScreen(demoRole === 'Designer' ? 'orders' : 'analytics');
        return true;
      }

      const session = await loginRequest(email, password);
      setAccessToken(session.accessToken);
      setRefreshToken(session.refreshToken);
      setCurrentUser({
        id: session.user.id,
        username: session.user.username,
        email: session.user.email,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        isStaff: session.user.isStaff,
        isSuperuser: session.user.isSuperuser,
        groups: session.user.groups,
      });
      setRole(session.user.role);
      setOwnerScreen(session.user.role === 'Designer' ? 'orders' : 'analytics');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка входа';
      setAuthError(message);
      return false;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setCurrentUser(null);
    setRole(null);
    setAuthError(null);
    setOwnerOrderDraft(null);
    setOwnerEditingOrderId(null);
    setIsOwnerOrderEditing(false);
    setDesignerMeasurementDraft(null);
    setDesignerEditingMeasurementId(null);
    setIsDesignerMeasurementEditing(false);
    setSelectedOrderId(null);
    setOwnerScreen('analytics');
    setOwnerOrdersTab('all');
  };

  const openOwnerOrders = (tab: OwnerOrdersTab) => {
    setOwnerOrdersTab(tab);
    setOwnerScreen('orders');
  };

  const openOwnerCreateOrder = (draft?: OwnerOrderDraft, orderId?: string) => {
    setOwnerOrderDraft(draft ?? null);
    setOwnerEditingOrderId(orderId ?? null);
    setIsOwnerOrderEditing(Boolean(draft));
    setOwnerScreen('create');
  };

  const openOwnerClients = () => {
    setOwnerScreen('clients');
  };

  const openOwnerOrdersPage = () => {
    setOwnerOrderDraft(null);
    setOwnerEditingOrderId(null);
    setIsOwnerOrderEditing(false);
    setOwnerScreen('orders');
  };

  const openOwnerAnalytics = () => {
    setOwnerOrderDraft(null);
    setOwnerEditingOrderId(null);
    setIsOwnerOrderEditing(false);
    setOwnerScreen('analytics');
  };

  const createOwnerOrder = (draft: OwnerOrderDraft) => {
    setOwnerOrders(currentOrders => [createOwnerOrderCard(draft), ...currentOrders]);
    setOwnerOrderDraft(null);
    setOwnerEditingOrderId(null);
    setIsOwnerOrderEditing(false);
    setOwnerScreen('orders');
  };

  const updateOwnerOrder = (orderId: string, draft: OwnerOrderDraft) => {
    setOwnerOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId
          ? {
              ...order,
              customerId: draft.customerId,
              customerName: draft.customerName,
              selectedDesigner: draft.selectedDesigner,
              measurementDate: draft.measurementDate,
              plannedCompletion: draft.plannedCompletion,
              installationCity: draft.installationCity,
              installationStreet: draft.installationStreet,
              installationBuilding: draft.installationBuilding,
              installationApartment: draft.installationApartment,
              installationNotes: draft.installationNotes,
              notes: draft.notes,
            }
          : order
      )
    );
    setOwnerOrderDraft(null);
    setOwnerEditingOrderId(null);
    setIsOwnerOrderEditing(false);
    setOwnerScreen('orders');
  };

  const deleteOwnerOrder = (orderId: string) => {
    setOwnerOrders(currentOrders => currentOrders.filter(order => order.id !== orderId));
    setSelectedOrderId(null);
    setOwnerScreen('orders');
  };

  const openOrderDetail = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOwnerScreen('detail');
  };

  const openOrdersList = () => {
    setSelectedOrderId(null);
    setOwnerScreen('orders');
  };

  const openMeasurementCreate = (draft?: DesignerMeasurementDraft, measurementId?: string) => {
    setDesignerMeasurementDraft(draft ?? null);
    setDesignerEditingMeasurementId(measurementId ?? null);
    setIsDesignerMeasurementEditing(Boolean(draft));
    setOwnerScreen('measurement-create');
  };

  const createDesignerMeasurement = (draft: DesignerMeasurementDraft) => {
    const orderId = selectedOrderId ?? 'mock-1';

    setDesignerMeasurements(currentMeasurements => [
      {
        id: `measurement-${Date.now()}`,
        orderId,
        ...draft,
        cost: '86 000 ₸',
      },
      ...currentMeasurements,
    ]);
    setDesignerMeasurementDraft(null);
    setDesignerEditingMeasurementId(null);
    setIsDesignerMeasurementEditing(false);
    setOwnerScreen('detail');
  };

  const updateDesignerMeasurement = (measurementId: string, draft: DesignerMeasurementDraft) => {
    setDesignerMeasurements(currentMeasurements =>
      currentMeasurements.map(measurement =>
        measurement.id === measurementId ? { ...measurement, ...draft } : measurement
      )
    );
    setDesignerMeasurementDraft(null);
    setDesignerEditingMeasurementId(null);
    setIsDesignerMeasurementEditing(false);
    setOwnerScreen('detail');
  };

  const deleteDesignerMeasurement = (measurementId: string) => {
    setDesignerMeasurements(currentMeasurements =>
      currentMeasurements.filter(measurement => measurement.id !== measurementId)
    );
  };

  const openOrderDetailPage = () => {
    if (!selectedOrderId) {
      setOwnerScreen('orders');
      return;
    }

    setDesignerMeasurementDraft(null);
    setDesignerEditingMeasurementId(null);
    setIsDesignerMeasurementEditing(false);
    setOwnerScreen('detail');
  };

  const createOwnerClient = (draft: OwnerClientDraft) => {
    setOwnerClients(currentClients => [
      {
        id: `customer-${Date.now()}`,
        fullName: draft.fullName.trim(),
        phone: draft.phone.trim(),
      },
      ...currentClients,
    ]);
  };

  const updateOwnerClient = (clientId: string, draft: OwnerClientDraft) => {
    setOwnerClients(currentClients =>
      currentClients.map(client =>
        client.id === clientId
          ? { ...client, fullName: draft.fullName.trim(), phone: draft.phone.trim() }
          : client
      )
    );
  };

  const deleteOwnerClient = (clientId: string) => {
    setOwnerClients(currentClients => currentClients.filter(client => client.id !== clientId));
  };

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    setTasks(currentTasks =>
      currentTasks.map(task => (task.id === taskId ? { ...task, status } : task))
    );

    try {
      await updateTaskRequest(taskId, { status });
    } catch (error) {
      console.warn('Не удалось обновить статус задачи в API.', error);
    }
  };

  const updateTask = async (taskId: string, patch: Partial<Task>) => {
    setTasks(currentTasks =>
      currentTasks.map(task => (task.id === taskId ? { ...task, ...patch } : task))
    );

    try {
      const apiTask = await updateTaskRequest(taskId, patch);

      setTasks(currentTasks =>
        currentTasks.map(task => {
          if (task.id !== taskId) {
            return task;
          }

          return {
            ...task,
            title: apiTask.title,
            description: apiTask.description,
            created_at: patch.created_at ?? task.created_at,
            subtasks: apiTask.subtasks,
          };
        })
      );
    } catch (error) {
      console.warn('Не удалось обновить задачу в API.', error);
    }
  };

  const createTask = async (form: CreateTaskForm) => {
    try {
      const apiTask = await createTaskRequest(form);

      setTasks(currentTasks => [apiTask, ...currentTasks]);
      setSelectedTaskId(apiTask.id);
      setManagerTab('tasks');
    } catch (error) {
      console.warn('Не удалось создать задачу в API.', error);
    }
  };

  const appendComment = (taskId: string, comment: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task => (task.id === taskId ? { ...task, comment } : task))
    );
  };

  const attachPhoto = (taskId: string) => {
    const time = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          photoReports: [
            ...task.photoReports,
            {
              id: `${task.id}-${task.photoReports.length + 1}`,
              label: `Фотоотчёт ${task.photoReports.length + 1}`,
              time,
              note: 'Добавлено с мобильного устройства сотрудника.',
              accent: photoReportAccents[task.photoReports.length % photoReportAccents.length],
            },
          ],
        };
      })
    );
  };

  return {
    state: {
      role,
      accessToken,
      refreshToken,
      currentUser,
      authError,
      isAuthLoading,
      managerTab,
      ownerScreen,
      ownerOrdersTab,
      ownerOrders,
      ownerOrderDraft,
      ownerEditingOrderId,
      isOwnerOrderEditing,
      designerMeasurements,
      designerMeasurementDraft,
      designerEditingMeasurementId,
      isDesignerMeasurementEditing,
      selectedOrderId,
      selectedOrder,
      ownerClients,
      tasks,
      selectedTask,
      metrics,
    },
    actions: {
      login,
      logout,
      setRole,
      setManagerTab,
      openOwnerOrders,
      openOwnerCreateOrder,
      openOwnerClients,
      openOwnerOrdersPage,
      openOwnerAnalytics,
      createOwnerOrder,
      updateOwnerOrder,
      deleteOwnerOrder,
      openOrderDetail,
      openOrdersList,
      openMeasurementCreate,
      createDesignerMeasurement,
      updateDesignerMeasurement,
      deleteDesignerMeasurement,
      openOrderDetailPage,
      createOwnerClient,
      updateOwnerClient,
      deleteOwnerClient,
      openTask,
      createTask,
      updateTask,
      updateTaskStatus,
      appendComment,
      attachPhoto,
    },
  };
};
