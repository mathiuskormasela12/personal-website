import { screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Detail from '../../pages/detail/[:id]';
import { emptyProject, projectsState, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

const project = {
  ...emptyProject,
  id: 4,
  title: 'Kasir Warung',
  description: 'A point of sale app for small shops.',
  img: '/images/wkw.jpg',
};

const renderDetail = () =>
  renderWithStore(<Detail />, { projects: projectsState({ project }) });

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
    pathname: '/detail/[:id]',
    query: {},
    isReady: false,
  });
});

it('shows the project title as a calm heading', () => {
  renderDetail();
  expect(
    screen.getByRole('heading', { level: 1, name: 'Kasir Warung' }),
  ).toHaveStyle({ fontWeight: 'normal', color: 'var(--color-dark)' });
});

it('shows the image with soft rounded corners and a thin border', () => {
  renderDetail();
  expect(screen.getByAltText('Kasir Warung')).toHaveStyle({
    borderRadius: '1.2rem',
    borderTopColor: 'var(--color-line)',
  });
});

it('shows the description as easy-to-read text', () => {
  renderDetail();
  expect(screen.getByText(project.description)).toHaveStyle({
    color: 'var(--color-light)',
    textAlign: 'left',
  });
});

it('keeps the text in a readable column width', () => {
  renderDetail();
  expect(screen.getByText(project.description).closest('article')).toHaveStyle({
    maxWidth: '48rem',
  });
});
