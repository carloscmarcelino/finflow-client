import ky, { BeforeRequestHook } from 'ky';
import { getSession } from 'next-auth/react';

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

const api = {
  authorized: () =>
    kyConfig.extend({
      hooks: {
        beforeRequest: [authorizedRequest],
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
