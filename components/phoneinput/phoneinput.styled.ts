import styled from 'styled-components';
import { Colors } from '../../themes';

export const Field = styled.div<{ $invalid: boolean }>`
  display: flex;
  height: 2.5em;
  width: 100%;
  background-color: white;
  border: 1px solid
    ${({ $invalid }) => ($invalid ? Colors.danger : Colors.inputBorder)};
  border-radius: 0.3em;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding-left: 0.8em;
  border: none;
  border-left: 1px solid #e4e9f1;
  border-radius: 0 0.3em 0.3em 0;
  outline: none;
  appearance: none;
  background: transparent;
  color: ${Colors.light};
  font: inherit;
  font-size: 1rem;
`;
