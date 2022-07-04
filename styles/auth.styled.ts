// ========== Auth
// import all modules
import styled from 'styled-components';
import { Colors } from '../themes';

export const HeroCreateAuth = styled.div`
	background-color: white;
	height: 100vh;
	width: 100%;

	@media (max-width: 1024px) {
		height: auto;
	}
`;

export const HeroCreateAuthBody = styled.div`
	height: 100%;

	@media (max-width: 1024px) {
		height: auto;
	}
`;

export const HeroCreateAuthFlex = styled.div`
	display: flex;
	height: 100%;

	@media (max-width: 920px) {
		height: auto;
		padding: 18vmax 0;
	}

	@media (min-width: 920px) and (max-width: 1024px) {
		height: auto;
		padding: 10vmax 0;
	}

	align-items: center;
	justify-content: space-between;
`;

export const HeroCreateAuthCol = styled.div`
	width: 40%;

	@media (max-width: 1200px) {
		width: 100% !important;

		&:first-child {
			display: none;
		}
	}

	&:last-child {
		width: 38%;
	}
`;

export const HeroCreateAuthImageContainer = styled.span`
	margin: 32px auto;
	box-sizing: content-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;

	& > span {
		position: absolute;
		width: 30rem !important;
		height 30rem !important;
	}
`;

export const HeroCreateAuthTitle = styled.h1`
	color: ${Colors.dark};
	font-size: 2.1rem;

	@media (max-width: 1200px) {
		text-align: center;
	}
`;

export const HeroCreateAuthForm = styled.form`
	margin-top: 1.5rem;
`;

export const HeroCreateAuthLabel = styled.label`
	font-size: 1rem;
	color: ${Colors.dark};
`;

export const HeroCreateAuthControl = styled.div`
	margin-bottom: 1.5rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const HeroCreateAuthField = styled.div`
	margin-top: .8rem;
`;

export const FormLink = styled.p`
	cursor: pointer;
	color: ${Colors.dark};
	font-size: 1rem;
	text-align: right;
`;
