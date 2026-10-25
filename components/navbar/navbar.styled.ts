// ========== Navbar Styles
// import all modules
import Link from 'next/link';
import styled from 'styled-components';
import { INavbarCollapesProps, INavItemsProps } from '../../interfaces';
import { Colors } from '../../themes';
import { Button as GhostButton } from '../themetoggle/themetoggle.styled';

export const NavHero = styled.div<INavbarCollapesProps>`
  left: 0;
  right: 0;
  position: absolute;
  z-index: 3;

  @media (max-width: 1200px) {
    ${({ toggle }) => {
      if (toggle) {
        return `
          position: fixed;
          height: 100vh;

          &::before {
            content: '';
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            pointer-events: none;
            z-index: -1;
          }
        `;
      }

      return '';
    }}
  }
`;

export const Nav = styled.nav`
  background-color: ${Colors.background};
  border-bottom: 1px solid ${Colors.line};
  height: 4.8rem;
  width: 100%;
  padding-left: var(--safe-left);
  padding-right: var(--safe-right);

  @media (max-width: 1200px) {
    height: auto;
  }
`;

export const NavContainer = styled.div`
  margin: 0 auto;
  width: calc(100% - 10rem);
  max-width: 1280px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const NavBrand = styled.div`
  order: 1;

  @media (max-width: 1200px) {
    flex: 1;
    padding: 1.1rem 0 1.1rem 1.25rem;
  }
`;

export const Brand = styled.a`
  color: ${Colors.primary};
  font-size: 1.6rem;
  text-decoration: none;
`;

export const NavList = styled.ul<INavbarCollapesProps>`
  list-style: none;
  display: flex;
  align-items: center;
  order: 2;

  @media (min-width: 1201px) {
    background-color: ${Colors.navPill};
    border-radius: 999px;
    padding: 0.3rem 0.5rem;
  }

  @media (max-width: 1200px) {
    order: 3;
    width: calc(100% + var(--safe-left) + var(--safe-right));
    margin-left: calc(-1 * var(--safe-left));
    margin-right: calc(-1 * var(--safe-right));
    flex-direction: column;
    padding-top: 0.4rem;
    padding-bottom: 1rem;
    padding-left: var(--safe-left);
    padding-right: var(--safe-right);
    background-color: ${Colors.background};
    border-top: 1px solid ${Colors.line};
    display: ${({ toggle }) => (toggle ? 'flex' : 'none')};
    max-height: calc(100vh - 4.5rem);
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  @supports (height: 100dvh) {
    @media (max-width: 1200px) {
      max-height: calc(100dvh - 4.5rem);
    }
  }
`;

export const NavItems = styled.li<INavItemsProps>`
  position: relative;
  color: ${({ active }) => (active ? Colors.dark : Colors.light)};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  font-size: 0.97rem;
  cursor: pointer;

  &:hover {
    color: ${Colors.dark};
  }

  @media (min-width: 1201px) {
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0.3rem;
      width: 1rem;
      height: 2px;
      border-radius: 2px;
      background-color: ${Colors.primary};
      transform: translateX(-50%);
      opacity: ${({ active }) => (active ? 1 : 0)};
    }
  }

  @media (max-width: 1200px) {
    width: 100%;
    text-align: center;
  }
`;

export const NavLink = styled(Link)`
  display: block;
  padding: 0.55rem 0.9rem;
  color: inherit;
  text-decoration: none;

  @media (max-width: 1200px) {
    padding: 0.9rem;
  }
`;

export const NavSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  order: 3;

  @media (max-width: 1200px) {
    order: 2;
    padding-right: 1rem;
  }
`;

export const HireSlot = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`;

export const MenuButton = styled(GhostButton)`
  @media (min-width: 1201px) {
    display: none;
  }
`;
