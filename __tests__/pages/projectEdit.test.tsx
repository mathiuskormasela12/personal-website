import { act, fireEvent, screen, within } from '@testing-library/react';
import { useRouter } from 'next/router';
import ProjectEdit from '../../pages/project-edit/[:id]';
import {
  emptyProject,
  projectsState,
  renderWithStore,
  getMediaRuleStyle,
} from '../test-utils';

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
    push: jest.fn(),
    pathname: '/project-edit/[:id]',
    query: {},
    isReady: false,
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
      payload: {
        data: { project: { ...project, title: 'New title', technologies: [] } },
      },
    });
  });

  expect(await screen.findByDisplayValue('New title')).toBeInTheDocument();
  expect(screen.queryByDisplayValue('react, jest')).not.toBeInTheDocument();
});

describe('project preview', () => {
  const renderEdit = () =>
    renderWithStore(<ProjectEdit />, {
      auth: { accessToken: 'a', refreshToken: 'r' },
      projects: projectsState({ project }),
    });

  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:new-picture');
    URL.revokeObjectURL = jest.fn();
  });

  it('shows the saved project in the preview', () => {
    renderEdit();
    const preview = screen.getByRole('region', { name: 'Preview' });
    expect(
      within(preview).getByRole('heading', { level: 2, name: 'Old title' }),
    ).toBeInTheDocument();
    expect(within(preview).getByText('Old description')).toBeInTheDocument();
    expect(
      within(preview)
        .getAllByRole('listitem')
        .map((tag) => tag.textContent),
    ).toEqual(['react', 'jest']);
  });

  it('follows the form while typing', () => {
    renderEdit();
    fireEvent.change(screen.getByRole('textbox', { name: 'Project Name' }), {
      target: { value: 'New title' },
    });
    fireEvent.change(document.getElementById('technology') as HTMLElement, {
      target: { value: 'react, css' },
    });
    const preview = screen.getByRole('region', { name: 'Preview' });
    expect(
      within(preview).getByRole('heading', { name: 'New title' }),
    ).toBeInTheDocument();
    expect(
      within(preview)
        .getAllByRole('listitem')
        .map((tag) => tag.textContent),
    ).toEqual(['react', 'css']);
  });

  it('shows a newly picked picture in the preview', () => {
    const { container } = renderEdit();
    const file = new File(['x'], 'new.jpg', { type: 'image/jpeg' });
    fireEvent.change(container.querySelector('#img') as HTMLInputElement, {
      target: { files: [file] },
    });
    const preview = screen.getByRole('region', { name: 'Preview' });
    expect(within(preview).getByAltText('Old title')).toHaveAttribute(
      'src',
      'blob:new-picture',
    );
  });
});

it('does not show the illustration, so the form and preview have room on desktop', () => {
  renderWithStore(<ProjectEdit />, {
    auth: { accessToken: 'a', refreshToken: 'r' },
    projects: projectsState({ project }),
  });
  expect(screen.queryByAltText('Create Project')).not.toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: 'Project Name' }),
  ).toBeInTheDocument();
  expect(screen.getByRole('region', { name: 'Preview' })).toBeInTheDocument();
});

describe('space between the form and the preview', () => {
  it('leaves a gap on desktop and a smaller gap on phones', () => {
    renderWithStore(<ProjectEdit />, {
      auth: { accessToken: 'a', refreshToken: 'r' },
      projects: projectsState({ project }),
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
