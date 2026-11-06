import { renderWithStore } from '../test-utils';
import { Spinner } from '../../components/spinner/Spinner';

it('is a decorative ring that screen readers skip', () => {
  const { container } = renderWithStore(<Spinner />);
  expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
});
