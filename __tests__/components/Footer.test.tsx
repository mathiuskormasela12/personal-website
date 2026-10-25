import { screen, waitFor } from '@testing-library/react';
import { Footer } from '../../components';
import Services from '../../services';
import { setCachedProfile } from '../../hooks/useProfile';
import { PROFILE_DEFAULTS } from '../../constants';
import { renderWithStore } from '../test-utils';

jest.mock('../../services', () => ({
  __esModule: true,
  default: { getProfile: jest.fn() },
}));

beforeEach(() => {
  setCachedProfile(null);
  (Services.getProfile as jest.Mock).mockRejectedValue(new Error('offline'));
});

afterEach(() => jest.restoreAllMocks());

it('shows the current year instead of a hard-coded one', () => {
  jest.spyOn(Date, 'now').mockReturnValue(new Date(2030, 6, 1).getTime());
  renderWithStore(<Footer />);
  expect(screen.getByText('© Mathius 2030')).toBeInTheDocument();
  expect(screen.queryByText(/2022/)).not.toBeInTheDocument();
});

it('shows the brand and the fixed tagline', () => {
  renderWithStore(<Footer />);
  expect(screen.getByText('Mathius')).toBeInTheDocument();
  expect(
    screen.getByText("Let's write our future with code."),
  ).toBeInTheDocument();
  expect(screen.getByText('Created with love in Jakarta')).toBeInTheDocument();
});

it('has quick links to the home page sections', () => {
  renderWithStore(<Footer />);
  [
    ['Home', '/'],
    ['Projects', '/#projects'],
    ['Skills', '/#skills'],
  ].forEach(([name, href]) =>
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href),
  );
});

it('makes the email and phone number tappable', () => {
  renderWithStore(<Footer />);
  expect(
    screen.getByRole('link', { name: 'mathiuskormasela12@gmail.com' }),
  ).toHaveAttribute('href', 'mailto:mathiuskormasela12@gmail.com');
  expect(
    screen.getByRole('link', { name: '+62 811 1906 204' }),
  ).toHaveAttribute('href', 'tel:+628111906204');
});

it('shows the default social links until the profile loads', () => {
  renderWithStore(<Footer />);
  expect(screen.getByRole('link', { name: 'Twitter' })).toHaveAttribute(
    'href',
    'https://twitter.com/Mathius87248424',
  );
});

it('uses the social links from the profile', async () => {
  (Services.getProfile as jest.Mock).mockResolvedValue({
    data: {
      results: {
        skills: ['React'],
        skillsDescription: 'Hi',
        facebookUrl: '',
        twitterUrl: '',
        youtubeUrl: 'https://www.youtube.com/@mathius',
      },
    },
  });
  renderWithStore(<Footer />);
  await waitFor(() =>
    expect(
      screen.queryByRole('link', { name: 'Twitter' }),
    ).not.toBeInTheDocument(),
  );
  expect(screen.getByRole('link', { name: 'Youtube' })).toHaveAttribute(
    'href',
    'https://www.youtube.com/@mathius',
  );
});

it('uses the name, email and phone from the profile', async () => {
  jest.spyOn(Date, 'now').mockReturnValue(new Date(2030, 6, 1).getTime());
  (Services.getProfile as jest.Mock).mockResolvedValue({
    data: {
      results: {
        ...PROFILE_DEFAULTS,
        name: 'Mathius K',
        email: 'me@example.com',
        phone: '+819012345678',
      },
    },
  });
  renderWithStore(<Footer />);
  await waitFor(() =>
    expect(screen.getByText('© Mathius K 2030')).toBeInTheDocument(),
  );
  expect(screen.getByText('Mathius K')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'me@example.com' })).toHaveAttribute(
    'href',
    'mailto:me@example.com',
  );
  expect(
    screen.getByRole('link', { name: '+81 90 1234 5678' }),
  ).toHaveAttribute('href', 'tel:+819012345678');
});

it('hides the email and phone when they are empty', async () => {
  (Services.getProfile as jest.Mock).mockResolvedValue({
    data: { results: { ...PROFILE_DEFAULTS, email: '', phone: '' } },
  });
  renderWithStore(<Footer />);
  await waitFor(() =>
    expect(screen.queryByRole('link', { name: /@/ })).not.toBeInTheDocument(),
  );
  expect(screen.queryByRole('link', { name: /811/ })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Youtube' })).toBeInTheDocument();
});

it('shows its lists without bullet points', () => {
  renderWithStore(<Footer />);
  screen
    .getAllByRole('list')
    .forEach((list) => expect(list).toHaveStyle({ listStyle: 'none' }));
});
