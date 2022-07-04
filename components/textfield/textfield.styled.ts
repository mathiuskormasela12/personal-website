// =========== TextField Style
// import all modules
import styled from 'styled-components';
import { ITextFieldProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Input = styled.input<ITextFieldProps>`
	color: ${Colors.light};
	font-size: 1rem;
	outline: none;
	border: .5px solid ${Colors.light};
	height: 2.5em;
	width: 100%;
	padding-left: .8em;
	border-radius: .3em;
`;
