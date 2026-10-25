import styled from 'styled-components';
import { Colors } from '../../themes';

export const Field = styled.div<{ $invalid: boolean }>`
  display: flex;
  height: 2.5em;
  width: 100%;
  background-color: ${Colors.surface};
  border-width: 1px;
  border-style: solid;
  ${({ $invalid }) => {
    const color = $invalid ? Colors.danger : Colors.inputBorder;
    return `
      border-top-color: ${color};
      border-right-color: ${color};
      border-bottom-color: ${color};
      border-left-color: ${color};
    `;
  }}
  border-radius: 0.3em;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding-left: 0.8em;
  border: none;
  border-left: 1px solid ${Colors.line};
  border-radius: 0 0.3em 0.3em 0;
  outline: none;
  appearance: none;
  background: transparent;
  color: ${Colors.light};
  font: inherit;
  font-size: 1rem;
`;
