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
  height: 8.5em;
  width: 100%;
  padding: 1em 0 0 0.8em;
  border-radius: 0.3em;
  resize: none;
`;
