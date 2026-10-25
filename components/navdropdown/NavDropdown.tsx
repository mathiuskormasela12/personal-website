import React, { useEffect, useId, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { INavDropdownProps } from '../../interfaces';
import * as Styled from './navdropdown.styled';

export const NavDropdown: React.FC<INavDropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
          <FiChevronDown size={15} />
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
