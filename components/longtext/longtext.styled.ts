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
	border: .5px solid ${Colors.light};
	height: 8.5em;
	width: 100%;
	padding: 1em 0 0 .8em;
	border-radius: .3em;
	resize: none;
`;
