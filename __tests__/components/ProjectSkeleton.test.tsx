import { screen } from '@testing-library/react';
import { ProjectSkeleton } from '../../components/projectskeleton/ProjectSkeleton';
import { renderWithStore } from '../test-utils';

it('announces that the project is loading', () => {
  renderWithStore(<ProjectSkeleton />);
  expect(
    screen.getByRole('status', { name: 'Loading project' }),
  ).toBeInTheDocument();
});

it('shows placeholder bars for the title, picture, tags and description', () => {
  const { container } = renderWithStore(<ProjectSkeleton />);
  expect(
    container.querySelectorAll('[aria-hidden="true"]').length,
  ).toBeGreaterThanOrEqual(6);
});
