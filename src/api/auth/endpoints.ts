import api from '@/lib/api';

import { User } from './types';

export const postLogin = async (body: BodyInit) => {
  const response = await api.unauthorized().post<User>('auth/login', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const createUser = async (body: BodyInit) => {
  const response = await api.unauthorized().post('users/signup', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
