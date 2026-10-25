import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { GlobalStyles } from '../../styles';
import { DARK_TOKENS, LIGHT_TOKENS } from '../../themes';

const css = () => {
  const sheet = new ServerStyleSheet();
  try {
    renderToString(sheet.collectStyles(<GlobalStyles />));
    return sheet.getStyleTags().replace(/\s/g, '');
  } finally {
    sheet.seal();
  }
};

it('writes the light colors on the root element', () => {
  expect(css()).toContain(`:root{`);
  expect(css()).toContain(`--color-primary:${LIGHT_TOKENS.primary};`);
  expect(css()).toContain(`--color-input-border:${LIGHT_TOKENS.inputBorder};`);
});

it('writes the dark colors for data-theme="dark"', () => {
  const dark = css().split(`[data-theme="dark"]{`)[1] ?? '';
  expect(dark).toContain(`--color-background:${DARK_TOKENS.background};`);
  expect(dark).toContain(`--color-primary:${DARK_TOKENS.primary};`);
});

it('paints the page with the theme colors and tells the browser the scheme', () => {
  expect(css()).toContain('background-color:var(--color-background)');
  expect(css()).toContain('color-scheme:dark');
});

it('paints the SweetAlert popups with the theme colors', () => {
  const styles = css();
  expect(styles).toContain('.swal2-popup{');
  expect(styles).toMatch(
    /\.swal2-popup\{[^}]*background(-color)?:var\(--color-surface\)/,
  );
  expect(styles).toMatch(/\.swal2-title\{[^}]*color:var\(--color-dark\)/);
  expect(styles).toMatch(
    /\.swal2-html-container\{[^}]*color:var\(--color-light\)/,
  );
});

it('makes the SweetAlert popups compact on short landscape screens', () => {
  const styles = css();
  const short =
    styles.split('@media(max-height:500px)and(orientation:landscape){')[1] ??
    '';
  expect(short).toMatch(
    /\.swal2-container\.swal2-icon\{[^}]*font-size:0\.55rem/,
  );
  expect(short).toContain('.swal2-container.swal2-title{');
  expect(short).toContain('.swal2-container.swal2-actions{');
});
