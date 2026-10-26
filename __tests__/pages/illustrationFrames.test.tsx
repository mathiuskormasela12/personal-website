import { screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Forgot from '../../pages/forgot';
import Login from '../../pages/login';
import Project from '../../pages/project';
import ProjectEdit from '../../pages/project-edit/[:id]';
import Register from '../../pages/register';
import { getMediaRuleStyle, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

const loggedIn = { accessToken: 'a', refreshToken: 'r' };
const loggedOut = { accessToken: '', refreshToken: '' };

const cases: [string, NextPage, string, typeof loggedIn][] = [
  ['login', Login, 'Create Auth', loggedOut],
  ['register', Register, 'Create Auth', loggedIn],
  ['forgot', Forgot, 'Create Forgot', loggedOut],
  ['create project', Project, 'Create Project', loggedIn],
  ['edit project', ProjectEdit, 'Create Project', loggedIn],
];

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
    pathname: '/',
    query: {},
    isReady: false,
  });
});

describe.each(cases)('%s page', (_, Page, alt, auth) => {
  it('shows the illustration inside the same soft frame as the home hero', () => {
    renderWithStore(<Page />, { auth });
    expect(screen.getByAltText(alt).parentElement).toHaveStyle({
      backgroundColor: 'var(--color-soft)',
      borderRadius: '1.5rem',
    });
  });

  it('lets the frame fill its column so the picture is not tiny', () => {
    renderWithStore(<Page />, { auth });
    expect(screen.getByAltText(alt).parentElement).toHaveStyle({
      width: '100%',
    });
  });

  it('puts the picture on soft paper in dark mode, so its dark outlines stay visible', () => {
    document.documentElement.dataset.theme = 'dark';
    renderWithStore(<Page />, { auth });
    const frame = screen.getByAltText(alt).parentElement as Element;
    expect(getComputedStyle(frame).backgroundColor).toBe(
      'color-mix(in srgb, var(--color-dark) 82%, var(--color-background))',
    );
    document.documentElement.dataset.theme = 'light';
    expect(getComputedStyle(frame).backgroundColor).toBe('var(--color-soft)');
  });

  it('keeps the title calm, without a heavy bold weight', () => {
    renderWithStore(<Page />, { auth });
    expect(screen.getByRole('heading', { level: 1 })).toHaveStyle({
      fontWeight: 'normal',
      color: 'var(--color-dark)',
    });
  });

  it('starts the content below the navbar', () => {
    renderWithStore(<Page />, { auth });
    const desktop = getMediaRuleStyle(
      screen.getByAltText(alt).closest('[data-page-body]') as Element,
      '(min-width: 1201px)',
    );
    expect(desktop?.getPropertyValue('padding-top')).toBe('4.8rem');
  });
});
