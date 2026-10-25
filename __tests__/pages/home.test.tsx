import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Services from '../../services';
import Home, { getServerSideProps } from '../../pages/index';
import { getHeroServerSideProps } from '../../helpers';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('../../services', () => ({
  __esModule: true,
  default: { getAllProjects: jest.fn() },
}));

const hero = {
  titlePrefix: 'Hello,',
  titleHighlight: 'a Mobile Developer',
  titleSuffix: '!',
  subtitle: 'I build apps for iOS and Android.',
  buttonText: 'My GitHub',
  buttonUrl: 'https://github.com/mathius',
};

const push = jest.fn();

beforeEach(() => {
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
  renderWithStore(<Home hero={hero} />);
  expect(await screen.findByText('Portfolio API')).toBeInTheDocument();
  expect(Services.getAllProjects).toHaveBeenCalledWith({ page: 2, limit: 6 });
});

it('shows the hero texts from its props', async () => {
  renderWithStore(<Home hero={hero} />);
  expect(screen.getAllByRole('heading', { level: 1 })[0]).toHaveTextContent(
    /^Hello, a Mobile Developer!$/,
  );
  expect(screen.getByText('a Mobile Developer')).toBeInTheDocument();
  expect(
    screen.getByText('I build apps for iOS and Android.'),
  ).toBeInTheDocument();
  expect(screen.queryByText(/Fullstack Developer/)).not.toBeInTheDocument();
  await screen.findByText('Portfolio API');
});

it('opens the hero button link', async () => {
  renderWithStore(<Home hero={hero} />);
  await userEvent.click(screen.getByRole('button', { name: 'My GitHub' }));
  expect(push).toHaveBeenCalledWith('https://github.com/mathius');
  await screen.findByText('Portfolio API');
});

it('loads the hero texts on the server', () => {
  expect(getServerSideProps).toBe(getHeroServerSideProps);
});
