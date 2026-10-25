import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../../components';
import { renderWithStore } from '../test-utils';

const description = `${'x'.repeat(120)} end`;

const renderCard = (onClick = jest.fn()) =>
  renderWithStore(
    <Card
      title="My Project"
      description={description}
      img="/images/wkw.jpg"
      technologies={[
        { id: 1, name: 'react', variant: 'primary' },
        { id: 2, name: 'nest js', variant: 'quaternary' },
      ]}
      onClick={onClick}
    />,
  );

it('shows the image, the title and the technologies', () => {
  renderCard();
  expect(screen.getByAltText('My Project')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'My Project' }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole('listitem').map((item) => item.textContent),
  ).toEqual(['react', 'nest js']);
});

it('opens the project when the card is clicked', async () => {
  const onClick = jest.fn();
  renderCard(onClick);
  await userEvent.click(screen.getByText('My Project'));
  expect(onClick).toHaveBeenCalled();
});

it('gives every technology the same calm tag, whatever its variant', () => {
  renderCard();
  const [react, nest] = screen.getAllByRole('listitem');
  expect(react.className).toBe(nest.className);
  expect(react).toHaveStyle({ color: 'var(--color-light)' });
  expect(screen.getByRole('list')).toHaveStyle({ listStyle: 'none' });
});

it('keeps the whole description and cuts it to two lines with CSS', () => {
  renderCard();
  const text = screen.getByText(description);
  expect(text).toHaveStyle({ WebkitLineClamp: '2', overflow: 'hidden' });
});

it('draws a thin bordered surface that follows the theme', () => {
  const { container } = renderCard();
  expect(container.firstChild).toHaveStyle({
    backgroundColor: 'var(--color-surface)',
    borderTopColor: 'var(--color-line)',
  });
});

it('shows an arrow that screen readers skip', () => {
  const { container } = renderCard();
  const arrow = container.querySelector('[data-arrow]');
  expect(arrow).toHaveAttribute('aria-hidden', 'true');
  expect(arrow?.querySelector('svg')).not.toBeNull();
});
