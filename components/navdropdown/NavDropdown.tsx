import React, { useId, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useDismiss } from '../../hooks/useDismiss';
import { INavDropdownProps } from '../../interfaces';
import * as Styled from './navdropdown.styled';

export const NavDropdown: React.FC<INavDropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useDismiss({
    isOpen,
    onDismiss: () => setIsOpen(false),
    rootRef,
    triggerRef,
  });

  return (
    <Styled.Root ref={rootRef}>
      <Styled.Trigger
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        {label}
        <Styled.Chevron $open={isOpen} aria-hidden>
          <FiChevronDown size={Styled.CHEVRON_SIZE} />
        </Styled.Chevron>
      </Styled.Trigger>
      {isOpen && (
        <Styled.Menu id={menuId}>
          {items.map(({ id, text, path, icon: Icon, danger = false }) => (
            <Styled.MenuItem key={id} $danger={danger}>
              <Styled.MenuLink
                href={path}
                $danger={danger}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={16} aria-hidden />
                {text}
              </Styled.MenuLink>
            </Styled.MenuItem>
          ))}
        </Styled.Menu>
      )}
    </Styled.Root>
  );
};
