import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { Navbar } from '../../components';
import { PROFILE_DEFAULTS } from '../../constants';
import { setCachedProfile } from '../../hooks/useProfile';
import Services from '../../services';
import { emptyProject, projectsState, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}));
const push = jest.fn();
beforeEach(() => {
  setCachedProfile(null);
  jest.spyOn(Services, 'getProfile').mockRejectedValue(new Error('offline'));
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
  expect(
    screen.queryByRole('button', { name: 'Admin' }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute(
    'href',
    '#skills',
  );
  expect(container.querySelectorAll('a a')).toHaveLength(0);
  expect(container.querySelectorAll('ul > a')).toHaveLength(0);
});

it('keeps the admin top bar short and puts admin pages in a dropdown', async () => {
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
  });
  ['Home', 'Projects', 'Contact'].forEach((name) =>
    expect(screen.getByRole('link', { name })).toBeInTheDocument(),
  );
  ['Create Project', 'Edit Hero', 'Edit Profile', 'Logout'].forEach((name) =>
    expect(screen.queryByRole('link', { name })).not.toBeInTheDocument(),
  );

  await userEvent.click(screen.getByRole('button', { name: 'Admin' }));
  [
    ['Create Project', '/project'],
    ['Edit Hero', '/hero-edit'],
    ['Edit Profile', '/profile-edit'],
    ['Logout', '/logout'],
  ].forEach(([name, href]) =>
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href),
  );
});

it('highlights Admin while an admin page is open', () => {
  (useRouter as jest.Mock).mockReturnValue({
    push,
    pathname: '/hero-edit',
    query: {},
  });
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
  });
  expect(
    screen.getByRole('button', { name: 'Admin' }).closest('li'),
  ).toHaveStyle({ backgroundColor: 'rgb(210, 234, 253)' });
  expect(
    screen.getByRole('link', { name: 'Home' }).closest('li'),
  ).not.toHaveStyle({ backgroundColor: 'rgb(210, 234, 253)' });
});

it('opens the edit action for the current project', async () => {
  (Swal.fire as jest.Mock).mockResolvedValue({
    isConfirmed: true,
    isDenied: false,
  });
  renderWithStore(<Navbar />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
    projects: projectsState({ project: { ...emptyProject, id: 5 } }),
  });
  await userEvent.click(screen.getByRole('button', { name: 'Action' }));
  expect(Swal.fire).toHaveBeenCalled();
  await waitFor(() => expect(push).toHaveBeenCalledWith('/project-edit/5'));
});

it('shows the name from the profile as the brand', async () => {
  jest.spyOn(Services, 'getProfile').mockResolvedValue({
    data: { results: { ...PROFILE_DEFAULTS, name: 'Mathius K' } },
  } as never);
  renderWithStore(<Navbar />);
  expect(
    await screen.findByRole('link', { name: 'Mathius K' }),
  ).toHaveAttribute('href', '/');
});
