import Link from 'next/link';
import styled from 'styled-components';
import { Colors } from '../../themes';

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
  gap: 0.4rem;
  padding: 1rem 1.35rem;
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
  background-color: #f7f9fc;
  padding: 0.3rem 0;

  @media (min-width: 1201px) {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 2;
    min-width: 14rem;
    padding: 0.45rem;
    background-color: white;
    border: 1px solid #e4e9f1;
    border-radius: 1rem;
    box-shadow: 0 18px 40px -22px rgba(45, 67, 121, 0.45);
  }
`;

export const MenuItem = styled.li<IDangerProps>`
  ${({ $danger }) =>
    $danger
      ? `
    border-top: 1px solid #edf1f7;
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
    background-color: #eef2f8;
  }

  @media (min-width: 1201px) {
    justify-content: flex-start;
    padding: 0.7rem 0.8rem;
    border-radius: 0.7rem;
  }
`;
