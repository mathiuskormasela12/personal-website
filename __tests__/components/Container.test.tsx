import { screen } from '@testing-library/react';
import { Container } from '../../components';
import { getMediaRuleStyle, renderWithStore } from '../test-utils';

const MOBILE_QUERY = '(max-width: 920px)';

const renderContainer = (customSize?: { value: number }) => {
  renderWithStore(
    <Container customSize={customSize}>
      <p>content</p>
    </Container>,
  );
  return screen.getByText('content').parentElement as HTMLElement;
};

it('renders its children', () => {
  renderContainer();
  expect(screen.getByText('content')).toBeInTheDocument();
});

it('uses the custom width as a percentage on large screens', () => {
  expect(renderContainer({ value: 80 })).toHaveStyle({ width: '80%' });
});

it('fills the screen with whole-pixel side padding on mobile when a custom size is set', () => {
  const style = getMediaRuleStyle(renderContainer({ value: 80 }), MOBILE_QUERY);
  expect(style?.getPropertyValue('width')).toBe('100%');
  expect(style?.getPropertyValue('padding')).toBe('0 1.25rem');
});
