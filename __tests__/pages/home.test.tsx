import { screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Services from '../../services';
import Home from '../../pages/index';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('../../services', () => ({
  __esModule: true,
  default: { getAllProjects: jest.fn() },
}));

it('loads the requested page and renders project cards', async () => {
  (useRouter as jest.Mock).mockReturnValue({
    push: jest.fn(),
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
  renderWithStore(<Home />);
  expect(await screen.findByText('Portfolio API')).toBeInTheDocument();
  expect(Services.getAllProjects).toHaveBeenCalledWith({ page: 2, limit: 6 });
});
