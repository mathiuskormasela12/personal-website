// ========== Placehilder Styles
// import all modules
import styled from 'styled-components';
import { Colors } from '../../themes';

export const Text = styled.h3`
	color: ${Colors.dark};
	font-size: 1.4rem;
	margin-top: 1.8rem;
	font-weight: normal;
`;

export const ImageContainer = styled.span`
	margin: 32px auto;
	box-sizing: content-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > span {
		width: 25rem !important;
		height: 25rem !important;
	}
`;
