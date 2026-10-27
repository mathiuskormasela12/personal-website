import { fireEvent, screen, within } from '@testing-library/react';
import { useRouter } from 'next/router';
import Project from '../../pages/project';
import { getMediaRuleStyle, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
    pathname: '/project',
    query: {},
    isReady: true,
  });
});

it('shows a preview that follows the form while typing', () => {
  renderWithStore(<Project />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
  });
  fireEvent.change(screen.getByRole('textbox', { name: 'Project Name' }), {
    target: { value: 'Kasir Warung' },
  });
  fireEvent.change(document.getElementById('technology') as HTMLElement, {
    target: { value: 'MySQL, Next Js' },
  });
  fireEvent.change(
    screen.getByRole('textbox', { name: 'Project Description' }),
    { target: { value: 'A point of sale app.' } },
  );

  const preview = screen.getByRole('region', { name: 'Preview' });
  expect(
    within(preview).getByRole('heading', { level: 2, name: 'Kasir Warung' }),
  ).toBeInTheDocument();
  expect(within(preview).getByText('A point of sale app.')).toBeInTheDocument();
  expect(
    within(preview)
      .getAllByRole('listitem')
      .map((tag) => tag.textContent),
  ).toEqual(['MySQL', 'Next Js']);
});

it('does not show the illustration, so the form and preview have room on desktop', () => {
  renderWithStore(<Project />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
  });
  expect(screen.queryByAltText('Create Project')).not.toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: 'Project Name' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('region', { name: 'Preview' })).toBeInTheDocument();
});

describe('space between the form and the preview', () => {
  it('leaves a gap on desktop and a smaller gap on phones', () => {
    renderWithStore(<Project />, {
      auth: { accessToken: 'a', refreshToken: 'r' },
    });
    const row = screen.getByRole('region', { name: 'Preview' }).parentElement
      ?.parentElement as Element;
    expect(
      getMediaRuleStyle(row, '(min-width: 1201px)')?.getPropertyValue('gap'),
    ).toBe('3rem');
    expect(
      getMediaRuleStyle(row, '(max-width: 1200px)')?.getPropertyValue('gap'),
    ).toBe('2.5rem');
  });
});
