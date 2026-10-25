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

it('is as wide as the page content, not the whole screen, so the notch space stays free', () => {
  const container = renderContainer();
  const small = getMediaRuleStyle(
    container,
    MOBILE_QUERY.replace('920', '1200'),
  );
  expect(small?.getPropertyValue('width')).toBe('calc(100% - 3.6rem)');
  expect(small?.getPropertyValue('width')).not.toContain('vw');
  const big = Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .map((rule) => rule.cssText)
    .join('');
  expect(big).toContain('width: calc(100% - 10rem)');
  expect(big).not.toContain('100vw');
});
