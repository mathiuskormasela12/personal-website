import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  position: relative;

  & > input {
    padding-right: 2.75rem;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 2.75rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${Colors.light};
  font-size: 1.15rem;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: ${Colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: -2px;
    border-radius: 0.3em;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
