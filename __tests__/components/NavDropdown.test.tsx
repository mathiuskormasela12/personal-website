import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FiEdit3, FiLogOut } from 'react-icons/fi';
import { NavDropdown } from '../../components';
import { getMediaRuleStyle, renderWithStore } from '../test-utils';

const items = [
  { id: 1, text: 'Edit Hero', path: '/hero-edit', icon: FiEdit3 },
  { id: 2, text: 'Logout', path: '/logout', icon: FiLogOut, danger: true },
];

const renderDropdown = () =>
  renderWithStore(
    <div>
      <NavDropdown label="Admin" items={items} />
      <p>outside</p>
    </div>,
  );

const trigger = () => screen.getByRole('button', { name: 'Admin' });

it('starts closed', () => {
  renderDropdown();
  expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  expect(
    screen.queryByRole('link', { name: 'Edit Hero' }),
  ).not.toBeInTheDocument();
});

it('opens a list of links that the button controls', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  expect(trigger()).toHaveAttribute('aria-expanded', 'true');
  const list = screen.getByRole('list');
  expect(trigger()).toHaveAttribute('aria-controls', list.id);
  expect(screen.getByRole('link', { name: 'Edit Hero' })).toHaveAttribute(
    'href',
    '/hero-edit',
  );
  expect(screen.getByRole('link', { name: 'Logout' })).toHaveAttribute(
    'href',
    '/logout',
  );
});

it('opens with the keyboard', async () => {
  renderDropdown();
  trigger().focus();
  await userEvent.keyboard('{Enter}');
  expect(trigger()).toHaveAttribute('aria-expanded', 'true');
});

it('closes on a second click', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  await userEvent.click(trigger());
  expect(trigger()).toHaveAttribute('aria-expanded', 'false');
});

it('closes with Escape and gives focus back to the button', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  screen.getByRole('link', { name: 'Edit Hero' }).focus();
  await userEvent.keyboard('{Escape}');
  expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  expect(trigger()).toHaveFocus();
});

it('closes on a click outside', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  await userEvent.click(screen.getByText('outside'));
  expect(trigger()).toHaveAttribute('aria-expanded', 'false');
});

it('stays open on a click inside the list', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  fireEvent.mouseDown(screen.getByRole('list'));
  expect(trigger()).toHaveAttribute('aria-expanded', 'true');
});

it('closes after an item is chosen', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  fireEvent.click(screen.getByRole('link', { name: 'Edit Hero' }));
  expect(trigger()).toHaveAttribute('aria-expanded', 'false');
});

it('separates a danger item and shows it in red', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  const logout = screen.getByRole('link', { name: 'Logout' });
  expect(logout).toHaveStyle({ color: 'hsl(348, 100%, 61%)' });
  expect(logout.closest('li')).toHaveStyle({ borderTopWidth: '1px' });
  expect(
    screen.getByRole('link', { name: 'Edit Hero' }).closest('li'),
  ).not.toHaveStyle({ borderTopWidth: '1px' });
});

it('shows the list without bullet points', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  expect(screen.getByRole('list')).toHaveStyle({ listStyle: 'none' });
});

it('floats under the button on desktop and opens inline on phones', async () => {
  renderDropdown();
  await userEvent.click(trigger());
  const list = screen.getByRole('list');
  expect(list).not.toHaveStyle({ position: 'absolute' });
  expect(
    getMediaRuleStyle(list, '(min-width: 1201px)')?.getPropertyValue(
      'position',
    ),
  ).toBe('absolute');
});
