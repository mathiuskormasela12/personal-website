// ========== Button Style
// import all modules
import styled from 'styled-components';
import { IButtonProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Button = styled.button<IButtonProps>`
	outline: none;
	border: none;
	cursor: pointer;
	color: white;
	background-color: ${Colors.primary};
	border-radius: ${({ rounded }) => (rounded ? '2em' : '.6em')};
	padding: .9em 2.4em;

	${({ size }) => {
    if (size === 'lg') {
      return `
				font-size: 1.2rem;
			`;
    }

    if (size === 'md') {
      return `
				font-size: 1rem;
			`;
    }

    if (size === 'sm') {
      return `
				font-size: .9rem;
			`;
    }

    return '';
  }}

	${({ fluid }) => {
    if (fluid) {
      return `
				width: 100%;
			`;
    }

    return '';
  }}
`;
