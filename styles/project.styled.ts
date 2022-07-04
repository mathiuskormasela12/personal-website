// ========== Project
// import all modules
import styled from 'styled-components';
import { Colors } from '../themes';

export const HeroCreateProject = styled.div`
	background-color: white;
	height: 100vh;
	width: 100%;

	@media (max-width: 920px) {
		height: auto;
	}
`;

export const HeroCreateProjectBody = styled.div`
	height: 100%;

	@media (max-width: 920px) {
		height: auto;
	}
`;

export const HeroCreateProjectFlex = styled.div`
	display: flex;
	height: 100%;

	@media (max-width: 920px) {
		height: auto;
		padding: 18vmax 0;
	}

	align-items: center;
	justify-content: space-between;
`;

export const HeroCreateProjectCol = styled.div`
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

export const HeroCreateProjectImageContainer = styled.span`
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

export const HeroCreateProjectTitle = styled.h1`
	color: ${Colors.dark};
	font-size: 2.1rem;

	@media (max-width: 1200px) {
		text-align: center;
	}
`;

export const HeroCreateProjectForm = styled.form`
	margin-top: 1.5rem;
`;

export const HeroCreateProjectLabel = styled.label`
	font-size: 1rem;
	color: ${Colors.dark};
`;

export const HeroCreateProjectControl = styled.div`
	margin-bottom: 1.2rem;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const HeroCreateProjectField = styled.div`
	margin-top: .8rem;
`;
