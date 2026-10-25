import styled, { css } from 'styled-components';
import { Colors } from '../../themes';

interface IPreviewProps {
  $preview: boolean;
}

const desktop = (rules: ReturnType<typeof css>) => css<IPreviewProps>`
  @media (min-width: 1201px) {
    ${({ $preview }) => ($preview ? '' : rules)}
  }
`;

export const Section = styled.section<IPreviewProps>`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${desktop(css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  `)}
`;

export const Text = styled.div<IPreviewProps>`
  text-align: ${({ $preview }) => ($preview ? 'left' : 'center')};

  ${desktop(css`
    width: 42%;
    text-align: left;
  `)}
`;

export const Heading = styled.h2<IPreviewProps>`
  color: ${Colors.dark};
  font-size: ${({ $preview }) => ($preview ? '1.6rem' : '2.1rem')};
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 1rem;

  ${desktop(css`
    font-size: 2.6rem;
  `)}
`;

export const Description = styled.p`
  color: ${Colors.light};
  line-height: 1.6;
  white-space: pre-line;
  overflow-wrap: anywhere;
`;

export const Panel = styled.div<IPreviewProps>`
  background-color: #f3f6fa;
  border-radius: 1.25rem;
  padding: 2rem 0.75rem 4.4rem;

  ${desktop(css`
    width: 52%;
    padding: 2.6rem 2rem 5.6rem;
  `)}
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  align-items: start;
`;

export const Column = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;

  &:nth-child(even) {
    transform: translateY(2.4rem);
  }

  @media (min-width: 1201px) {
    gap: 1.4rem;

    &:nth-child(even) {
      transform: translateY(3rem);
    }
  }
`;
