import api from '@/lib/api';

import { CreateUserBody, PostLoginBody, User } from './types';

export const postLogin = async (body: PostLoginBody) => {
  const response = await api.unauthorized().post<User>('auth/login', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const createUser = async (body: CreateUserBody) => {
  const response = await api.unauthorized().post('auth/register', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
