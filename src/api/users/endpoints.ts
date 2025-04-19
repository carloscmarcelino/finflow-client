import api from '@/lib/api';
import { ApiResponse } from '@/types';

import { User } from '../auth/types';

export const getUsers = async () => {
  const response = await api.authorized().get<ApiResponse<User>>('users');
  const data = await response.json();
  return data;
};

export const deleteUser = async (id: string) => {
  const response = await api.authorized().delete<void>(`users/${id}`);
  const data = await response.json();
  return data;
};
