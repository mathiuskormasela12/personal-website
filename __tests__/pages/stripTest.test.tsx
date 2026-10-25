import React from 'react';
import { render, screen } from '@testing-library/react';
import StripTest from '../../pages/strip-test';

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

it('explains which color belongs to which part of the page', () => {
  render(<StripTest />);
  expect(
    screen.getByRole('heading', { name: 'Strip test' }),
  ).toBeInTheDocument();
  expect(screen.getByText(/red = html background/i)).toBeInTheDocument();
  expect(screen.getByText(/green = body background/i)).toBeInTheDocument();
  expect(
    screen.getByText(/orange = bar at the screen edge/i),
  ).toBeInTheDocument();
  expect(screen.getByText(/blue = page content/i)).toBeInTheDocument();
});

it('paints html red and body green so the strip color shows which one Chrome uses', () => {
  render(<StripTest />);
  const css = document.querySelector('style')?.textContent ?? '';
  expect(css.replace(/\s/g, '')).toContain(
    'html{background:#e53935!important;}',
  );
  expect(css.replace(/\s/g, '')).toContain(
    'body{background:#43a047!important;}',
  );
});

it('shows the sizes that the browser reports', () => {
  Object.defineProperty(window, 'innerWidth', {
    value: 734,
    configurable: true,
  });
  Object.defineProperty(window, 'innerHeight', {
    value: 343,
    configurable: true,
  });
  Object.defineProperty(window.screen, 'width', {
    value: 844,
    configurable: true,
  });
  Object.defineProperty(window.screen, 'height', {
    value: 390,
    configurable: true,
  });
  render(<StripTest />);
  expect(screen.getByText('Page: 734 x 343')).toBeInTheDocument();
  expect(screen.getByText('Screen: 844 x 390')).toBeInTheDocument();
  expect(screen.getByText(/Notch space left: /)).toBeInTheDocument();
  expect(screen.getByText(/Notch space right: /)).toBeInTheDocument();
  expect(screen.getByText(/Browser: /)).toBeInTheDocument();
});

it('draws a bar at the very left screen edge', () => {
  render(<StripTest />);
  expect(screen.getByTestId('edge-bar')).toHaveStyle({
    position: 'fixed',
    left: '0px',
    top: '0px',
    bottom: '0px',
  });
});
