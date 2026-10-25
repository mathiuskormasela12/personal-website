// ========== Card Styles
// import all modules
import styled from 'styled-components';
import NextImage from 'next/image';
import { Colors, Fonts } from '../../themes';

export const Card = styled.article`
  position: relative;
  height: 100%;
  padding: 0.7rem 0.7rem 1.2rem;
  border-width: 1px;
  border-style: solid;
  border-top-color: ${Colors.line};
  border-right-color: ${Colors.line};
  border-bottom-color: ${Colors.line};
  border-left-color: ${Colors.line};
  border-radius: 1.2rem;
  background-color: ${Colors.surface};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${Colors.inputBorder};
  }
`;

export const Image = styled(NextImage)`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 370 / 220;
  object-fit: cover;
  border-radius: 0.8rem;
  background-color: ${Colors.soft};
`;

export const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 1rem 0.5rem 0.7rem;
`;

export const Tag = styled.li`
  color: ${Colors.light};
  font-size: 0.75rem;
  border: 1px solid ${Colors.line};
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
`;

export const CardTitle = styled.h3`
  color: ${Colors.dark};
  font-size: 1.12rem;
  font-weight: normal;
  margin: 0 0.5rem;
`;

export const CardDescription = styled.p`
  color: ${Colors.light};
  font-family: ${Fonts.light};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0.45rem 3.2rem 0 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const Arrow = styled.span`
  position: absolute;
  right: 1rem;
  bottom: 1.1rem;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Colors.line};
  border-radius: 0.7rem;
  background-color: ${Colors.soft};
  color: ${Colors.dark};
`;
