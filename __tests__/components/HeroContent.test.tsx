import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { HeroContent } from '../../components';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

const hero = {
  titlePrefix: 'Hello,',
  titleHighlight: 'a Mobile Developer',
  titleSuffix: '!',
  subtitle: 'I build apps for iOS and Android.',
  buttonText: 'My GitHub',
  buttonUrl: 'https://github.com/mathius',
};

const push = jest.fn();

beforeEach(() => {
  push.mockClear();
  (useRouter as jest.Mock).mockReturnValue({ push, pathname: '/', query: {} });
});

it('shows the title as the page heading with the highlight', () => {
  renderWithStore(<HeroContent hero={hero} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /^Hello, a Mobile Developer!$/,
  );
  expect(screen.getByText('a Mobile Developer').tagName).toBe('SPAN');
});

it('shows the subtitle', () => {
  renderWithStore(<HeroContent hero={hero} />);
  expect(
    screen.getByText('I build apps for iOS and Android.'),
  ).toBeInTheDocument();
});

it('opens the button link', async () => {
  renderWithStore(<HeroContent hero={hero} />);
  await userEvent.click(screen.getByRole('button', { name: 'My GitHub' }));
  expect(push).toHaveBeenCalledWith('https://github.com/mathius');
  expect(
    screen.queryByText('https://github.com/mathius'),
  ).not.toBeInTheDocument();
});

describe('preview mode', () => {
  it('uses a second-level heading so the page keeps one h1', () => {
    renderWithStore(<HeroContent hero={hero} preview />);
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Hello, a Mobile Developer!$/,
    );
  });

  it('disables the button and shows its link instead', async () => {
    renderWithStore(<HeroContent hero={hero} preview />);
    const button = screen.getByRole('button', { name: 'My GitHub' });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByText('https://github.com/mathius')).toBeInTheDocument();
  });

  it('keeps long links inside narrow screens', () => {
    renderWithStore(<HeroContent hero={hero} preview />);
    expect(screen.getByText('https://github.com/mathius')).toHaveStyle({
      overflowWrap: 'anywhere',
    });
  });
});
