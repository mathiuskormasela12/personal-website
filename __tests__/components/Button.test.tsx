import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../components';
import { renderWithStore } from '../test-utils';

it('renders children, handles clicks and keeps styling props off the DOM', async () => {
  const onClick = jest.fn();
  renderWithStore(<Button type="button" size="md" rounded fluid onClick={onClick}>Hire Me</Button>);
  const button = screen.getByRole('button', { name: 'Hire Me' });
  await userEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(button).not.toHaveAttribute('rounded');
  expect(button).not.toHaveAttribute('fluid');
});
