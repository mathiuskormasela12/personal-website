import { screen } from '@testing-library/react';
import { Footer } from '../../components';
import { renderWithStore } from '../test-utils';

afterEach(() => jest.restoreAllMocks());

it('shows the current year instead of a hard-coded one', () => {
  jest.spyOn(Date, 'now').mockReturnValue(new Date(2030, 6, 1).getTime());
  renderWithStore(<Footer />);
  expect(screen.getByText('© Mathius 2030')).toBeInTheDocument();
  expect(screen.getByText('in Jakarta 2030')).toBeInTheDocument();
  expect(screen.queryByText(/2022/)).not.toBeInTheDocument();
});
