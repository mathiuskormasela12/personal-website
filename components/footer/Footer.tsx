import React from 'react';
import { getCurrentYear } from '../../helpers';
import { useProfile } from '../../hooks/useProfile';
import { ContactLinks } from '../contactlinks/ContactLinks';
import { SocialLinks } from '../sociallinks/SocialLinks';
import * as Styled from './footer.styled';

const QUICK_LINKS = [
  { text: 'Home', href: '/' },
  { text: 'Projects', href: '/#projects' },
  { text: 'Skills', href: '/#skills' },
];

export const Footer: React.FC = () => {
  const year = getCurrentYear();
  const profile = useProfile();

  return (
    <Styled.Footer id="footer">
      <Styled.Container>
        <Styled.Top>
          <div>
            <Styled.Brand>{profile.name}</Styled.Brand>
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
            <ContactLinks contacts={profile} />
            <Styled.Social>
              <SocialLinks links={profile} />
            </Styled.Social>
          </div>
        </Styled.Top>
        <Styled.Bottom>
          <p>
            &copy; {profile.name} {year}
          </p>
          <p>Created with love in Jakarta</p>
        </Styled.Bottom>
      </Styled.Container>
    </Styled.Footer>
  );
};
