import { screen, within } from '@testing-library/react';
import { useRouter } from 'next/router';
import Detail from '../../pages/detail/[:id]';
import Services from '../../services';
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
    query: { ':id': '4' },
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

it('shows the whole project picture inside the frame, without cropping', () => {
  renderDetail();
  expect(screen.getByAltText('Kasir Warung')).toHaveStyle({
    objectFit: 'contain',
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

it('shows the technology tags above the description', () => {
  renderWithStore(<Detail />, {
    projects: projectsState({
      project: {
        ...project,
        technologies: [
          { id: 1, name: 'MySQL', variant: 'primary' },
          { id: 2, name: 'Next Js', variant: 'secondary' },
        ],
      },
    }),
  });
  const list = screen.getByText('MySQL').closest('ul') as HTMLElement;
  expect(
    within(list)
      .getAllByRole('listitem')
      .map((tag) => tag.textContent),
  ).toEqual(['MySQL', 'Next Js']);
  expect(
    list.compareDocumentPosition(screen.getByText(project.description)) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
});

describe('detail loading states', () => {
  it('shows the project skeleton while the project is not loaded yet', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/detail/[:id]',
      query: { ':id': '4' },
      isReady: false,
    });
    renderWithStore(<Detail />, {
      projects: projectsState({ project: { ...emptyProject } }),
    });
    expect(
      screen.getByRole('status', { name: 'Loading project' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('shows the project and no skeleton once it is loaded', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/detail/[:id]',
      query: { ':id': '4' },
      isReady: false,
    });
    renderDetail();
    expect(
      screen.queryByRole('status', { name: 'Loading project' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Kasir Warung' }),
    ).toBeInTheDocument();
  });

  it('shows a short message when the project cannot be loaded', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/detail/[:id]',
      query: { ':id': '99' },
      isReady: true,
    });
    jest
      .spyOn(Services, 'getDetailProject')
      .mockRejectedValueOnce(new Error('not found'));
    renderWithStore(<Detail />, {
      projects: projectsState({ project: { ...emptyProject } }),
    });
    expect(await screen.findByText('Project not found')).toBeInTheDocument();
    expect(
      screen.queryByRole('status', { name: 'Loading project' }),
    ).not.toBeInTheDocument();
  });
});
