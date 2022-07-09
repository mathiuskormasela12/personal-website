// ========== Detail Styles
// import all modules
import styled from 'styled-components';
import { Colors } from '../themes';

export const HeroDetail = styled.div`
	background-color: white;
	min-height: 100vh;
	padding-bottom: 12rem;
	width: 100%;
`;

export const HeroDetailBody = styled.div`
	position: relative;
	top: 8rem;
`;

export const HeroDetailHeader = styled.header`
	margin-bottom: 2rem;
`;

export const HeroDetailMain = styled.main`
	padding-bottom: 2rem;
`;

export const HeroDetailTitle = styled.h1`
	text-align: center;
	color: ${Colors.dark};
	font-size: 2.5rem;
	text-transform: capitalize;
`;

export const HeroDetailText = styled.p`
	margin-top: 1rem;
	color: ${Colors.dark};
	line-height: 1.5rem;
	text-align: justify;
`;

export const ImageContainerHeroDetailFlex = styled.div`
	display: flex;
	justify-content: center;
`;

export const ImageContainerHeroDetail = styled.span`
	margin: 32px auto;
	box-sizing: content-box;
	display: block;

	& > span {
		border-radius: 1.8rem;
		width: 38rem !important;
		height: 22rem !important;

		@media (max-width: 1024px) {
			width: 90vw !important;
		}
	}
`;
