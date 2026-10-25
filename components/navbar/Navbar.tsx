// ========== Navbar
// import modules
import React, { useId, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { NAV_ITEMS } from '../../constants';
import { useProfile } from '../../hooks/useProfile';
import { useTheme } from '../../hooks/useTheme';
import { IGlobalStates } from '../../interfaces';
import * as Styled from './navbar.styled';

// import all components
import { Button } from '../button/Button';
import { NavDropdown } from '../navdropdown/NavDropdown';
import { ThemeToggle } from '../themetoggle/ThemeToggle';
import Services from '../../services';

export const Navbar: NextPage = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const menuId = useId();
  const { theme, toggleTheme } = useTheme();
  const accessToken: string = useSelector(
    (current: IGlobalStates) => current.auth.accessToken,
  );
  const refreshToken: string = useSelector(
    (current: IGlobalStates) => current.auth.refreshToken,
  );
  const id: number = useSelector(
    (current: IGlobalStates) => current.projects.project.id,
  );
  const profile = useProfile();
  const isAdmin = accessToken !== '';
  const navItems = isAdmin ? NAV_ITEMS.ADMIN : NAV_ITEMS.USER;
  const isAdminPage = NAV_ITEMS.ADMIN_MENU.some(
    (item) => item.path === router.pathname,
  );

  const adminMenu = NAV_ITEMS.ADMIN_MENU.map((item) =>
    item.path === '/logout'
      ? { ...item, path: `/logout?from=${encodeURIComponent(router.asPath)}` }
      : item,
  );

  const handleMoveToOtherWebsite = (link: string) => {
    window.location.href = link;
  };

  const handleButton = () => {
    if (accessToken !== '' && refreshToken !== '' && id > 0) {
      Swal.fire({
        title: 'What are you doing?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Edit',
        denyButtonText: 'Delete',
      }).then(async (result) => {
        if (result.isConfirmed) {
          router.push(`/project-edit/${String(id)}`);
        } else if (result.isDenied) {
          try {
            const { data } = await Services.deleteProject(id);
            Swal.fire({
              title: 'Success',
              icon: 'success',
              text: data.message,
              didClose() {
                router.push('/');
              },
            });
          } catch (err: any) {
            Swal.fire({
              title: 'Failed',
              icon: 'error',
              text: err.message,
            });
          }
        }
      });
    } else {
      handleMoveToOtherWebsite('https://www.linkedin.com/in/mathiuskormasela/');
    }
  };

  return (
    <Styled.NavHero toggle={toggle}>
      <Styled.Nav>
        <Styled.NavContainer>
          <Styled.NavBrand>
            <Styled.Brand as={Link} href="/">
              {profile.name}
            </Styled.Brand>
          </Styled.NavBrand>
          <Styled.NavList id={menuId} toggle={toggle}>
            {navItems.map((item) => (
              <Styled.NavItems
                key={item.id.toString()}
                active={router.pathname === item.path}
              >
                <Styled.NavLink href={item.path}>{item.text}</Styled.NavLink>
              </Styled.NavItems>
            ))}
            {isAdmin && (
              <Styled.NavItems active={isAdminPage}>
                <NavDropdown label="Admin" items={adminMenu} />
              </Styled.NavItems>
            )}
          </Styled.NavList>
          <Styled.NavSide>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <Styled.HireSlot>
              <Button type="button" size="md" onClick={handleButton}>
                {accessToken !== '' && refreshToken !== '' && id > 0
                  ? 'Action'
                  : 'Hire Me'}
              </Button>
            </Styled.HireSlot>
            <Styled.MenuButton
              type="button"
              aria-label={toggle ? 'Close menu' : 'Open menu'}
              aria-expanded={toggle}
              aria-controls={menuId}
              onClick={() => setToggle((current) => !current)}
            >
              {toggle ? (
                <FiX size={22} aria-hidden />
              ) : (
                <FiMenu size={22} aria-hidden />
              )}
            </Styled.MenuButton>
          </Styled.NavSide>
        </Styled.NavContainer>
      </Styled.Nav>
    </Styled.NavHero>
  );
};
