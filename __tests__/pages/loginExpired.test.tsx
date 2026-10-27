import { screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Login from '../../pages/login';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

const routerWith = (query: Record<string, string>) =>
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/login',
    query,
    isReady: true,
  });

beforeEach(() => {
  jest.spyOn(Swal, 'fire').mockResolvedValue({} as never);
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('tells the user the session has expired when sent here with expired=1', async () => {
  routerWith({ expired: '1' });
  renderWithStore(<Login />, { auth: { accessToken: '', refreshToken: '' } });
  await waitFor(() =>
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Session expired',
        text: 'Your session has expired. Please log in again.',
      }),
    ),
  );
});

it('shows no expiry message on a normal visit to login', async () => {
  routerWith({});
  renderWithStore(<Login />, { auth: { accessToken: '', refreshToken: '' } });
  expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  expect(Swal.fire).not.toHaveBeenCalled();
});
