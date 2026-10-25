import styled from 'styled-components';
import { Colors } from '../../themes';

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (min-width: 1201px) {
    align-items: flex-start;
  }
`;

export const Link = styled.a`
  color: ${Colors.thinPrimary};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  overflow-wrap: anywhere;

  & > svg {
    color: ${Colors.primary};
    flex: none;
  }

  &:hover,
  &:focus-visible {
    color: ${Colors.primary};
  }
`;
