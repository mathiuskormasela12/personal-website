import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { Pagination } from '../../components';
import { projectsState, renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
const push = jest.fn();
beforeEach(() => {
  push.mockClear();
  (useRouter as jest.Mock).mockReturnValue({ push, pathname: '/', query: {} });
});

it('renders one item per page and navigates shallowly', async () => {
  renderWithStore(<Pagination totalPages={3} page={1} />, {
    projects: projectsState({ nextPage: 2, previousPage: 0 }),
  });
  ['1', '2', '3'].forEach((n) =>
    expect(screen.getByText(n)).toBeInTheDocument(),
  );
  await userEvent.click(screen.getByText('2'));
  expect(push).toHaveBeenCalledWith('/?page=2', undefined, { shallow: true });
});

it('ignores previous on the first page and goes to the next page', async () => {
  renderWithStore(<Pagination totalPages={3} page={1} />, {
    projects: projectsState({ nextPage: 2, previousPage: 0 }),
  });
  await userEvent.click(screen.getByLabelText('Previous page'));
  expect(push).not.toHaveBeenCalled();
  await userEvent.click(screen.getByLabelText('Next page'));
  expect(push).toHaveBeenCalledWith('/?page=2', undefined, { shallow: true });
});

it('goes back from a later page', async () => {
  renderWithStore(<Pagination totalPages={3} page={3} />, {
    projects: projectsState({ nextPage: 0, previousPage: 2 }),
  });
  await userEvent.click(screen.getByLabelText('Next page'));
  expect(push).not.toHaveBeenCalled();
  await userEvent.click(screen.getByLabelText('Previous page'));
  expect(push).toHaveBeenCalledWith('/?page=2', undefined, { shallow: true });
});

it('defaults to page 1 without the removed defaultProps', async () => {
  renderWithStore(<Pagination totalPages={2} />, {
    projects: projectsState({ nextPage: 2 }),
  });
  await userEvent.click(screen.getByLabelText('Next page'));
  expect(push).toHaveBeenCalledWith('/?page=2', undefined, { shallow: true });
});
