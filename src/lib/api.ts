import ky, { BeforeRequestHook } from 'ky';

import { API_URL } from '@/config';

import { auth } from './auth';

const kyConfig = ky.create({
  prefixUrl: API_URL,
  timeout: false,
});

const authorizedRequest: BeforeRequestHook = async (request) => {
  const session = await auth();
  const accessToken = session?.user?.access_token;

  request.headers.set('Authorization', `Bearer ${accessToken}`);
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
