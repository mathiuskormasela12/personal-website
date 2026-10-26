import { Colors, DARK_TOKENS, LIGHT_TOKENS } from '../../themes';

const toRgb = (hex: string) => {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
};

const luminance = (hex: string) => {
  const [r, g, b] = toRgb(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

it('has a dark value for every light color', () => {
  expect(Object.keys(DARK_TOKENS).sort()).toEqual(
    Object.keys(LIGHT_TOKENS).sort(),
  );
});

it('turns every color into a CSS variable, so components follow the theme', () => {
  expect(Colors.primary).toBe('var(--color-primary)');
  expect(Colors.inputBorder).toBe('var(--color-input-border)');
  expect(Colors.navPill).toBe('var(--color-nav-pill)');
  expect(Object.keys(Colors).sort()).toEqual(Object.keys(LIGHT_TOKENS).sort());
});

it('keeps the brand colors of the light theme', () => {
  expect(LIGHT_TOKENS).toMatchObject({
    primary: '#279EFF',
    dark: '#2D4379',
    light: '#586991',
    inputBorder: '#C8CDDB',
    danger: 'hsl(348, 100%, 61%)',
  });
});

it.each([
  ['light', LIGHT_TOKENS],
  ['dark', DARK_TOKENS],
])('keeps the %s theme text easy to read', (_, tokens) => {
  expect(contrast(tokens.dark, tokens.background)).toBeGreaterThanOrEqual(7);
  expect(contrast(tokens.dark, tokens.surface)).toBeGreaterThanOrEqual(7);
  expect(contrast(tokens.light, tokens.background)).toBeGreaterThanOrEqual(4.5);
  expect(contrast(tokens.light, tokens.surface)).toBeGreaterThanOrEqual(4.5);
  expect(contrast(tokens.primary, tokens.background)).toBeGreaterThanOrEqual(
    2.5,
  );
});

it('keeps text on the blue buttons readable in dark mode', () => {
  expect(
    contrast(DARK_TOKENS.background, DARK_TOKENS.primary),
  ).toBeGreaterThanOrEqual(4.5);
});

it('uses a dark background and light text in dark mode', () => {
  expect(luminance(DARK_TOKENS.background)).toBeLessThan(0.05);
  expect(luminance(DARK_TOKENS.dark)).toBeGreaterThan(0.6);
});
