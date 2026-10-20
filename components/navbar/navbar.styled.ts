// ========== Navbar Styles
// import all modules
import Link from 'next/link';
import styled from 'styled-components';
import { INavbarCollapesProps, INavItemsProps } from '../../interfaces';
import { Colors } from '../../themes';

export const NavHero = styled.div<INavbarCollapesProps>`
  width: 100%;
  position: absolute;

  @media (max-width: 1200px) {
    ${({ toggle }) => {
      if (toggle) {
        return `
					position: fixed;
					height: 100vh;
					background: linear-gradient(
						rgba(0, 0, 0, 0.5),
						rgba(0, 0, 0, 0.5)
					), transparent;
					z-index: 1;
				`;
      }

      return '';
    }}
  }
`;

export const Nav = styled.nav`
  background-color: white;
  height: 6.4rem;
  width: 100%;

  @media (max-width: 1200px) {
    height: auto;
  }
`;

export const NavContainer = styled.div`
  margin: 0 auto;
  width: calc(100vw - 10rem);
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
  width: 10rem;
  order: 1;

  @media (max-width: 1200px) {
    flex: 5;
    padding: 1.2rem 0 1.2rem 1.8rem;
  }
`;

export const Brand = styled.a`
  color: ${Colors.primary};
  font-size: 2rem;
  text-decoration: none;
`;

export const NavList = styled.ul<INavbarCollapesProps>`
  width: 55rem;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: white;
  order: 2;

  @media (max-width: 1200px) {
    order: 3;
    width: 100%;
    display: ${({ toggle }) => (toggle ? 'flex' : 'none')};
  }

  @media (min-width: 1200px) and (max-width: 1400px) {
    width: 40rem;
  }
`;

export const NavItems = styled.li<INavItemsProps>`
  color: ${Colors.light};
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;

  @media (min-width: 1200px) {
    border-radius: 1.2rem;
  }

  &:not(&:last-child) {
    margin-right: 1rem;
  }

  &:hover {
    color: ${Colors.primary};
    background-color: ${Colors.shapeColor};
  }

  ${({ active }) => {
    if (active) {
      return `
				color: ${Colors.primary};
				background-color: ${Colors.shapeColor};
				font-weight: bold;
			`;
    }

    return '';
  }}

  @media (max-width: 1200px) {
    width: 100%;
    text-align: center;
    margin-right: 0 !important;
  }
`;

export const NavLink = styled(Link)`
  display: block;
  padding: 1rem 1.35rem;
  color: inherit;
  text-decoration: none;
`;

export const NavSide = styled.div`
  width: 12rem;
  display: flex;
  justify-content: flex-end;
  order: 3;

  & :not(button) {
    display: none;
  }

  @media (max-width: 1200px) {
    order: 2;
    flex: 2;
    padding-right: 1.8rem;

    & :not(button) {
      display: block;
      cursor: pointer;
    }

    & > button {
      display: none;
    }
  }
`;
