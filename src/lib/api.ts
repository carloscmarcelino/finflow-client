import ky, { BeforeRequestHook } from 'ky';
import { getSession } from 'next-auth/react';

import { API_URL, IS_CLIENT } from '@/config';

import { auth } from './auth';

const kyConfig = ky.create({
  prefixUrl: API_URL,
  timeout: false,
});

const clientAuthorizedRequest: BeforeRequestHook = async (request) => {
  const session = await getSession();
  const accessToken = session?.user?.access_token;

  request.headers.set('Authorization', `Bearer ${accessToken}`);
};

const serverAuthorizedRequest: BeforeRequestHook = async (request) => {
  const session = await auth();
  const accessToken = session?.user?.access_token;

  request.headers.set('Authorization', `Bearer ${accessToken}`);
};

const api = {
  authorized: () =>
    kyConfig.extend({
      hooks: {
        beforeRequest: [IS_CLIENT ? clientAuthorizedRequest : serverAuthorizedRequest],
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
