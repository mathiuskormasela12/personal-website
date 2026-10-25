import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Services from '../../services';
import ProfileEdit from '../../pages/profile-edit';
import { loadProfile, setCachedProfile } from '../../hooks/useProfile';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}));
jest.mock('../../services', () => ({
  __esModule: true,
  default: { getProfile: jest.fn(), updateProfile: jest.fn() },
}));

const loggedIn = { accessToken: 'a', refreshToken: 'r' };
const push = jest.fn();

const saved = {
  skills: ['React', 'Nest Js'],
  skillsDescription: 'Mostly TypeScript.',
  facebookUrl: 'https://www.facebook.com/mathiuskormasela/',
  twitterUrl: '',
  youtubeUrl: 'https://www.youtube.com/@mathius',
};

const renderPage = (auth = loggedIn) =>
  renderWithStore(<ProfileEdit />, { auth });

const waitForForm = () => screen.findByLabelText('Description');
const saveButton = () => screen.getByRole('button', { name: 'Save' });
const preview = () => screen.getByRole('region', { name: 'Preview' });

beforeEach(() => {
  setCachedProfile(null);
  push.mockClear();
  (Swal.fire as jest.Mock).mockReset();
  (Services.updateProfile as jest.Mock).mockReset();
  (Services.getProfile as jest.Mock).mockResolvedValue({
    data: { results: saved },
  });
  (useRouter as jest.Mock).mockReturnValue({
    push,
    pathname: '/profile-edit',
    query: {},
  });
});

it('sends visitors who are not logged in to the login page', async () => {
  renderPage({ accessToken: '', refreshToken: '' });
  await waitFor(() => expect(push).toHaveBeenCalledWith('/login'));
});

it('shows a loading message until the profile arrives', async () => {
  renderPage();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await waitForForm();
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  expect(push).not.toHaveBeenCalled();
});

it('fills the form with the saved profile', async () => {
  renderPage();
  expect(await waitForForm()).toHaveValue('Mostly TypeScript.');
  expect(screen.getByLabelText('Description').tagName).toBe('TEXTAREA');
  expect(
    screen.getByRole('button', { name: 'Remove React' }),
  ).toBeInTheDocument();
  expect(screen.getByLabelText('Facebook', { selector: 'input' })).toHaveValue(
    saved.facebookUrl,
  );
  expect(screen.getByLabelText('Twitter', { selector: 'input' })).toHaveValue(
    '',
  );
  expect(screen.getByLabelText('Youtube', { selector: 'input' })).toHaveValue(
    saved.youtubeUrl,
  );
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Edit Profile',
  );
});

it('shows a live preview of the skills section and the footer icons', async () => {
  renderPage();
  await waitForForm();
  await userEvent.type(screen.getByLabelText('Skills'), 'Docker{Enter}');
  await userEvent.clear(screen.getByLabelText('Description'));
  await userEvent.type(screen.getByLabelText('Description'), 'Hello there');

  expect(within(preview()).getByText('Docker')).toBeInTheDocument();
  expect(within(preview()).getByText('Hello there')).toBeInTheDocument();
  expect(
    within(preview()).getByRole('link', { name: 'Facebook' }),
  ).toBeInTheDocument();
  expect(
    within(preview()).queryByRole('link', { name: 'Twitter' }),
  ).not.toBeInTheDocument();
});

it('puts the preview after the form', async () => {
  renderPage();
  const form = (await waitForForm()).closest('form') as Node;
  expect(
    preview().compareDocumentPosition(form) & Node.DOCUMENT_POSITION_PRECEDING,
  ).toBeTruthy();
});

it('blocks saving while a field is invalid', async () => {
  renderPage();
  await waitForForm();
  await userEvent.type(
    screen.getByLabelText('Twitter', { selector: 'input' }),
    'twitter.com/x',
  );
  expect(
    screen.getByText('The Twitter link should be a http(s) URL'),
  ).toBeInTheDocument();
  expect(saveButton()).toBeDisabled();

  await userEvent.click(screen.getByRole('button', { name: 'Remove React' }));
  await userEvent.click(screen.getByRole('button', { name: 'Remove Nest Js' }));
  expect(screen.getByText('Add at least one skill')).toBeInTheDocument();
});

it('saves, remembers the new profile and goes home after the alert', async () => {
  (Services.updateProfile as jest.Mock).mockImplementation(async (body) => ({
    data: { message: 'The profile has been updated', results: body },
  }));
  renderPage();
  await waitForForm();
  await userEvent.type(screen.getByLabelText('Skills'), 'Docker{Enter}');
  await userEvent.click(saveButton());

  const expected = { ...saved, skills: ['React', 'Nest Js', 'Docker'] };
  expect(Services.updateProfile).toHaveBeenCalledWith(expected);
  await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
  const alert = (Swal.fire as jest.Mock).mock.calls[0][0];
  expect(alert).toMatchObject({
    title: 'Success',
    icon: 'success',
    text: 'The profile has been updated',
  });
  await expect(loadProfile()).resolves.toEqual(expected);

  expect(push).not.toHaveBeenCalled();
  alert.didClose();
  expect(push).toHaveBeenCalledWith('/');
});

it('trims the texts before saving', async () => {
  (Services.updateProfile as jest.Mock).mockResolvedValue({
    data: { message: 'ok', results: saved },
  });
  renderPage();
  await waitForForm();
  await userEvent.type(screen.getByLabelText('Description'), '   ');
  await userEvent.click(saveButton());
  expect(Services.updateProfile).toHaveBeenCalledWith(saved);
});

it('shows the API error and lets the owner try again', async () => {
  (Services.updateProfile as jest.Mock).mockRejectedValue({
    message: 'Each skill can only be added once',
  });
  renderPage();
  await waitForForm();
  await userEvent.click(saveButton());
  await waitFor(() =>
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Failed',
      icon: 'error',
      text: 'Each skill can only be added once',
    }),
  );
  expect(saveButton()).toBeEnabled();
  expect(push).not.toHaveBeenCalled();
});

it('disables the button while saving', async () => {
  (Services.updateProfile as jest.Mock).mockReturnValue(new Promise(() => {}));
  renderPage();
  await waitForForm();
  await userEvent.click(saveButton());
  expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();
});
