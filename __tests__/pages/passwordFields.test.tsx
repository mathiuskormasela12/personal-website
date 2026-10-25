import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Forgot from '../../pages/forgot';
import Login from '../../pages/login';
import Register from '../../pages/register';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

const loggedIn = { accessToken: 'a', refreshToken: 'r' };
const loggedOut = { accessToken: '', refreshToken: '' };

const cases: {
  page: string;
  Component: NextPage;
  query: Record<string, string>;
  auth: typeof loggedIn;
  placeholders: string[];
}[] = [
  {
    page: 'login',
    Component: Login,
    query: {},
    auth: loggedOut,
    placeholders: ['Password...'],
  },
  {
    page: 'register',
    Component: Register,
    query: {},
    auth: loggedIn,
    placeholders: ['Password...', 'Repeat Password...'],
  },
  {
    page: 'forgot (reset step)',
    Component: Forgot,
    query: { token: 'reset-token' },
    auth: loggedOut,
    placeholders: ['Type your new password...', 'Repeat your new password...'],
  },
];

describe.each(cases)(
  '$page page',
  ({ Component, query, auth, placeholders }) => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        push: jest.fn(),
        pathname: '/',
        query,
      });
    });

    it('adds a show/hide toggle to every password input', () => {
      renderWithStore(<Component />, { auth });
      expect(
        screen.getAllByRole('button', { name: 'Show password' }),
      ).toHaveLength(placeholders.length);
    });

    it.each(placeholders)(
      'reveals "%s" when its toggle is clicked',
      async (placeholder) => {
        renderWithStore(<Component />, { auth });
        const input = screen.getByPlaceholderText(placeholder);
        const toggle = screen
          .getAllByRole('button', { name: 'Show password' })
          .find((button) => button.getAttribute('aria-controls') === input.id);

        expect(input).toHaveAttribute('type', 'password');
        await userEvent.click(toggle as HTMLElement);
        expect(input).toHaveAttribute('type', 'text');
      },
    );
  },
);
