import { screen } from '@testing-library/react';
import { TextField } from '../../components';
import { renderWithStore } from '../test-utils';

it('shows the validation message and does not leak it as an attribute', () => {
  renderWithStore(<TextField placeholder="Email" invalidMessage="Email is required" />);
  expect(screen.getByText('Email is required')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).not.toHaveAttribute('invalidMessage');
});
