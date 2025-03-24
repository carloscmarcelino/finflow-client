import api from '@/lib/api';

import { CreateUserBody, PostLoginBody, User } from './types';

export const postLogin = async (body: PostLoginBody) => {
  const response = await api.unauthorized().post<User>('auth/login', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const createUser = async (body: CreateUserBody) => {
  const response = await api.unauthorized().post('users/signup', {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
