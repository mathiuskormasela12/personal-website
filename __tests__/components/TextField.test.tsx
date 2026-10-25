import { screen } from '@testing-library/react';
import { TextField } from '../../components';
import { renderWithStore } from '../test-utils';

it('shows the validation message and does not leak it as an attribute', () => {
  renderWithStore(
    <TextField placeholder="Email" invalidMessage="Email is required" />,
  );
  expect(screen.getByText('Email is required')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).not.toHaveAttribute(
    'invalidMessage',
  );
});

it('uses a whole-pixel border so mobile browsers never drop one side', () => {
  renderWithStore(<TextField placeholder="Email" />);
  expect(screen.getByPlaceholderText('Email')).toHaveStyle({
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
  });
});

it('keeps the same border width when the value is invalid', () => {
  renderWithStore(<TextField placeholder="Email" invalidMessage="Invalid" />);
  expect(screen.getByPlaceholderText('Email')).toHaveStyle({
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
  });
});

it('removes the native iOS input look so the border is drawn by the app', () => {
  renderWithStore(<TextField placeholder="Email" />);
  expect(screen.getByPlaceholderText('Email')).toHaveStyle({
    appearance: 'none',
    backgroundColor: 'rgb(255, 255, 255)',
  });
});
