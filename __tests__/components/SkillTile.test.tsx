import { screen } from '@testing-library/react';
import { SkillTile } from '../../components';
import { renderWithStore } from '../test-utils';

const renderTile = (name: string) =>
  renderWithStore(
    <ul>
      <SkillTile name={name} />
    </ul>,
  );

it('shows the logo of a known skill with its name', () => {
  const { container } = renderTile('React');
  expect(screen.getByRole('listitem')).toHaveTextContent(/^React$/);
  expect(container.querySelector('svg')).toBeInTheDocument();
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
});

it('shows two letters for a skill without a known logo', () => {
  const { container } = renderTile('GraphQLx');
  expect(container.querySelector('svg')).not.toBeInTheDocument();
  expect(screen.getByText('Gr')).toHaveAttribute('aria-hidden', 'true');
  expect(screen.getByText('GraphQLx')).toBeInTheDocument();
});

it('draws a wide wordmark logo bigger than a square one', () => {
  const { container, unmount } = renderTile('React');
  const square = container.querySelector('svg')?.getAttribute('height');
  unmount();
  const wide = renderTile('MySQL').container.querySelector('svg');
  expect(square).toBe('45%');
  expect(wide).toHaveAttribute('height', '63%');
});
