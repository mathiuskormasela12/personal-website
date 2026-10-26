import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordField } from '../../components';
import { renderWithStore } from '../test-utils';

type PasswordFieldProps = React.ComponentProps<typeof PasswordField>;

const renderField = (
  props: Partial<PasswordFieldProps> = {},
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = jest.fn(),
) =>
  renderWithStore(
    <form onSubmit={onSubmit}>
      <PasswordField id="password" placeholder="Password..." {...props} />
    </form>,
  );

it('hides the password by default', () => {
  renderField();
  expect(screen.getByPlaceholderText('Password...')).toHaveAttribute(
    'type',
    'password',
  );
  expect(screen.getByRole('button', { name: 'Show password' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
});

it('shows the password after the eye button is clicked', async () => {
  renderField();
  await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
  expect(screen.getByPlaceholderText('Password...')).toHaveAttribute(
    'type',
    'text',
  );
  expect(screen.getByRole('button', { name: 'Hide password' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

it('hides the password again on a second click', async () => {
  renderField();
  await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
  await userEvent.click(screen.getByRole('button', { name: 'Hide password' }));
  expect(screen.getByPlaceholderText('Password...')).toHaveAttribute(
    'type',
    'password',
  );
});

it('does not submit the surrounding form when the eye button is clicked', async () => {
  const onSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault(),
  );
  renderField({}, onSubmit);
  await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
  expect(onSubmit).not.toHaveBeenCalled();
});

it('links the eye button to the input it controls', () => {
  renderField();
  expect(screen.getByRole('button', { name: 'Show password' })).toHaveAttribute(
    'aria-controls',
    'password',
  );
});

it('passes value, change handler and validation message to the input', () => {
  const onChange = jest.fn();
  renderField({ value: 'Secret1!', onChange, invalidMessage: 'Too weak' });
  const input = screen.getByPlaceholderText('Password...');
  expect(input).toHaveValue('Secret1!');
  expect(screen.getByText('Too weak')).toBeInTheDocument();
  fireEvent.change(input, { target: { value: 'Secret2!' } });
  expect(onChange).toHaveBeenCalledTimes(1);
});

it('disables the eye button when the input is disabled', () => {
  renderField({ disabled: true });
  expect(screen.getByRole('button', { name: 'Show password' })).toBeDisabled();
});
