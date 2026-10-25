import { waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Logout from '../../pages/logout';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}));

const push = jest.fn();
const replace = jest.fn();
const loggedIn = { auth: { accessToken: 'a', refreshToken: 'r' } };

const answer = (result: object) =>
  (Swal.fire as jest.Mock).mockResolvedValue(result);

const mockRouter = (query: Record<string, string> = {}, isReady = true) =>
  (useRouter as jest.Mock).mockReturnValue({
    push,
    replace,
    pathname: '/logout',
    query,
    isReady,
  });

beforeEach(() => {
  push.mockClear();
  replace.mockClear();
  (Swal.fire as jest.Mock).mockReset();
  mockRouter({ from: '/hero-edit' });
});

it('asks before logging out and keeps the login while the popup is open', async () => {
  (Swal.fire as jest.Mock).mockReturnValue(new Promise(() => {}));
  const { store } = renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
  expect(Swal.fire).toHaveBeenCalledWith(
    expect.objectContaining({
      title: 'Log out?',
      text: 'You will need to sign in again to edit your site.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Log out',
      cancelButtonText: 'Stay',
      confirmButtonColor: 'var(--color-danger)',
      focusCancel: true,
    }),
  );
  expect(store.getState().auth).toEqual({
    accessToken: 'a',
    refreshToken: 'r',
  });
  expect(push).not.toHaveBeenCalled();
  expect(replace).not.toHaveBeenCalled();
});

it('clears the login and goes home after the owner confirms', async () => {
  answer({ isConfirmed: true, isDismissed: false });
  const { store } = renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(replace).toHaveBeenCalledWith('/'));
  expect(store.getState().auth).toEqual({ accessToken: '', refreshToken: '' });
});

it('stays logged in and returns to the page the owner came from on Stay', async () => {
  answer({ isConfirmed: false, isDismissed: true, dismiss: 'cancel' });
  const { store } = renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(replace).toHaveBeenCalledWith('/hero-edit'));
  expect(store.getState().auth).toEqual({
    accessToken: 'a',
    refreshToken: 'r',
  });
});

it('replaces the logout page in the history, so Back never reopens the popup', async () => {
  answer({ isConfirmed: false, isDismissed: true, dismiss: 'cancel' });
  renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(replace).toHaveBeenCalledTimes(1));
  expect(push).not.toHaveBeenCalled();
});

it.each(['esc', 'backdrop', 'close'])(
  'treats closing the popup (%s) like Stay',
  async (dismiss) => {
    answer({ isConfirmed: false, isDismissed: true, dismiss });
    const { store } = renderWithStore(<Logout />, loggedIn);
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/hero-edit'));
    expect(store.getState().auth.accessToken).toBe('a');
  },
);

it('goes home on Stay when the page was opened directly', async () => {
  mockRouter({});
  answer({ isConfirmed: false, isDismissed: true, dismiss: 'cancel' });
  renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(replace).toHaveBeenCalledWith('/'));
});

it.each([
  ['another website', 'https://evil.example/phish'],
  ['a protocol-relative link', '//evil.example'],
  ['a script', 'javascript:alert(1)'],
  ['a backslash trick', '/\\evil.example'],
  ['the logout page itself', '/logout?from=/'],
  ['a path without a slash', 'hero-edit'],
  ['an empty value', ''],
])('only returns to this site, never to %s', async (_, from) => {
  mockRouter({ from });
  answer({ isConfirmed: false, isDismissed: true, dismiss: 'cancel' });
  renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(replace).toHaveBeenCalledWith('/'));
});

it('keeps a query string of the page it returns to', async () => {
  mockRouter({ from: '/?page=2' });
  answer({ isConfirmed: false, isDismissed: true, dismiss: 'cancel' });
  renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(replace).toHaveBeenCalledWith('/?page=2'));
});

it('asks only once, even when React runs the effect twice', async () => {
  (Swal.fire as jest.Mock).mockReturnValue(new Promise(() => {}));
  const { unmount } = renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
  unmount();
  expect(Swal.fire).toHaveBeenCalledTimes(1);
});

it('does nothing when the popup answer arrives after leaving the page', async () => {
  let resolve: (value: object) => void = () => {};
  (Swal.fire as jest.Mock).mockReturnValue(
    new Promise((done) => {
      resolve = done;
    }),
  );
  const { unmount, store } = renderWithStore(<Logout />, loggedIn);
  await waitFor(() => expect(Swal.fire).toHaveBeenCalled());
  unmount();
  resolve({ isConfirmed: true, isDismissed: false });
  await Promise.resolve();
  await Promise.resolve();
  expect(replace).not.toHaveBeenCalled();
  expect(store.getState().auth.accessToken).toBe('a');
});

it('waits until the router knows the query, so the popup opens only once', async () => {
  mockRouter({}, false);
  (Swal.fire as jest.Mock).mockReturnValue(new Promise(() => {}));
  const { store, rerender } = renderWithStore(<Logout />, loggedIn);
  await Promise.resolve();
  expect(Swal.fire).not.toHaveBeenCalled();

  mockRouter({ from: '/hero-edit' }, true);
  rerender(
    <Provider store={store}>
      <Logout />
    </Provider>,
  );
  await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
});
