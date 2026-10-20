import { waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import Logout from '../../pages/logout';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

it('clears the tokens and goes home', async () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push, pathname: '/logout', query: {} });
  const { store } = renderWithStore(<Logout />, { auth: { accessToken: 'a', refreshToken: 'r' } });
  await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
  expect(store.getState().auth).toEqual({ accessToken: '', refreshToken: '' });
});
