import { BackendRole } from '../types/fieldOps';

const API_BASE_URL = 'https://ateliererp-production.up.railway.app/api';

type TokenResponse = {
  refresh: string;
  access: string;
};

export type MeResponse = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  groups: string[];
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isStaff: boolean;
    isSuperuser: boolean;
    groups: string[];
    role: BackendRole;
  };
};

const resolveRoleFromUser = (user: MeResponse): BackendRole => {
  if (user.is_superuser || user.is_staff) {
    return 'Owner';
  }

  const normalizedGroups = user.groups.map(group => group.trim().toLowerCase());

  if (normalizedGroups.some(group => group.includes('designer') || group.includes('дизайнер'))) {
    return 'Designer';
  }
  if (normalizedGroups.some(group => group.includes('warehouse') || group.includes('склад'))) {
    return 'Warehouse';
  }
  if (
    normalizedGroups.some(
      group => group.includes('seamstress') || group.includes('швей') || group.includes('цех')
    )
  ) {
    return 'Seamstress';
  }
  if (normalizedGroups.some(group => group.includes('installer') || group.includes('монтаж'))) {
    return 'Installer';
  }

  return 'Owner';
};

export const getCurrentUserRequest = async (accessToken: string): Promise<MeResponse> => {
  const response = await fetch(`${API_BASE_URL}/me/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Get current user failed with status ${response.status}`);
  }

  return (await response.json()) as MeResponse;
};

export const loginRequest = async (username: string, password: string): Promise<AuthSession> => {
  const response = await fetch(`${API_BASE_URL}/auth/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const tokenPayload = (await response.json()) as TokenResponse;

  if (!tokenPayload.access || !tokenPayload.refresh) {
    throw new Error('Некорректный ответ авторизации');
  }

  const me = await getCurrentUserRequest(tokenPayload.access);
  const role = resolveRoleFromUser(me);

  return {
    accessToken: tokenPayload.access,
    refreshToken: tokenPayload.refresh,
    user: {
      id: String(me.id),
      username: me.username,
      email: me.email,
      firstName: me.first_name,
      lastName: me.last_name,
      isStaff: me.is_staff,
      isSuperuser: me.is_superuser,
      groups: me.groups,
      role,
    },
  };
};
