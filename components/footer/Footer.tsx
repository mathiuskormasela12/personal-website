import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import { getCurrentYear } from '../../helpers';
import { useProfile } from '../../hooks/useProfile';
import { SocialLinks } from '../sociallinks/SocialLinks';
import * as Styled from './footer.styled';

const QUICK_LINKS = [
  { text: 'Home', href: '/' },
  { text: 'Projects', href: '/#projects' },
  { text: 'Skills', href: '/#skills' },
];

const EMAIL = 'mathiuskormasela12@gmail.com';
const PHONE = { text: '+62 811 1906 204', href: 'tel:+628111906204' };

export const Footer: React.FC = () => {
  const year = getCurrentYear();
  const profile = useProfile();

  return (
    <Styled.Footer id="footer">
      <Styled.Container>
        <Styled.Top>
          <div>
            <Styled.Brand>Mathius</Styled.Brand>
            <Styled.Tagline>My personal website.</Styled.Tagline>
            <Styled.Tagline>
              Let&apos;s write our future with code.
            </Styled.Tagline>
          </div>
          <nav aria-label="Quick links">
            <Styled.ColumnTitle>Quick links</Styled.ColumnTitle>
            <Styled.QuickLinks>
              {QUICK_LINKS.map(({ text, href }) => (
                <li key={href}>
                  <Styled.QuickLink href={href}>{text}</Styled.QuickLink>
                </li>
              ))}
            </Styled.QuickLinks>
          </nav>
          <div>
            <Styled.ColumnTitle>Contact</Styled.ColumnTitle>
            <Styled.Contacts>
              <li>
                <Styled.Contact href={`mailto:${EMAIL}`}>
                  <FiMail aria-hidden />
                  {EMAIL}
                </Styled.Contact>
              </li>
              <li>
                <Styled.Contact href={PHONE.href}>
                  <FiPhone aria-hidden />
                  {PHONE.text}
                </Styled.Contact>
              </li>
            </Styled.Contacts>
            <Styled.Social>
              <SocialLinks links={profile} />
            </Styled.Social>
          </div>
        </Styled.Top>
        <Styled.Bottom>
          <p>&copy; Mathius {year}</p>
          <p>Created with love in Jakarta</p>
        </Styled.Bottom>
      </Styled.Container>
    </Styled.Footer>
  );
};
