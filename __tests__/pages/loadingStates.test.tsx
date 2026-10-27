import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Project from '../../pages/project';
import ProjectEdit from '../../pages/project-edit/[:id]';
import Services from '../../services';
import { emptyProject, projectsState, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

const loggedIn = { accessToken: 'a', refreshToken: 'r' };
const project = {
  ...emptyProject,
  id: 3,
  title: 'Old title',
  description: 'Old description',
  img: '/images/wkw.jpg',
  technologies: [{ id: 1, name: 'react', variant: 'primary' as const }],
};

const pendingForever = () => new Promise<never>(() => {});
const failAfterTick = () =>
  new Promise<never>((_, reject) => {
    setTimeout(() => reject({ message: 'Something went wrong' }), 0);
  });

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
    query: { ':id': '3' },
    isReady: true,
  });
  jest.spyOn(Swal, 'fire').mockResolvedValue({} as never);
  URL.createObjectURL = jest.fn(() => 'blob:picked');
  URL.revokeObjectURL = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

const expectBusyWhileSaving = async (name: string) => {
  const button = screen.getByRole('button', { name });
  expect(button).toHaveAttribute('aria-busy', 'true');
  expect(button).toBeDisabled();
};

const expectReleasedAfterFailure = async (name: string) => {
  await waitFor(() =>
    expect(screen.getByRole('button', { name })).not.toHaveAttribute(
      'aria-busy',
    ),
  );
  expect(screen.getByRole('button', { name })).toBeEnabled();
};

describe('loading spinner on the login page', () => {
  it('shows the spinner while signing in, then releases the button after a failure', async () => {
    jest.spyOn(Services, 'login').mockImplementationOnce(pendingForever);
    renderWithStore(<Login />, { auth: { accessToken: '', refreshToken: '' } });
    fireEvent.change(screen.getByPlaceholderText('Email...'), {
      target: { value: 'me@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'Secret#123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    await expectBusyWhileSaving('Sign In');
  });

  it('releases the button after a failed sign in', async () => {
    jest.spyOn(Services, 'login').mockImplementationOnce(failAfterTick);
    renderWithStore(<Login />, { auth: { accessToken: '', refreshToken: '' } });
    fireEvent.change(screen.getByPlaceholderText('Email...'), {
      target: { value: 'me@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'Secret#123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    await expectReleasedAfterFailure('Sign In');
  });
});

describe('loading spinner on the register page', () => {
  it('shows the spinner while creating the account, then releases after a failure', async () => {
    jest.spyOn(Services, 'register').mockImplementationOnce(failAfterTick);
    renderWithStore(<Register />, { auth: loggedIn });
    fireEvent.change(screen.getByPlaceholderText('Email...'), {
      target: { value: 'me@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password...'), {
      target: { value: 'Secret#123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Repeat Password...'), {
      target: { value: 'Secret#123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await expectBusyWhileSaving('Create');
    await expectReleasedAfterFailure('Create');
  });
});

describe('loading spinner on the create project page', () => {
  it('shows the spinner while saving, then releases after a failure', async () => {
    jest.spyOn(Services, 'createProject').mockImplementationOnce(failAfterTick);
    const { container } = renderWithStore(<Project />, { auth: loggedIn });
    fireEvent.change(screen.getByRole('textbox', { name: 'Project Name' }), {
      target: { value: 'Kasir Warung' },
    });
    const file = new File(['x'], 'shot.jpg', { type: 'image/jpeg' });
    fireEvent.change(container.querySelector('#img') as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await expectBusyWhileSaving('Save');
    await expectReleasedAfterFailure('Save');
  });
});

describe('loading spinner on the edit project page', () => {
  it('shows the spinner while saving, then releases after a failure', async () => {
    jest
      .spyOn(Services, 'getDetailProject')
      .mockResolvedValue({ data: { results: project } } as never);
    jest.spyOn(Services, 'updateProject').mockImplementationOnce(failAfterTick);
    renderWithStore(<ProjectEdit />, {
      auth: loggedIn,
      projects: projectsState({ project }),
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Project Name' }), {
      target: { value: 'New title' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await expectBusyWhileSaving('Save');
    await expectReleasedAfterFailure('Save');
  });
});
