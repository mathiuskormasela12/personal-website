import { act } from '@testing-library/react';
import { useRouter } from 'next/router';
import { SessionGuard } from '../../components/sessionguard/SessionGuard';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

const encode = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString('base64url');
const makeToken = (exp: number) =>
  `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ exp })}.signature`;
const expired = makeToken(Math.floor(Date.now() / 1000) - 3600);
const valid = makeToken(Math.floor(Date.now() / 1000) + 3600);

const mockRouter = (pathname: string) => {
  const replace = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    replace,
    pathname,
    query: {},
    isReady: true,
  });
  return replace;
};

it('clears expired tokens and sends the user to login from a protected page', () => {
  const replace = mockRouter('/project');
  const { store } = renderWithStore(<SessionGuard />, {
    auth: { accessToken: expired, refreshToken: expired },
  });
  expect(store.getState().auth).toEqual({ accessToken: '', refreshToken: '' });
  expect(replace).toHaveBeenCalledWith('/login?expired=1');
});

it('clears expired tokens quietly on a public page', () => {
  const replace = mockRouter('/');
  const { store } = renderWithStore(<SessionGuard />, {
    auth: { accessToken: expired, refreshToken: expired },
  });
  expect(store.getState().auth).toEqual({ accessToken: '', refreshToken: '' });
  expect(replace).not.toHaveBeenCalled();
});

it('does nothing when the access token expired but the refresh token is still valid', () => {
  const replace = mockRouter('/project');
  const { store } = renderWithStore(<SessionGuard />, {
    auth: { accessToken: expired, refreshToken: valid },
  });
  expect(store.getState().auth.refreshToken).toBe(valid);
  expect(replace).not.toHaveBeenCalled();
});

it('does nothing for a visitor who is not logged in', () => {
  const replace = mockRouter('/project');
  renderWithStore(<SessionGuard />, {
    auth: { accessToken: '', refreshToken: '' },
  });
  expect(replace).not.toHaveBeenCalled();
});

it('checks again when the page changes', () => {
  const replace = mockRouter('/');
  const { store } = renderWithStore(<SessionGuard />, {
    auth: { accessToken: valid, refreshToken: valid },
  });
  expect(replace).not.toHaveBeenCalled();
  act(() => {
    store.dispatch({
      type: 'SET_TOKEN',
      payload: { data: { accessToken: expired, refreshToken: expired } },
    });
  });
  expect(store.getState().auth.accessToken).toBe('');
});
