import styled, { css } from 'styled-components';
import { Colors, Fonts } from '../../themes';

interface IPreviewProps {
  $preview: boolean;
}

interface ITabProps {
  $active: boolean;
}

export const PHONE = '(max-width: 700px)';

const BAR = '3px';

const desktop = (rules: ReturnType<typeof css>) => css<IPreviewProps>`
  @media (min-width: 1201px) {
    ${({ $preview }) => ($preview ? '' : rules)}
  }
`;

export const Section = styled.section<IPreviewProps>`
  text-align: left;
`;

export const Heading = styled.h2<IPreviewProps>`
  color: ${Colors.dark};
  font-family: ${Fonts.bold};
  font-weight: normal;
  font-size: ${({ $preview }) => ($preview ? '2rem' : '2.4rem')};
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: ${({ $preview }) => ($preview ? '1.4rem' : '1.8rem')};

  ${desktop(css`
    font-size: 3.4rem;
    margin-bottom: 3rem;
  `)}

  @media (min-width: 701px) and (max-width: 1200px) {
    font-size: ${({ $preview }) => ($preview ? '2rem' : '2.8rem')};
  }
`;

export const Total = styled.p<IPreviewProps>`
  color: ${Colors.light};
  font-size: ${({ $preview }) => ($preview ? '0.92rem' : '1rem')};
  line-height: 1.5;
  margin: ${({ $preview }) =>
    $preview ? '-0.8rem 0 1.4rem' : '-1rem 0 1.8rem'};

  ${desktop(css`
    font-size: 1.1rem;
    margin: -1.9rem 0 3rem;
  `)}
`;

export const TotalValue = styled.strong`
  color: ${Colors.primary};
  font-family: ${Fonts.bold};
  font-weight: normal;
`;

export const Dot = styled.span`
  color: ${Colors.primary};
`;

export const Body = styled.div<IPreviewProps>`
  display: grid;
  grid-template-columns: ${({ $preview }) =>
    $preview ? '8.5rem minmax(0, 1fr)' : '10.5rem minmax(0, 1fr)'};
  column-gap: ${({ $preview }) => ($preview ? '1.8rem' : '2.5rem')};
  align-items: start;

  ${desktop(css`
    grid-template-columns: 13rem minmax(0, 1fr);
    column-gap: 4rem;
  `)}

  @media ${PHONE} {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 1.8rem;
  }
`;

export const TabsWrap = styled.div<IPreviewProps & { $fade: string }>`
  position: relative;

  @media ${PHONE} {
    margin: ${({ $preview }) => ($preview ? '0' : '0 -1.8rem')};

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 2px;
      width: 4.5rem;
      background: linear-gradient(
        to right,
        transparent,
        ${({ $fade }) => $fade}
      );
      pointer-events: none;
    }
  }
`;

export const Tabs = styled.div<IPreviewProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${BAR};
    border-radius: ${BAR};
    background-color: ${Colors.line};
  }

  @media ${PHONE} {
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;
    padding: ${({ $preview }) => ($preview ? '0' : '0 1.8rem')};

    &::-webkit-scrollbar {
      display: none;
    }

    &::before {
      left: ${({ $preview }) => ($preview ? '0' : '1.8rem')};
      right: ${({ $preview }) => ($preview ? '0' : '1.8rem')};
      top: auto;
      width: auto;
      height: 2px;
    }
  }
`;

export const Tab = styled.button<ITabProps & IPreviewProps>`
  position: relative;
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font-family: inherit;
  font-size: ${({ $preview }) => ($preview ? '0.95rem' : '1.15rem')};
  color: ${({ $active }) => ($active ? Colors.primary : Colors.light)};
  padding: ${({ $preview }) =>
    $preview ? '0.55rem 0 0.55rem 1.3rem' : '0.7rem 0 0.7rem 2.1rem'};
  cursor: pointer;
  overflow-wrap: anywhere;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${BAR};
    border-radius: ${BAR};
    background-color: ${({ $active }) =>
      $active ? Colors.primary : 'transparent'};
  }

  &:hover {
    color: ${({ $active }) => ($active ? Colors.primary : Colors.dark)};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: -2px;
    border-radius: 0.3rem;
  }

  @media ${PHONE} {
    width: auto;
    flex: none;
    white-space: nowrap;
    overflow-wrap: normal;
    font-size: ${({ $preview }) => ($preview ? '0.95rem' : '1rem')};
    padding: 0.7rem 1.1rem 0.85rem;

    &::before {
      top: auto;
      right: 0;
      width: auto;
      height: 2px;
      z-index: 1;
    }
  }
`;

export const Panel = styled.div<IPreviewProps>`
  min-height: ${({ $preview }) => ($preview ? '0' : '16rem')};

  @media ${PHONE} {
    min-height: 0;
  }
`;

export const Role = styled.article<IPreviewProps>`
  & + & {
    margin-top: ${({ $preview }) => ($preview ? '1.4rem' : '2rem')};
    padding-top: ${({ $preview }) => ($preview ? '1.4rem' : '2rem')};
    border-top: 1px solid ${Colors.line};
  }
`;

export const Title = styled.h3<IPreviewProps>`
  color: ${Colors.dark};
  font-size: ${({ $preview }) => ($preview ? '1.1rem' : '1.35rem')};
  font-weight: normal;
  line-height: 1.35;
  overflow-wrap: anywhere;

  @media ${PHONE} {
    font-size: ${({ $preview }) => ($preview ? '1.1rem' : '1.2rem')};
  }
`;

export const At = styled.span`
  color: ${Colors.primary};
`;

export const Dates = styled.p`
  color: ${Colors.faint};
  font-size: 0.85rem;
  margin-top: 0.45rem;
`;

export const Points = styled.ul<IPreviewProps>`
  list-style: none;
  margin-top: ${({ $preview }) => ($preview ? '1.1rem' : '1.6rem')};
  display: flex;
  flex-direction: column;
  gap: ${({ $preview }) => ($preview ? '0.7rem' : '0.95rem')};
`;

export const Point = styled.li<IPreviewProps>`
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr);
  column-gap: 0.85rem;
  color: ${Colors.light};
  font-size: ${({ $preview }) => ($preview ? '0.88rem' : '0.98rem')};
  line-height: 1.55;
  overflow-wrap: anywhere;

  & > svg {
    color: ${Colors.primary};
    margin-top: 0.15rem;
  }

  @media ${PHONE} {
    font-size: ${({ $preview }) => ($preview ? '0.88rem' : '0.93rem')};
  }
`;
