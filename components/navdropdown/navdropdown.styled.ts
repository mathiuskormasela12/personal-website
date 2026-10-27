import Link from 'next/link';
import styled from 'styled-components';
import { Colors } from '../../themes';

export const CHEVRON_SIZE = 15;

export const CHEVRON_GAP = '0.4rem';

interface IOpenProps {
  $open: boolean;
}

interface IDangerProps {
  $danger: boolean;
}

export const Root = styled.div`
  position: relative;
`;

export const Trigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${CHEVRON_GAP};
  padding: 0.55rem 0.9rem;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
`;

export const Chevron = styled.span<IOpenProps>`
  display: inline-flex;
  transition: transform 0.2s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

export const Menu = styled.ul`
  list-style: none;
  background-color: ${Colors.soft};
  padding: 0.3rem 0;
  font-weight: normal;

  @media (max-width: 1200px) {
    margin-left: calc(-1 * var(--safe-left));
    margin-right: calc(-1 * var(--safe-right));
  }

  @media (min-width: 1201px) {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 2;
    min-width: 14rem;
    padding: 0.45rem;
    background-color: ${Colors.surface};
    border: 1px solid ${Colors.line};
    border-radius: 1rem;
    box-shadow: 0 18px 40px -22px rgba(45, 67, 121, 0.45);
  }
`;

export const MenuItem = styled.li<IDangerProps>`
  ${({ $danger }) =>
    $danger
      ? `
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: ${Colors.line};
    margin-top: 0.35rem;
    padding-top: 0.35rem;
  `
      : ''}
`;

export const MenuLink = styled(Link)<IDangerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  padding: 0.85rem 0.8rem;
  font-size: 0.95rem;
  text-decoration: none;
  white-space: nowrap;
  color: ${({ $danger }) => ($danger ? Colors.danger : Colors.dark)};

  & > svg {
    color: ${({ $danger }) => ($danger ? Colors.danger : Colors.light)};
  }

  &:hover,
  &:focus-visible {
    background-color: ${Colors.soft};
  }

  @media (min-width: 1201px) {
    justify-content: flex-start;
    padding: 0.7rem 0.8rem;
    border-radius: 0.7rem;
  }
`;
