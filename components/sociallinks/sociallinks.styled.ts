import styled from 'styled-components';
import { Colors } from '../../themes';

export const List = styled.ul`
  list-style: none;
  display: flex;
  gap: 0.7rem;
`;

export const Link = styled.a`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #e3e8f2;
  color: ${Colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
  }
`;
