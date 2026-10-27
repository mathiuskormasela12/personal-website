import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Services from '../../services';
import * as HomePage from '../../pages/index';
import { setCachedHero } from '../../hooks/useHero';
import { setCachedProfile } from '../../hooks/useProfile';
import { getMediaRuleStyle, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('../../services', () => ({
  __esModule: true,
  default: {
    getAllProjects: jest.fn(),
    getProfile: jest.fn(),
    getHero: jest.fn(),
  },
}));

const hero = {
  titlePrefix: 'Hello,',
  titleHighlight: 'a Mobile Developer',
  titleSuffix: '!',
  subtitle: 'I build apps for iOS and Android.',
  buttonText: 'My GitHub',
  buttonUrl: 'https://github.com/mathius',
};

const Home = HomePage.default;
const push = jest.fn();

beforeEach(() => {
  setCachedProfile(null);
  setCachedHero(null);
  (Services.getHero as jest.Mock).mockReset();
  (Services.getHero as jest.Mock).mockResolvedValue({
    data: { results: hero },
  });
  (Services.getProfile as jest.Mock).mockResolvedValue({
    data: {
      results: {
        skills: ['React', 'Docker'],
        skillsDescription: 'Mostly TypeScript.',
        facebookUrl: '',
        twitterUrl: '',
        youtubeUrl: 'https://www.youtube.com/@mathius',
      },
    },
  });
  push.mockClear();
  (useRouter as jest.Mock).mockReturnValue({
    push,
    pathname: '/',
    query: { page: '2' },
  });
  (Services.getAllProjects as jest.Mock).mockResolvedValue({
    data: {
      results: [
        {
          id: 1,
          title: 'Portfolio API',
          description: 'NestJS backend',
          img: '/images/wkw.jpg',
          technologies: [{ id: 1, name: 'nestjs' }],
        },
      ],
      pageInfo: { totalPages: 2, nextLink: null, previousLink: 'p' },
    },
  });
});

it('loads the requested page and renders project cards', async () => {
  renderWithStore(<Home />);
  expect(await screen.findByText('Portfolio API')).toBeInTheDocument();
  expect(Services.getAllProjects).toHaveBeenCalledWith({ page: 2, limit: 6 });
});

it('shows the hero texts from the API', async () => {
  renderWithStore(<Home />);
  expect(
    (await screen.findAllByRole('heading', { level: 1 }))[0],
  ).toHaveTextContent(/^Hello, a Mobile Developer!$/);
  expect(screen.getByText('a Mobile Developer')).toBeInTheDocument();
  expect(
    screen.getByText('I build apps for iOS and Android.'),
  ).toBeInTheDocument();
  expect(screen.queryByText(/Fullstack Developer/)).not.toBeInTheDocument();
  await screen.findByText('Portfolio API');
});

it('shows a skeleton while the hero texts are loading on the first visit', async () => {
  (Services.getHero as jest.Mock).mockReturnValue(new Promise(() => {}));
  renderWithStore(<Home />);
  expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  expect(screen.getByAltText('Hero Image')).toBeInTheDocument();
  await screen.findByText('Portfolio API');
});

it('shows the hero at once on the next visit, without waiting', async () => {
  setCachedHero(hero);
  renderWithStore(<Home />);
  expect(screen.getAllByRole('heading', { level: 1 })[0]).toHaveTextContent(
    /^Hello, a Mobile Developer!$/,
  );
  expect(
    screen.queryByRole('status', { name: 'Loading' }),
  ).not.toBeInTheDocument();
  expect(Services.getHero).not.toHaveBeenCalled();
  await screen.findByText('Portfolio API');
});

it('opens the hero button link', async () => {
  renderWithStore(<Home />);
  await userEvent.click(
    await screen.findByRole('button', { name: 'My GitHub' }),
  );
  expect(push).toHaveBeenCalledWith('https://github.com/mathius');
  await screen.findByText('Portfolio API');
});

it('opens without waiting for the server, so page changes are instant', () => {
  expect(HomePage).not.toHaveProperty('getServerSideProps');
});

it('shows the skills from the profile right under the hero', async () => {
  const { container } = renderWithStore(<Home />);
  const skills = await screen.findByRole('region', {
    name: 'What I build with',
  });
  expect(await screen.findByText('Mostly TypeScript.')).toBeInTheDocument();
  expect(screen.getByText('Docker')).toBeInTheDocument();
  expect(skills.closest('#skills')).not.toBeNull();

  const heroHeading = (await screen.findAllByRole('heading', { level: 1 }))[0];
  const projects = container.querySelector('#projects') as Node;
  expect(
    heroHeading.compareDocumentPosition(skills) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(
    skills.compareDocumentPosition(projects) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  await screen.findByText('Portfolio API');
});

it('drops the floating balloons and triangles', async () => {
  renderWithStore(<Home />);
  await screen.findByText('Portfolio API');
  expect(screen.queryAllByAltText('Balloon')).toHaveLength(0);
});

it('shows the hero picture inside a soft rounded frame', async () => {
  renderWithStore(<Home />);
  const frame = screen.getByAltText('Hero Image').parentElement;
  expect(frame).toHaveStyle({
    backgroundColor: 'var(--color-soft)',
    borderRadius: '1.5rem',
  });
  await screen.findByText('Portfolio API');
});

it('separates the skills and the projects with a thin line', async () => {
  const { container } = renderWithStore(<Home />);
  await screen.findByText('Portfolio API');
  ['#skills', '#projects'].forEach((id) =>
    expect(container.querySelector(id)).toHaveStyle({
      borderTopWidth: '1px',
      borderTopColor: 'var(--color-line)',
    }),
  );
});

it('lays the project cards out in a grid', async () => {
  renderWithStore(<Home />);
  const card = await screen.findByText('Portfolio API');
  const grid = card.closest('#projects')?.querySelector('[data-grid]');
  expect(grid).toHaveStyle({ display: 'grid' });
  expect(
    getMediaRuleStyle(grid as Element, '(min-width: 1201px)')
      ?.getPropertyValue('grid-template-columns')
      .replace(/\s/g, ''),
  ).toBe('repeat(3,1fr)');
});

it('keeps the hero picture on the dark frame in dark mode', async () => {
  document.documentElement.dataset.theme = 'dark';
  renderWithStore(<Home />);
  const frame = screen.getByAltText('Hero Image').parentElement as Element;
  expect(getComputedStyle(frame).backgroundColor).toBe('var(--color-soft)');
  document.documentElement.dataset.theme = 'light';
  await screen.findByText('Portfolio API');
});
