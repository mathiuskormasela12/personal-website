import { SkeletonBar } from '../../components';
import { getMediaRuleStyle, renderWithStore } from '../test-utils';

const renderBar = (props = {}) => {
  const { container } = renderWithStore(
    <SkeletonBar width="10rem" height="3rem" {...props} />,
  );
  return container.firstChild as HTMLElement;
};

it('draws a soft bar with the given size', () => {
  expect(renderBar()).toHaveStyle({
    display: 'block',
    width: '10rem',
    height: '3rem',
    backgroundColor: 'var(--color-soft)',
  });
});

it('is round by default and can use another corner size', () => {
  expect(renderBar()).toHaveStyle({ borderRadius: '999px' });
  expect(renderBar({ radius: '0.3rem' })).toHaveStyle({
    borderRadius: '0.3rem',
  });
});

it('is hidden from screen readers', () => {
  expect(renderBar()).toHaveAttribute('aria-hidden', 'true');
});

it('has a moving light that stops when the device asks for less motion', () => {
  const bar = renderBar();
  const css = Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules))
    .map((rule) => rule.cssText.replace(/\s/g, ''))
    .join('\n');
  expect(css).toMatch(/::after\{[^}]*animation:[^;]*infinite/);
  expect(
    getMediaRuleStyle(bar, '(prefers-reduced-motion: reduce)'),
  ).toBeUndefined();
  expect(css).toMatch(
    /@media\(prefers-reduced-motion:reduce\)\{\.[\w-]+::after\{animation:none;\}\}/,
  );
});
