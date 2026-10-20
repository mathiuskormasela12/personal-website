// ========== Card Styles
// import all modules
import styled from 'styled-components';
import NextImage from 'next/image';
import { ISkillBadgeProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Card = styled.figure`
	height: auto;
	cursor: pointer;
`;

export const ImageContainer = styled.span`
	margin: 32px auto;
	box-sizing: content-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > span {
		position: relative !important;
		top: 0 !important;
		height: 4rem !important;
	}
`;

export const CardTitle = styled.figcaption`
	font-weight: bold;
	font-size: 1.3rem;
	margin-bottom: .4rem;
`;

export const CardDescription = styled.p``;

export const CardTechnology = styled.div`
	margin-top: 1rem;
`;

export const SkillBadge = styled.span<ISkillBadgeProps>`
	display: inline-block;
	font-size: .9rem;
	padding: .4em .8em;
	border-radius: 1.2em;
	font-weight: bold;
	margin-right: .4rem;
	margin-bottom: .8rem;

	&:last-child {
		margin-right: 0;
	}

	${(props) => {
    if (props.variant === 'primary') {
      return `
				background-color: ${Colors.lightBlue};
				color: ${Colors.lightBlueText};
			`;
    }

    if (props.variant === 'secondary') {
      return `
				background-color: ${Colors.lightPurple};
				color: ${Colors.lightPurpleText};
			`;
    }

    if (props.variant === 'tertiary') {
      return `
				background-color: ${Colors.lightGreen};
				color: ${Colors.lightGreenText};
			`;
    }

    if (props.variant === 'quaternary') {
      return `
				background-color: ${Colors.lightOrange};
				color: ${Colors.lightOrangeText};
			`;
    }

    return '';
  }}
`;

export const Image = styled(NextImage)`
	display: block;
	width: 100%;
	height: auto;
	aspect-ratio: 370 / 220;
	border-radius: 1.8rem;
`;
