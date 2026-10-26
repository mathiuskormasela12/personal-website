import { screen } from '@testing-library/react';
import { Placeholder } from '../../components';
import { emptyProject, projectsState, renderWithStore } from '../test-utils';

const child = <p>content</p>;
const project = { ...emptyProject, id: 1, title: 'P' };

it('shows the loading state', () => {
  renderWithStore(<Placeholder>{child}</Placeholder>, {
    projects: projectsState({ loading: true }),
  });
  expect(screen.getByText('Please Wait...')).toBeInTheDocument();
});
it('shows the empty state when there are no projects', () => {
  renderWithStore(<Placeholder>{child}</Placeholder>);
  expect(screen.getByAltText('Empty')).toBeInTheDocument();
});
it('keeps the state image inside narrow screens without stretching it', () => {
  renderWithStore(<Placeholder>{child}</Placeholder>);
  expect(screen.getByAltText('Empty')).toHaveStyle({
    maxWidth: '100%',
    height: 'auto',
  });
});
it('renders children when projects exist', () => {
  renderWithStore(<Placeholder>{child}</Placeholder>, {
    projects: projectsState({ projects: [project] }),
  });
  expect(screen.getByText('content')).toBeInTheDocument();
});
it('shows the empty state in detail mode without a project', () => {
  renderWithStore(<Placeholder isProject>{child}</Placeholder>, {
    projects: projectsState({ projects: [project] }),
  });
  expect(screen.getByAltText('Empty')).toBeInTheDocument();
});
it('uses the single project in detail mode', () => {
  renderWithStore(<Placeholder isProject>{child}</Placeholder>, {
    projects: projectsState({ project }),
  });
  expect(screen.getByText('content')).toBeInTheDocument();
});

it('spans the whole row of the project grid so the empty image is centered', () => {
  renderWithStore(<Placeholder>{child}</Placeholder>);
  expect(screen.getByAltText('Empty').parentElement).toHaveStyle({
    gridColumn: '1/-1',
  });
});

it('spans the whole row of the project grid while loading', () => {
  renderWithStore(<Placeholder>{child}</Placeholder>, {
    projects: projectsState({ loading: true }),
  });
  expect(screen.getByAltText('Loading').parentElement).toHaveStyle({
    gridColumn: '1/-1',
  });
});
