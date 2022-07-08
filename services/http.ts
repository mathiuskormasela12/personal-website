// ========== HTTP Service
// import all modules
import axios from 'axios';
import { setToken } from '../redux/actions/auth';
import persistedStore from '../redux/store';

const { NEXT_PUBLIC_API_URL } = process.env;

const { store } = persistedStore;

const http = () => {
  const { dispatch, getState } = store;
  const instances = axios.create({
    baseURL: NEXT_PUBLIC_API_URL,
  });

  instances.interceptors.request.use(
    (config: any) => {
      const { accessToken } = getState().auth;

      if (accessToken) {
        config.headers['x-access-token'] = accessToken;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instances.interceptors.response.use(
    (res: unknown) => res,
    async (err: any) => {
      const originalConfig = err.config;
      const { refreshToken } = getState().auth;

      if (err.response) {
        // Access Token was expired
        if (err.response.status === 403 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const { data } = await instances.post('/auth/access-token', {
              refreshToken,
            });
            dispatch(
              setToken(data.results.accessToken, data.results.refreshToken),
            );

            return instances(originalConfig);
          } catch (_error: any) {
            // eslint-disable-next-line no-console
            console.log(_error);

            dispatch(setToken('', ''));

            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 400 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    },
  );
  return instances;
};

export default http;
