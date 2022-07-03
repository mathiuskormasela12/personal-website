// ========== Footer
// import all modules
import React from 'react';
import * as Styled from './footer.styled';

export const Footer: React.FC = () => {
  const handleMoveToOtherWebsite = (link: string) => {
    window.location.href = link;
  };

  return (
    <Styled.Footer id="footer">
      <Styled.FooterContainer>
        <Styled.FooterTitle>
          &copy; Mathius 2022
        </Styled.FooterTitle>
        <Styled.FooterTitle>
          My Personal Website
        </Styled.FooterTitle>
        <Styled.FooterTitle>
          let&apos;s writes our future with code
        </Styled.FooterTitle>
        <Styled.FooterContent>
          <Styled.FooterContentCol>
            <Styled.ListTitle>
              Frontend Skills
            </Styled.ListTitle>
            <Styled.ListContent>
              <Styled.ListItems>
                HTML
              </Styled.ListItems>
              <Styled.ListItems>
                CSS
              </Styled.ListItems>
              <Styled.ListItems>
                Javascript
              </Styled.ListItems>
              <Styled.ListItems>
                Typescript
              </Styled.ListItems>
            </Styled.ListContent>
          </Styled.FooterContentCol>
          <Styled.FooterContentCol>
            <Styled.ListTitle>
              Backend Skills
            </Styled.ListTitle>
            <Styled.ListContent>
              <Styled.ListItems>
                Node Js
              </Styled.ListItems>
              <Styled.ListItems>
                Express Js
              </Styled.ListItems>
              <Styled.ListItems>
                Nest Js
              </Styled.ListItems>
              <Styled.ListItems>
                MySQL
              </Styled.ListItems>
              <Styled.ListItems>
                Mongodb
              </Styled.ListItems>
            </Styled.ListContent>
          </Styled.FooterContentCol>
          <Styled.FooterContentCol>
            <Styled.ListTitle>
              Social Media
            </Styled.ListTitle>
            <Styled.ListContent>
              <Styled.ListItems
                pointer
                onClick={() => handleMoveToOtherWebsite('https://www.facebook.com/mathiuskormasela/')}
              >
                Facebook
              </Styled.ListItems>
              <Styled.ListItems
                pointer
                onClick={() => handleMoveToOtherWebsite('https://twitter.com/Mathius87248424')}
              >
                Twitter
              </Styled.ListItems>
            </Styled.ListContent>
          </Styled.FooterContentCol>
          <Styled.FooterContentCol>
            <Styled.ListTitle>
              Youtube
            </Styled.ListTitle>
            <Styled.ListContent>
              <Styled.ListItems
                pointer
                onClick={() => handleMoveToOtherWebsite('https://www.youtube.com/channel/UC5eUSF2W_vAkYA6wdilJjOw/videos')}
              >
                @mathius
              </Styled.ListItems>
            </Styled.ListContent>
          </Styled.FooterContentCol>
          <Styled.FooterContentCol>
            <Styled.ListTitle>
              Contact
            </Styled.ListTitle>
            <Styled.ListContent>
              <Styled.ListItems title="mathiuskormasela12@gmail.com">
                Email
              </Styled.ListItems>
              <Styled.ListItems title="+62-811-1906-204">
                WhatsApp
              </Styled.ListItems>
            </Styled.ListContent>
          </Styled.FooterContentCol>
        </Styled.FooterContent>
        <Styled.FooterTitle>
          Created with love by Mathius
        </Styled.FooterTitle>
        <Styled.FooterTitle>
          in Jakarta 2022
        </Styled.FooterTitle>
      </Styled.FooterContainer>
    </Styled.Footer>
  );
};
