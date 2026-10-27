// ========== Detail Styles
// import all modules
import styled, { css } from 'styled-components';
import NextImage from 'next/image';
import { Colors, Fonts } from '../themes';

export const HeroDetail = styled.div`
  background-color: ${Colors.background};
  min-height: 100vh;
  width: 100%;
`;

export const HeroDetailBody = styled.div`
  padding: 8rem 0 5rem;

  @media (min-width: 1201px) {
    padding: 9.5rem 0 6rem;
  }
`;

export const HeroDetailArticle = styled.article`
  max-width: 48rem;
  margin: 0 auto;
`;

export const HeroDetailTitle = styled.h1`
  color: ${Colors.dark};
  font-size: 2.1rem;
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 1.6rem;

  @media (min-width: 1201px) {
    font-size: 2.6rem;
  }
`;

const pictureFrame = css`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 550 / 320;
  object-fit: contain;
  border-width: 1px;
  border-style: solid;
  border-top-color: ${Colors.line};
  border-right-color: ${Colors.line};
  border-bottom-color: ${Colors.line};
  border-left-color: ${Colors.line};
  border-radius: 1.2rem;
  background-color: ${Colors.soft};
`;

export const HeroDetailImage = styled(NextImage)`
  ${pictureFrame}
`;

export const HeroDetailEmptyImage = styled.div`
  ${pictureFrame}
`;

export const HeroDetailMissing = styled.p`
  color: ${Colors.light};
  font-family: ${Fonts.light};
  font-size: 1.05rem;
  line-height: 1.75;
`;

export const HeroDetailText = styled.p`
  margin-top: 1.6rem;
  color: ${Colors.light};
  font-family: ${Fonts.light};
  font-size: 1.05rem;
  line-height: 1.75;
  text-align: left;
  white-space: pre-line;
`;
