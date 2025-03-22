import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';
import { getSession, signOut } from 'next-auth/react';

import { API_URL } from '@/config';

import { auth } from './auth';

const kyConfig = ky.create({
  prefixUrl: API_URL,
  timeout: false,
});

export const isClient = () => typeof window !== 'undefined';

const authorizedRequest: BeforeRequestHook = async (request) => {
  const session = await (isClient() ? getSession() : auth());
  const token = session?.access_token;
  request.headers.set('Authorization', `Bearer ${token}`);
};

const handleSingout: AfterResponseHook = async (request, options, response) => {
  if (response.status === 401) {
    await signOut({ redirect: true, redirectTo: '/login' });
  }
  return response;
};

const api = {
  authorized: () =>
    kyConfig.extend({
      hooks: {
        beforeRequest: [authorizedRequest],
        afterResponse: [handleSingout],
      },
    }),
  unauthorized: () =>
    kyConfig.extend({
      hooks: {
        beforeRequest: [],
      },
    }),
};

export default api;
