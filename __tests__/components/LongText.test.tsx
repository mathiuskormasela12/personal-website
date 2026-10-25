import { screen } from '@testing-library/react';
import { LongText } from '../../components';
import { renderWithStore } from '../test-utils';

it('renders a textarea with the given props', () => {
  renderWithStore(<LongText placeholder="Subtitle" defaultValue="Hello" />);
  const textarea = screen.getByPlaceholderText('Subtitle');
  expect(textarea.tagName).toBe('TEXTAREA');
  expect(textarea).toHaveValue('Hello');
});

it('shows the validation message and does not leak it as an attribute', () => {
  renderWithStore(
    <LongText placeholder="Subtitle" invalidMessage="Too long" />,
  );
  expect(screen.getByText('Too long')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Subtitle')).not.toHaveAttribute(
    'invalidMessage',
  );
});

it('uses the same whole-pixel border and native look reset as TextField', () => {
  renderWithStore(<LongText placeholder="Subtitle" />);
  expect(screen.getByPlaceholderText('Subtitle')).toHaveStyle({
    borderLeftWidth: '1px',
    borderRightWidth: '1px',
    appearance: 'none',
    backgroundColor: 'rgb(255, 255, 255)',
  });
});

it('uses the soft input border color when the value is valid', () => {
  renderWithStore(<LongText placeholder="Subtitle" />);
  expect(screen.getByPlaceholderText('Subtitle')).toHaveStyle({
    borderLeftColor: 'rgb(200, 205, 219)',
  });
});

it('uses the danger border color when the value is invalid', () => {
  renderWithStore(<LongText placeholder="Subtitle" invalidMessage="Bad" />);
  expect(screen.getByPlaceholderText('Subtitle')).toHaveStyle({
    borderLeftColor: 'hsl(348, 100%, 61%)',
  });
});
