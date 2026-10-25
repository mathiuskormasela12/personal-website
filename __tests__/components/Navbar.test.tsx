import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { Navbar } from '../../components';
import { emptyProject, projectsState, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}));
const push = jest.fn();
beforeEach(() => {
  push.mockClear();
  (useRouter as jest.Mock).mockReturnValue({ push, pathname: '/', query: {} });
});

it('shows visitor links, a single brand link and Hire Me', () => {
  const { container } = renderWithStore(<Navbar />);
  expect(screen.getByRole('link', { name: 'Mathius' })).toHaveAttribute(
    'href',
    '/',
  );
  ['Home', 'Projects', 'Skills', 'Contact'].forEach((t) =>
    expect(screen.getByRole('link', { name: t })).toBeInTheDocument(),
  );
  expect(screen.getByRole('button', { name: 'Hire Me' })).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Edit Hero' }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: 'Edit Profile' }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute(
    'href',
    '#skills',
  );
  expect(container.querySelectorAll('a a')).toHaveLength(0);
  expect(container.querySelectorAll('ul > a')).toHaveLength(0);
});

it('shows admin links and opens the edit action for the current project', async () => {
  (Swal.fire as jest.Mock).mockResolvedValue({
    isConfirmed: true,
    isDenied: false,
  });
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
    projects: projectsState({ project: { ...emptyProject, id: 5 } }),
  });
  expect(screen.getByRole('link', { name: 'Create' })).toHaveAttribute(
    'href',
    '/project',
  );
  expect(screen.getByRole('link', { name: 'Logout' })).toHaveAttribute(
    'href',
    '/logout',
  );
  expect(screen.getByRole('link', { name: 'Edit Hero' })).toHaveAttribute(
    'href',
    '/hero-edit',
  );
  expect(screen.getByRole('link', { name: 'Edit Profile' })).toHaveAttribute(
    'href',
    '/profile-edit',
  );
  await userEvent.click(screen.getByRole('button', { name: 'Action' }));
  expect(Swal.fire).toHaveBeenCalled();
  await waitFor(() => expect(push).toHaveBeenCalledWith('/project-edit/5'));
});
