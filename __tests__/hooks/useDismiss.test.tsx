import React, { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useDismiss } from '../../hooks/useDismiss';

const Harness = ({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean;
  onDismiss: () => void;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useDismiss({ isOpen, onDismiss, rootRef, triggerRef });

  return (
    <div>
      <div ref={rootRef}>
        <button ref={triggerRef} type="button">
          trigger
        </button>
        <input aria-label="inside" />
      </div>
      <p>outside</p>
    </div>
  );
};

it('dismisses on a mouse down outside', () => {
  const onDismiss = jest.fn();
  render(<Harness isOpen onDismiss={onDismiss} />);
  fireEvent.mouseDown(screen.getByText('outside'));
  expect(onDismiss).toHaveBeenCalledTimes(1);
});

it('ignores a mouse down inside', () => {
  const onDismiss = jest.fn();
  render(<Harness isOpen onDismiss={onDismiss} />);
  fireEvent.mouseDown(screen.getByLabelText('inside'));
  expect(onDismiss).not.toHaveBeenCalled();
});

it('dismisses on Escape and gives focus back to the trigger', () => {
  const onDismiss = jest.fn();
  render(<Harness isOpen onDismiss={onDismiss} />);
  screen.getByLabelText('inside').focus();
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onDismiss).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'trigger' })).toHaveFocus();
});

it('ignores other keys', () => {
  const onDismiss = jest.fn();
  render(<Harness isOpen onDismiss={onDismiss} />);
  fireEvent.keyDown(document, { key: 'Enter' });
  expect(onDismiss).not.toHaveBeenCalled();
});

it('does nothing while closed', () => {
  const onDismiss = jest.fn();
  render(<Harness isOpen={false} onDismiss={onDismiss} />);
  fireEvent.mouseDown(screen.getByText('outside'));
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onDismiss).not.toHaveBeenCalled();
});

it('stops listening after unmount', () => {
  const onDismiss = jest.fn();
  const { unmount } = render(<Harness isOpen onDismiss={onDismiss} />);
  unmount();
  fireEvent.mouseDown(document.body);
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onDismiss).not.toHaveBeenCalled();
});
