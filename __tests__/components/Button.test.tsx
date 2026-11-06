import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../components';
import { renderWithStore } from '../test-utils';

it('renders children, handles clicks and keeps styling props off the DOM', async () => {
  const onClick = jest.fn();
  renderWithStore(
    <Button type="button" size="md" rounded fluid onClick={onClick}>
      Hire Me
    </Button>,
  );
  const button = screen.getByRole('button', { name: 'Hire Me' });
  await userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(button).not.toHaveAttribute('rounded');
  expect(button).not.toHaveAttribute('fluid');
});

describe('loading state', () => {
  it('shows a spinner, keeps the text, and blocks extra clicks while loading', () => {
    const onClick = jest.fn();
    const { container } = renderWithStore(
      <Button type="submit" size="md" loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('is not busy by default', () => {
    renderWithStore(
      <Button type="submit" size="md">
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).not.toHaveAttribute('aria-busy');
    expect(button).toBeEnabled();
  });
});
