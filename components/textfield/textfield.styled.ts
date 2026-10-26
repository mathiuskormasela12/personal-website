// =========== TextField Style
// import all modules
import styled from 'styled-components';
import { ITextFieldProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Input = styled.input<ITextFieldProps>`
  color: ${Colors.light};
  font-size: 1rem;
  outline: none;
  appearance: none;
  background-color: ${Colors.surface};
  border-width: 1px;
  border-style: solid;
  ${({ invalidMessage }) => {
    const color = invalidMessage ? Colors.danger : Colors.inputBorder;
    return `
      border-top-color: ${color};
      border-right-color: ${color};
      border-bottom-color: ${color};
      border-left-color: ${color};
    `;
  }}
  height: 2.5em;
  width: 100%;
  padding-left: 0.8em;
  border-radius: 0.3em;
`;

export const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: ${Colors.danger};
  margin-top: 0.3rem;
`;
