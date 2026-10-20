import { AxiosError, type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios';
import http from '../../services/http';
import persistedStore from '../../redux/store';
import { setToken } from '../../redux/actions/auth';

const { store } = persistedStore;
const ok = (config: InternalAxiosRequestConfig, data: unknown) => ({ data, status: 200, statusText: 'OK', headers: {}, config });
const fail = (config: InternalAxiosRequestConfig, status: number, data: unknown) => new AxiosError(
  'fail', 'ERR_BAD_REQUEST', config, null, { data, status, statusText: '', headers: {}, config },
);

beforeEach(() => { jest.spyOn(console, 'log').mockImplementation(() => {}); });

it('sends the access token header', async () => {
  store.dispatch(setToken('acc', 'ref'));
  const instance = http();
  const adapter = jest.fn<ReturnType<AxiosAdapter>, Parameters<AxiosAdapter>>(async (config) => ok(config, {}));
  instance.defaults.adapter = adapter;
  await instance.get('/projects');
  expect(adapter.mock.calls[0][0].headers.get('x-access-token')).toBe('acc');
});

it('refreshes the token once on 403 and retries the request', async () => {
  store.dispatch(setToken('old', 'ref'));
  const instance = http();
  const calls: string[] = [];
  instance.defaults.adapter = async (config) => {
    calls.push(`${config.method} ${config.url}`);
    if (config.url === '/auth/access-token') return ok(config, { results: { accessToken: 'new', refreshToken: 'ref2' } });
    if (config.headers.get('x-access-token') === 'old') throw fail(config, 403, {});
    return ok(config, { ok: true });
  };
  const res = await instance.get('/projects');
  expect(res.data).toEqual({ ok: true });
  expect(calls).toEqual(['get /projects', 'post /auth/access-token', 'get /projects']);
  expect(store.getState().auth).toMatchObject({ accessToken: 'new', refreshToken: 'ref2' });
});

it('clears the tokens when the refresh itself fails', async () => {
  store.dispatch(setToken('old', 'ref'));
  const instance = http();
  instance.defaults.adapter = async (config) => {
    if (config.url === '/auth/access-token') throw fail(config, 401, { message: 'expired' });
    throw fail(config, 403, {});
  };
  await expect(instance.get('/projects')).rejects.toEqual({ message: 'expired' });
  expect(store.getState().auth).toMatchObject({ accessToken: '', refreshToken: '' });
});

it('rejects 400 responses with the API body', async () => {
  const instance = http();
  instance.defaults.adapter = async (config) => { throw fail(config, 400, { message: 'bad' }); };
  await expect(instance.post('/auth/login', {})).rejects.toEqual({ message: 'bad' });
});
