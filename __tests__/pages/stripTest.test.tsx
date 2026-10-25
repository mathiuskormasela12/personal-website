import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import StripTest from '../../pages/strip-test';

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const flat = (value: string) => value.replace(/\s/g, '');

it('explains which color belongs to which part of the page', () => {
  render(<StripTest />);
  expect(
    screen.getByRole('heading', { name: 'Strip test 2' }),
  ).toBeInTheDocument();
  expect(
    screen.getByText('Left edge, top to bottom: orange, purple, yellow'),
  ).toBeInTheDocument();
  expect(
    screen.getByText('Right edge, top to bottom: pink, cyan, brown'),
  ).toBeInTheDocument();
  expect(
    screen.getByText('green = body background, red = html background'),
  ).toBeInTheDocument();
});

it('paints html red and body green', () => {
  render(<StripTest />);
  const css = flat(document.querySelector('style')?.textContent ?? '');
  expect(css).toContain('html{background:#e53935!important;}');
  expect(css).toContain('body{background:#43a047!important;}');
});

it('draws three stacked colors on the left edge and three on the right edge', () => {
  render(<StripTest />);
  const left = screen.getAllByTestId('left-edge-part');
  const right = screen.getAllByTestId('right-edge-part');
  expect(left.map((part) => part.style.backgroundColor)).toEqual([
    'rgb(251, 140, 0)',
    'rgb(142, 36, 170)',
    'rgb(253, 216, 53)',
  ]);
  expect(right.map((part) => part.style.backgroundColor)).toEqual([
    'rgb(216, 27, 96)',
    'rgb(0, 172, 193)',
    'rgb(109, 76, 65)',
  ]);
  expect(screen.getByTestId('left-edge')).toHaveStyle({
    position: 'fixed',
    left: '0px',
    top: '0px',
    bottom: '0px',
  });
  expect(screen.getByTestId('right-edge')).toHaveStyle({
    position: 'fixed',
    right: '0px',
    top: '0px',
    bottom: '0px',
  });
});

it('dims the whole page when the button is pressed and clears it again', () => {
  render(<StripTest />);
  expect(screen.queryByTestId('dim-layer')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Dim the page' }));
  expect(screen.getByTestId('dim-layer')).toHaveStyle({
    position: 'fixed',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
  });
  fireEvent.click(screen.getByRole('button', { name: 'Clear the dim' }));
  expect(screen.queryByTestId('dim-layer')).not.toBeInTheDocument();
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
