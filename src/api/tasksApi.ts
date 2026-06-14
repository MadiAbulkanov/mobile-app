import Constants from 'expo-constants';

import { Task } from '../types/fieldOps';

type BackendTask = {
  id: number | string;
  task_number?: string;
  client_name?: string;
  client_phone?: string;
  title?: string;
  description: string | null;
  created_at: string;
  status?: string;
  assigned_designer_id?: number | string | null;
  is_completed?: boolean;
  subtasks?: unknown;
};

type BackendEnvelope<T> = {
  success: boolean;
  data: T;
};

type CreateTaskPayload = Pick<
  Task,
  'title' | 'description' | 'employeeId' | 'created_at' | 'subtasks'
>;

const envApiUrl = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
  ?.env?.EXPO_PUBLIC_API_URL;

let authToken: string | null = null;

export const setApiAuthToken = (token: string | null) => {
  authToken = token;
};

const isDatabaseUrl = (value: string) => /^(postgres|postgresql):\/\//i.test(value.trim());
const needsLocaltunnelBypass = (baseUrl: string) =>
  /https?:\/\/[^/]*\.loca\.lt(\/|$)/i.test(baseUrl);

const resolveApiBaseUrl = () => {
  if (envApiUrl?.trim()) {
    if (isDatabaseUrl(envApiUrl)) {
      console.warn(
        'EXPO_PUBLIC_API_URL указывает на строку подключения к БД. Нужен HTTP URL backend API, например https://your-backend.up.railway.app/api'
      );
      return 'http://localhost:5000/api';
    }

    return envApiUrl.trim().replace(/\/$/, '');
  }

  const constantsAny = Constants as unknown as { expoConfig?: { extra?: { apiUrl?: string } } };
  const apiUrlFromExpoConfig = constantsAny.expoConfig?.extra?.apiUrl;

  if (apiUrlFromExpoConfig?.trim()) {
    return apiUrlFromExpoConfig.trim().replace(/\/$/, '');
  }

  throw new Error('EXPO_PUBLIC_API_URL is required for tasks API requests');
};

const API_BASE_URL = resolveApiBaseUrl();

const parseSubtasks = (rawValue: unknown): Task['subtasks'] => {
  if (!rawValue) {
    return undefined;
  }

  let normalized: unknown = rawValue;

  if (typeof rawValue === 'string') {
    try {
      normalized = JSON.parse(rawValue);
    } catch {
      return undefined;
    }
  }

  if (!Array.isArray(normalized)) {
    return undefined;
  }

  return normalized
    .map(item => {
      if (typeof item !== 'object' || item === null) {
        return null;
      }

      const maybeSubtask = item as { text?: unknown; completed?: unknown };

      if (typeof maybeSubtask.text !== 'string') {
        return null;
      }

      return {
        text: maybeSubtask.text,
        completed: Boolean(maybeSubtask.completed),
      };
    })
    .filter((item): item is { text: string; completed: boolean } => item !== null);
};

const resolveTaskStatus = (isCompleted?: boolean, subtasks?: Task['subtasks']) => {
  if (isCompleted) {
    return 'completed' as const;
  }

  if (subtasks?.some(item => item.completed)) {
    return 'in_progress' as const;
  }

  return 'created' as const;
};

const mapBackendTaskToTask = (task: BackendTask, fallbackEmployeeId = 'emp-1'): Task => {
  const subtasks = parseSubtasks(task.subtasks);
  const backendStatus = task.status?.toLowerCase();

  const mappedStatus =
    backendStatus === 'completed' || backendStatus === 'done'
      ? 'completed'
      : backendStatus === 'cancelled' || backendStatus === 'lost'
        ? 'cancelled'
        : backendStatus === 'postponed'
          ? 'rescheduled'
          : backendStatus === 'in_progress' || backendStatus === 'measurement_done'
            ? 'in_progress'
            : resolveTaskStatus(task.is_completed, subtasks);

  return {
    id: String(task.id),
    title: task.title ?? task.task_number ?? task.client_name ?? `Задача #${task.id}`,
    description: task.description ?? '',
    created_at: task.created_at,
    employeeId: String(task.assigned_designer_id ?? fallbackEmployeeId),
    status: mappedStatus,
    photoReports: [],
    subtasks,
  };
};

const requestJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };

  if (needsLocaltunnelBypass(API_BASE_URL)) {
    headers['bypass-tunnel-reminder'] = 'true';
    headers['abypass-tunnel-reminder'] = 'true';
  }

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const fetchTasks = async (search?: string): Promise<Task[]> => {
  const query = search?.trim() ? `?search=${encodeURIComponent(search.trim())}` : '';
  const response = await requestJson<BackendEnvelope<BackendTask[]>>(`/tasks${query}`);
  const tasks = response.data ?? [];

  return tasks.map(task => mapBackendTaskToTask(task));
};

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const taskResponse = await requestJson<BackendEnvelope<BackendTask>>('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      client_name: payload.title,
      client_phone: '+70000000000',
      description: payload.description,
      source: 'other',
      assigned_designer_id: Number(payload.employeeId) || null,
    }),
  });

  const task = taskResponse.data;

  return {
    ...mapBackendTaskToTask(task, payload.employeeId || 'emp-1'),
    created_at: payload.created_at || task.created_at,
    employeeId: payload.employeeId || 'emp-1',
  };
};

export const updateTask = async (taskId: string, patch: Partial<Task>): Promise<Task> => {
  if (patch.status === undefined) {
    return {
      id: taskId,
      title: patch.title ?? `Задача #${taskId}`,
      description: patch.description ?? '',
      created_at: patch.created_at ?? new Date().toISOString(),
      employeeId: patch.employeeId ?? 'emp-1',
      status: 'created',
      photoReports: [],
      subtasks: patch.subtasks,
    };
  }

  const statusMap: Record<Task['status'], string> = {
    created: 'lead',
    in_progress: 'in_progress',
    completed: 'completed',
    cancelled: 'lost',
    rescheduled: 'postponed',
  };

  const response = await requestJson<BackendEnvelope<BackendTask>>(`/tasks/${taskId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({
      status: statusMap[patch.status],
      notes: 'Статус обновлён из мобильного приложения',
    }),
  });

  return mapBackendTaskToTask(response.data);
};
