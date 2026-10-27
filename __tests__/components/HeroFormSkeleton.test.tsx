import { screen } from '@testing-library/react';
import { HeroFormSkeleton } from '../../components';
import { renderWithStore } from '../test-utils';

const fields = [{}, {}, { multiline: true }];

const inputBars = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[data-skeleton-input] > *'));

it('tells screen readers that the form is loading', () => {
  renderWithStore(<HeroFormSkeleton fields={fields} />);
  expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
});

it('has no inputs or buttons that could be typed into or clicked', () => {
  renderWithStore(<HeroFormSkeleton fields={fields} />);
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

it('draws one label and one input bar for every field', () => {
  const { container } = renderWithStore(<HeroFormSkeleton fields={fields} />);
  expect(container.querySelectorAll('[data-skeleton-label]')).toHaveLength(3);
  expect(inputBars(container)).toHaveLength(3);
});

it('uses the input height, and a taller box for a long text field', () => {
  const { container } = renderWithStore(<HeroFormSkeleton fields={fields} />);
  const [first, , long] = inputBars(container);
  expect(first).toHaveStyle({ height: '2.5rem', borderRadius: '0.3rem' });
  expect(long).toHaveStyle({ height: '8.75rem' });
});

it('ends with a full-width Save button bar', () => {
  const { container } = renderWithStore(<HeroFormSkeleton fields={fields} />);
  expect(container.querySelector('[data-skeleton-button] > *')).toHaveStyle({
    width: '100%',
    height: '3rem',
    borderRadius: '0.6rem',
  });
});
