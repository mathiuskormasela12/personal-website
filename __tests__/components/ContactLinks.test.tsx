import { render, screen } from '@testing-library/react';
import { ContactLinks } from '../../components';

const contacts = {
  email: 'mathiuskormasela12@gmail.com',
  phone: '+628111906204',
};

it('shows the email as a mail link', () => {
  render(<ContactLinks contacts={contacts} />);
  expect(
    screen.getByRole('link', { name: 'mathiuskormasela12@gmail.com' }),
  ).toHaveAttribute('href', 'mailto:mathiuskormasela12@gmail.com');
});

it('shows the phone nicely formatted with its flag, as a call link', () => {
  render(<ContactLinks contacts={contacts} />);
  const phone = screen.getByRole('link', { name: '+62 811 1906 204' });
  expect(phone).toHaveAttribute('href', 'tel:+628111906204');
  expect(phone.querySelector('img')?.getAttribute('src')).toBe('/flags/ID.svg');
});

it('shows a number from another country with that flag', () => {
  render(<ContactLinks contacts={{ ...contacts, phone: '+819012345678' }} />);
  const phone = screen.getByRole('link', { name: '+81 90 1234 5678' });
  expect(phone.querySelector('img')?.getAttribute('src')).toBe('/flags/JP.svg');
});

it('hides an empty email', () => {
  render(<ContactLinks contacts={{ ...contacts, email: '' }} />);
  expect(screen.getAllByRole('link')).toHaveLength(1);
  expect(screen.queryByRole('link', { name: /@/ })).not.toBeInTheDocument();
});

it('hides an empty phone', () => {
  render(<ContactLinks contacts={{ ...contacts, phone: '' }} />);
  expect(screen.getAllByRole('link')).toHaveLength(1);
  expect(screen.queryByRole('link', { name: /\+62/ })).not.toBeInTheDocument();
});

it('shows nothing when both are empty', () => {
  const { container } = render(
    <ContactLinks contacts={{ email: '', phone: '' }} />,
  );
  expect(container).toBeEmptyDOMElement();
});

it('shows the list without bullet points', () => {
  render(<ContactLinks contacts={contacts} />);
  expect(screen.getByRole('list')).toHaveStyle({ listStyle: 'none' });
});
