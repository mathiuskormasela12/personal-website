import { act, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import ProjectEdit from '../../pages/project-edit/[:id]';
import { emptyProject, projectsState, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

const project = {
  ...emptyProject,
  id: 3,
  title: 'Old title',
  description: 'Old description',
  img: '/images/wkw.jpg',
  technologies: [
    { id: 1, name: 'react', variant: 'primary' as const },
    { id: 2, name: 'jest', variant: 'secondary' as const },
  ],
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(), pathname: '/project-edit/[:id]', query: {}, isReady: false,
  });
});

it('fills the form from the project and follows later project updates', async () => {
  const { store } = renderWithStore(<ProjectEdit />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
    projects: projectsState({ project }),
  });

  expect(screen.getByDisplayValue('Old title')).toBeInTheDocument();
  expect(screen.getByDisplayValue('react, jest')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Old description')).toBeInTheDocument();

  act(() => {
    store.dispatch({
      type: 'SET_PROJECT',
      payload: { data: { project: { ...project, title: 'New title', technologies: [] } } },
    });
  });

  expect(await screen.findByDisplayValue('New title')).toBeInTheDocument();
  expect(screen.queryByDisplayValue('react, jest')).not.toBeInTheDocument();
});
