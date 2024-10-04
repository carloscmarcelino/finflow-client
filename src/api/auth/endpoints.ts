import { api } from '@/lib/FetchClient';

import { LoginFn, RefreshFn } from './types';

export const postLogin: LoginFn = ({ username, password, config }) =>
  api.unauthorized.post('/auth/login', {
    body: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

export const postRefreshToken: RefreshFn = ({ access_token }) =>
  api.unauthorized.post('/auth/refresh-token', {
    body: { access_token },
  });
