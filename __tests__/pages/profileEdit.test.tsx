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
  name: 'Mathius K',
  email: 'me@example.com',
  phone: '+819012345678',
};

const renderPage = (auth = loggedIn) =>
  renderWithStore(<ProfileEdit />, { auth });

const waitForForm = () => screen.findByLabelText('Description');
const saveButton = () => screen.getByRole('button', { name: 'Save' });
const preview = () => screen.getByRole('region', { name: 'Preview' });
const nameField = () => screen.getByLabelText('Name', { selector: 'input' });
const emailField = () => screen.getByLabelText('Email', { selector: 'input' });
const phoneField = () => screen.getByLabelText('Phone', { selector: 'input' });

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

it('starts with an About you group for the name, email and phone', async () => {
  renderPage();
  const form = (await waitForForm()).closest('form') as HTMLElement;
  expect(
    within(form)
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent),
  ).toEqual(['About you', 'Skills section', 'Footer social links']);
  expect(nameField()).toHaveValue('Mathius K');
  expect(emailField()).toHaveValue('me@example.com');
  expect(emailField()).toHaveAttribute('type', 'email');
  expect(phoneField()).toHaveValue('90 1234 5678');
  expect(
    screen.getByRole('button', { name: 'Country: Japan +81' }),
  ).toBeInTheDocument();
  expect(
    nameField().compareDocumentPosition(screen.getByLabelText('Description')) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});

it('shows the name, email and phone live in the preview', async () => {
  jest.spyOn(Date, 'now').mockReturnValue(new Date(2030, 6, 1).getTime());
  renderPage();
  await waitForForm();
  expect(within(preview()).getAllByText('Mathius K').length).toBeGreaterThan(0);
  expect(
    within(preview()).getByRole('link', { name: '+81 90 1234 5678' }),
  ).toHaveAttribute('href', 'tel:+819012345678');

  await userEvent.clear(nameField());
  await userEvent.type(nameField(), 'Kotori');
  await userEvent.clear(emailField());
  await userEvent.type(emailField(), 'kotori@example.com');
  await userEvent.clear(phoneField());

  expect(within(preview()).getAllByText('Kotori')).toHaveLength(2);
  expect(within(preview()).getByText('© Kotori 2030')).toBeInTheDocument();
  expect(
    within(preview()).getByRole('link', { name: 'kotori@example.com' }),
  ).toHaveAttribute('href', 'mailto:kotori@example.com');
  expect(
    within(preview()).queryByRole('link', { name: /^\+/ }),
  ).not.toBeInTheDocument();
  jest.restoreAllMocks();
});

it.each([
  [
    'the name is empty',
    () => userEvent.clear(nameField()),
    "Your name can't be empty",
  ],
  [
    'the email is wrong',
    () => userEvent.type(emailField(), '@'),
    "The email doesn't look right",
  ],
  [
    'the phone is too short',
    async () => {
      await userEvent.clear(phoneField());
      await userEvent.type(phoneField(), '90 12');
    },
    "The phone number doesn't look right",
  ],
])('blocks saving when %s', async (_, change, message) => {
  renderPage();
  await waitForForm();
  await change();
  expect(screen.getByText(message)).toBeInTheDocument();
  expect(saveButton()).toBeDisabled();
});

it('saves the name, email and phone with the rest of the profile', async () => {
  (Services.updateProfile as jest.Mock).mockResolvedValue({
    data: { message: 'ok', results: saved },
  });
  renderPage();
  await waitForForm();
  await userEvent.clear(nameField());
  await userEvent.type(nameField(), '  Kotori ');
  await userEvent.clear(emailField());
  await userEvent.clear(phoneField());
  await userEvent.type(phoneField(), '0811 1906 204');
  await userEvent.click(screen.getByRole('button', { name: /^Country:/ }));
  await userEvent.type(screen.getByRole('searchbox'), 'indonesia');
  await userEvent.click(screen.getByRole('option', { name: 'Indonesia +62' }));
  await userEvent.click(saveButton());
  expect(Services.updateProfile).toHaveBeenCalledWith({
    ...saved,
    name: 'Kotori',
    email: '',
    phone: '+628111906204',
  });
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
