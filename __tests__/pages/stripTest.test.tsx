import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import StripTest from '../../pages/strip-test';

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const flat = (value: string) => value.replace(/\s/g, '');
const css = () => flat(document.querySelector('style')?.textContent ?? '');
const press = (name: string) =>
  fireEvent.click(screen.getByRole('button', { name }));

it('names the page and explains the four buttons', () => {
  render(<StripTest />);
  expect(
    screen.getByRole('heading', { name: 'Strip test 3' }),
  ).toBeInTheDocument();
  expect(screen.getByText('Bars: orange and pink, wide')).toBeInTheDocument();
  expect(screen.getByText('Body: green, html: red')).toBeInTheDocument();
  expect(screen.getByText('Tappable dim: off')).toBeInTheDocument();
});

it('starts with a wide orange bar on the left and a wide pink bar on the right', () => {
  render(<StripTest />);
  expect(screen.getByTestId('left-edge')).toHaveStyle({
    position: 'fixed',
    left: '0px',
    top: '0px',
    bottom: '0px',
    width: '24px',
    backgroundColor: 'rgb(251, 140, 0)',
  });
  expect(screen.getByTestId('right-edge')).toHaveStyle({
    position: 'fixed',
    right: '0px',
    top: '0px',
    bottom: '0px',
    width: '24px',
    backgroundColor: 'rgb(216, 27, 96)',
  });
});

it('changes the bar colors and back', () => {
  render(<StripTest />);
  press('Change the bar colors');
  expect(screen.getByTestId('left-edge')).toHaveStyle({
    backgroundColor: 'rgb(142, 36, 170)',
  });
  expect(screen.getByTestId('right-edge')).toHaveStyle({
    backgroundColor: 'rgb(0, 172, 193)',
  });
  expect(screen.getByText('Bars: purple and cyan, wide')).toBeInTheDocument();
  press('Change the bar colors');
  expect(screen.getByText('Bars: orange and pink, wide')).toBeInTheDocument();
});

it('makes the bars thin and wide again', () => {
  render(<StripTest />);
  press('Make the bars thin');
  expect(screen.getByTestId('left-edge')).toHaveStyle({ width: '2px' });
  expect(screen.getByTestId('right-edge')).toHaveStyle({ width: '2px' });
  expect(screen.getByText('Bars: orange and pink, thin')).toBeInTheDocument();
  press('Make the bars wide');
  expect(screen.getByTestId('left-edge')).toHaveStyle({ width: '24px' });
});

it('paints html red and changes the body color between green and blue', () => {
  render(<StripTest />);
  expect(css()).toContain('html{background:#e53935!important;}');
  expect(css()).toContain('body{background:#43a047!important;}');
  press('Change the body color');
  expect(css()).toContain('body{background:#1e88e5!important;}');
  expect(screen.getByText('Body: blue, html: red')).toBeInTheDocument();
  press('Change the body color');
  expect(css()).toContain('body{background:#43a047!important;}');
});

it('shows a layer that can be tapped over the whole page and clears it', () => {
  render(<StripTest />);
  expect(screen.queryByTestId('dim-layer')).not.toBeInTheDocument();
  press('Dim with a tappable layer');
  const layer = screen.getByTestId('dim-layer');
  expect(layer).toHaveStyle({
    position: 'fixed',
    left: '0px',
    right: '0px',
    top: '0px',
    bottom: '0px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  });
  expect(layer).not.toHaveStyle({ pointerEvents: 'none' });
  expect(screen.getByText('Tappable dim: on')).toBeInTheDocument();
  press('Clear the dim');
  expect(screen.queryByTestId('dim-layer')).not.toBeInTheDocument();
});

it('keeps the buttons above the dim layer so they can still be pressed', () => {
  render(<StripTest />);
  press('Dim with a tappable layer');
  const main = screen.getByRole('main');
  expect(Number(main.style.zIndex)).toBeGreaterThan(
    Number(screen.getByTestId('dim-layer').style.zIndex),
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
