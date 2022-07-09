// ========== Navbar
// import modules
import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { HiOutlineMenu } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { NAV_ITEMS } from '../../constants';
import { IGlobalStates } from '../../interfaces';
import * as Styled from './navbar.styled';

// import all components
import { Button } from '../button/Button';
import { Colors } from '../../themes';
import Services from '../../services';

export const Navbar: NextPage = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const accessToken: string = useSelector((current: IGlobalStates) => current.auth.accessToken);
  const refreshToken: string = useSelector((current: IGlobalStates) => current.auth.refreshToken);
  const id: number = useSelector((current: IGlobalStates) => current.projects.project.id);
  const navItems = (accessToken !== '') ? NAV_ITEMS.ADMIN : NAV_ITEMS.USER;

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
              onClick={handleButton}
            >
              {(accessToken !== '' && refreshToken !== '' && id > 0) ? 'Action' : 'Hire Me'}
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
