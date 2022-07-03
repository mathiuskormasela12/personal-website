// ========== Navbar
// import modules
import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { HiOutlineMenu } from 'react-icons/hi';
import { NAV_ITEMS } from '../../constants';
import { IGlobalStates } from '../../interfaces';
import * as Styled from './navbar.styled';

// import all components
import { Button } from '../button/Button';
import { Colors } from '../../themes';

export const Navbar: NextPage = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const accessToken: string = useSelector((current: IGlobalStates) => current.auth.accessToken);
  const accessTokenTemporary: string = useSelector((
    current: IGlobalStates,
  ) => current.authTemporary.accessToken);
  const navItems = (accessToken !== '' || accessTokenTemporary !== '') ? NAV_ITEMS.ADMIN : NAV_ITEMS.USER;

  const handleMoveToOtherWebsite = (link: string) => {
    window.location.href = link;
  };

  return (
    <Styled.NavHero toggle={toggle}>
      <Styled.Nav>
        <Styled.NavContainer>
          <Styled.NavBrand>
            <Link href="/" passHref>
              <Styled.Brand>
                Mathius
              </Styled.Brand>
            </Link>
          </Styled.NavBrand>
          <Styled.NavList toggle={toggle}>
            {navItems.map((item) => (
              <Link
                href={item.path}
                passHref
                key={item.id.toString()}
              >
                <Styled.NavItems active={router.pathname === item.path}>
                  {item.text}
                </Styled.NavItems>
              </Link>
            ))}
          </Styled.NavList>
          <Styled.NavSide>
            <Button
              type="button"
              size="md"
              rounded
              onClick={() => handleMoveToOtherWebsite('https://www.linkedin.com/in/mathiuskormasela/')}
            >
              Hire Me
            </Button>
            {toggle ? (
              <GrClose
                size={20}
                color={Colors.dark}
                onClick={() => setToggle((currentToggle: boolean) => !currentToggle)}
              />
            ) : (
              <HiOutlineMenu
                size={25}
                color={Colors.dark}
                onClick={() => setToggle((currentToggle: boolean) => !currentToggle)}
              />
            )}
          </Styled.NavSide>
        </Styled.NavContainer>
      </Styled.Nav>
    </Styled.NavHero>
  );
};
