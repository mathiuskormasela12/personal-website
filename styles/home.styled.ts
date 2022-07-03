// ========== Home Styles
// import all modules
import styled from 'styled-components';
import { IBalloonProps, IHeroProjectsMainColProps } from '../interfaces';
import { Colors } from '../themes';

export const HeroHome = styled.div`
	height: auto;
	background-color: white;
`;

export const HeroWelcome = styled.div`
	height: calc(100vh - 6.4rem);

	@media (max-width: 768px) and (orientation: landscape) {
		height: 100vh;
	}
`;

export const HeroHomeRow = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
`;

export const HeroHomeCol = styled.div`
	flex: 2;
	position: relative;

	@media (max-width: 1200px) {
		text-align: center;
	}

	&:last-child {
		flex: 3;

		@media (max-width: 1200px) {
			display: none;
		}
	}
`;

export const HeroHomeTitle = styled.h1`
	color: ${Colors.dark};
	font-size: 2.4rem;
	font-weight: normal;
	word-wrap: break-word;
`;

export const HeroHomeSubtitle = styled.p`
	color: ${Colors.dark};
	font-size: 1rem;
	word-wrap: break-word;
	margin: 1rem 0 1.2rem 0;
	line-height: 1.5em;
`;

export const PrimaryText = styled.span`
	color: ${Colors.primary};
`;

export const HeroHomeWelcomeContent = styled.div`
	margin-left: 3.6rem;

	@media (min-width: 1200px) {
		width: 24rem;
	}

	@media (max-width: 1200px) {
		margin-left: 0;
	}
`;

export const BalloonContainer = styled.span<IBalloonProps>`
	margin: 32px auto;
	box-sizing: content-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;

	@media (max-width: 1300px) {
		display: none;
	}

	${(props) => {
    let styles = '';

    if (!props.customPosition && props.top) {
      styles += `
							top: 0 !important;
						`;
    }

    if (!props.customPosition && props.bottom) {
      styles += `
							bottom: 0 !important;

							@media (max-width: 920px) {
								bottom: -4.5rem !important;
							}
						`;
    }

    if (!props.customPosition && props.left) {
      styles += `
							left: 0 !important;
						`;
    }

    if (!props.customPosition && props.right) {
      styles += `
							right: 0 !important;
						`;
    }

    if (props.rotate > 0) {
      styles += `
							transform: rotate(${props.rotate}deg);
						`;
    }

    if (props.hiddenWhenSize > 0) {
      styles += `
				@media (max-width: ${props.hiddenWhenSize}px) {
					display: none !important;
				}
			`;
    }

    if (props.customPosition) {
      styles += `
				${Object.keys(props.customPosition).map((item, index) => {
    if (props.customPosition) {
      return `${item}: ${Object.values(props.customPosition)[index]}rem`;
    }
    return '';
  }).join(' !important;')}
			`;
    }

    return styles;
  }}
`;

export const ImageContainer = styled.span`
	margin: 32px auto;
	box-sizing: content-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > span {
		position: absolute !important;
		right: 3.5rem !important;
	}
`;

export const HeroProject = styled.div`
	padding: 0 0 2rem 0;
`;

export const HeroProjectHeader = styled.header`
	text-align: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	position: relative;

	& > h1 {
		width: 20rem;
	}

	& > p {
		width: 10rem;
	}
`;

export const HeroProjectMain = styled.main`
	margin-top: 2rem;
`;

export const HeroProjectMainRow = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const HeroProjectMainCol = styled.div<IHeroProjectsMainColProps>`
	width: 29%;
	margin-right: auto;

	@media (min-width: 1200px) {
		&:nth-child(3n + 0) {
			margin-right: 0 !important;
		}
	
		${({ count }) => {
    if (count % 3 === 2) {
      return `
					&:nth-child(${count - 1}) {
						margin-right: 6% !important;
					}
				`;
    }

    return '';
  }}
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		&:nth-child(2n + 0) {
			margin-right: 0 !important;
		}
	
		${({ count }) => {
    if (count % 2 === 2) {
      return `
						&:nth-child(${count - 1}) {
							margin-right: 2% !important;
						}
					`;
    }

    return '';
  }}
	}
	
	&:not(&:last-child) {
		margin-bottom: 2.2rem;
	}

	@media (max-width: 600px) {
		width: 100%;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		width: 48%;
	}
`;

export const Pagination = styled.div`
	display: flex;
	justify-content: center;
`;

export const PaginationItems = styled.div`
	width: 2.5em;
	line-height: 2.5em;
	text-align: center;
	font-size: 1rem;
	color: ${Colors.dark};
	cursor: pointer;
	border-radius: 50%;

	&:hover {
		background-color: ${Colors.shapeColor};
	}
`;
