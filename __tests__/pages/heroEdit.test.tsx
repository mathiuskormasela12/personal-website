import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Services from '../../services';
import HeroEdit, { getServerSideProps } from '../../pages/hero-edit';
import { HERO_DEFAULTS } from '../../constants';
import { getHeroServerSideProps } from '../../helpers';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}));
jest.mock('../../services', () => ({
  __esModule: true,
  default: { updateHero: jest.fn() },
}));

const loggedIn = { accessToken: 'a', refreshToken: 'r' };
const push = jest.fn();

const fields = {
  Greeting: HERO_DEFAULTS.titlePrefix,
  'Highlighted Text': HERO_DEFAULTS.titleHighlight,
  Ending: HERO_DEFAULTS.titleSuffix,
  Subtitle: HERO_DEFAULTS.subtitle,
  'Button Text': HERO_DEFAULTS.buttonText,
  'Button Link': HERO_DEFAULTS.buttonUrl,
};

const renderPage = (auth = loggedIn) =>
  renderWithStore(<HeroEdit hero={HERO_DEFAULTS} />, { auth });

const saveButton = () => screen.getByRole('button', { name: 'Save' });

const replaceText = async (label: string, value: string) => {
  const field = screen.getByLabelText(label);
  await userEvent.clear(field);
  if (value) {
    await userEvent.type(field, value);
  }
};

beforeEach(() => {
  push.mockClear();
  (Swal.fire as jest.Mock).mockReset();
  (Services.updateHero as jest.Mock).mockReset();
  (useRouter as jest.Mock).mockReturnValue({
    push,
    pathname: '/hero-edit',
    query: {},
  });
});

it('loads the hero texts on the server', () => {
  expect(getServerSideProps).toBe(getHeroServerSideProps);
});

it('sends visitors who are not logged in to the login page', async () => {
  renderPage({ accessToken: '', refreshToken: '' });
  await waitFor(() => expect(push).toHaveBeenCalledWith('/login'));
});

it('does not redirect a logged-in owner', () => {
  renderPage();
  expect(push).not.toHaveBeenCalled();
});

it('fills every field with the current hero texts', () => {
  renderPage();
  Object.entries(fields).forEach(([label, value]) =>
    expect(screen.getByLabelText(label)).toHaveValue(value),
  );
  expect(screen.getByLabelText('Subtitle').tagName).toBe('TEXTAREA');
  expect(saveButton()).toBeEnabled();
});

it('shows the validation message and blocks saving while a field is invalid', async () => {
  renderPage();
  await replaceText('Greeting', '');
  expect(screen.getByText("The greeting can't be empty")).toBeInTheDocument();
  expect(saveButton()).toBeDisabled();

  await replaceText('Greeting', 'Hello,');
  expect(
    screen.queryByText("The greeting can't be empty"),
  ).not.toBeInTheDocument();
  expect(saveButton()).toBeEnabled();
});

it('shows the validation message for the subtitle textarea', async () => {
  renderPage();
  await replaceText('Subtitle', '');
  expect(screen.getByText("The subtitle can't be empty")).toBeInTheDocument();
});

it('saves the edited texts and goes back home after the success alert', async () => {
  (Services.updateHero as jest.Mock).mockResolvedValue({
    data: { message: 'The hero texts have been updated' },
  });
  renderPage();
  await replaceText('Highlighted Text', 'a Mobile Developer');
  await replaceText('Button Link', 'https://github.com/mathius');
  await userEvent.click(saveButton());

  expect(Services.updateHero).toHaveBeenCalledWith({
    ...HERO_DEFAULTS,
    titleHighlight: 'a Mobile Developer',
    buttonUrl: 'https://github.com/mathius',
  });
  await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
  const alert = (Swal.fire as jest.Mock).mock.calls[0][0];
  expect(alert).toMatchObject({
    title: 'Success',
    icon: 'success',
    text: 'The hero texts have been updated',
  });

  expect(push).not.toHaveBeenCalled();
  alert.didClose();
  expect(push).toHaveBeenCalledWith('/');
});

it('shows the API error and lets the owner try again', async () => {
  (Services.updateHero as jest.Mock).mockRejectedValue({
    message: 'The button link should be a http(s) URL',
  });
  renderPage();
  await userEvent.click(saveButton());

  await waitFor(() =>
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Failed',
      icon: 'error',
      text: 'The button link should be a http(s) URL',
    }),
  );
  expect(saveButton()).toBeEnabled();
  expect(push).not.toHaveBeenCalled();
});

it('shows a generic message when the error has none', async () => {
  (Services.updateHero as jest.Mock).mockRejectedValue(undefined);
  renderPage();
  await userEvent.click(saveButton());
  await waitFor(() =>
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Failed',
      icon: 'error',
      text: 'Something went wrong',
    }),
  );
});

it('disables the button while saving', async () => {
  (Services.updateHero as jest.Mock).mockReturnValue(new Promise(() => {}));
  renderPage();
  await userEvent.click(saveButton());
  expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();
});
