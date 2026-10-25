import styled from 'styled-components';
import { Colors } from '../../themes';

export const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  border: none;
  border-radius: 0.7rem;
  background: transparent;
  color: ${Colors.dark};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: ${Colors.navPill};
  }
`;
