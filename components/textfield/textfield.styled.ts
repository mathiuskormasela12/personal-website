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
  background-color: white;
  border: 1px solid
    ${({ invalidMessage }) => (invalidMessage ? Colors.danger : Colors.inputBorder)};
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
