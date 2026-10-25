// =========== LongText Style
// import all modules
import styled from 'styled-components';
import { ILongTextProps } from '../../interfaces';
import { Colors, Fonts } from '../../themes';

export const TextArea = styled.textarea<ILongTextProps>`
  color: ${Colors.light};
  font-size: 1rem;
  outline: none;
  font-family: ${Fonts.base};
  appearance: none;
  background-color: white;
  border: 1px solid
    ${({ invalidMessage }) => (invalidMessage ? Colors.danger : Colors.inputBorder)};
  height: 8.5em;
  width: 100%;
  padding: 1em 0 0 0.8em;
  border-radius: 0.3em;
  resize: none;
`;
