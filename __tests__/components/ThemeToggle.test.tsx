import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../../components';

it('offers dark mode while the page is light', () => {
  render(<ThemeToggle theme="light" onToggle={jest.fn()} />);
  expect(
    screen.getByRole('button', { name: 'Switch to dark theme' }),
  ).toBeInTheDocument();
});

it('offers light mode while the page is dark', () => {
  render(<ThemeToggle theme="dark" onToggle={jest.fn()} />);
  expect(
    screen.getByRole('button', { name: 'Switch to light theme' }),
  ).toBeInTheDocument();
});

it('shows a different icon for each theme', () => {
  const { container, rerender } = render(
    <ThemeToggle theme="light" onToggle={jest.fn()} />,
  );
  const moon = container.querySelector('svg')?.innerHTML;
  rerender(<ThemeToggle theme="dark" onToggle={jest.fn()} />);
  expect(container.querySelector('svg')?.innerHTML).not.toBe(moon);
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
});

it('asks to switch when clicked', async () => {
  const onToggle = jest.fn();
  render(<ThemeToggle theme="light" onToggle={onToggle} />);
  await userEvent.click(screen.getByRole('button'));
  expect(onToggle).toHaveBeenCalledTimes(1);
});

it('is a normal button, so it never submits a form', () => {
  render(<ThemeToggle theme="light" onToggle={jest.fn()} />);
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
});
