// =========== TextField Style
// import all modules
import styled from 'styled-components';
import { ITextFieldProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Input = styled.input<ITextFieldProps>`
	color: ${Colors.light};
	font-size: 1rem;
	outline: none;
	border: ${({ invalidMessage }) => (invalidMessage ? '1px' : '.5px')} solid ${({ invalidMessage }) => (invalidMessage ? Colors.danger : Colors.light)};
	height: 2.5em;
	width: 100%;
	padding-left: .8em;
	border-radius: .3em;
`;

export const ErrorMessage = styled.p`
	font-size: .8rem;
	color: ${Colors.danger};
	margin-top: .3rem;
`;
