import styled from 'styled-components';
import { Colors } from '../../themes';

export const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

export const Tile = styled.span`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 0.9rem;
  background-color: white;
  border: 1px solid #e4e9f1;
  box-shadow: 0 2px 0 #e4e9f1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  @media (min-width: 1201px) {
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 1.1rem;
  }
`;

export const Initials = styled.span`
  font-size: 1rem;
  color: ${Colors.light};
`;

export const Caption = styled.span`
  font-size: 0.7rem;
  color: ${Colors.light};
  white-space: nowrap;

  @media (min-width: 1201px) {
    font-size: 0.78rem;
  }
`;
