// =========== Pagination Styles
// import all modules
import styled from 'styled-components';
import { IPaginationProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Pagination = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
`;

export const PaginationItems = styled.div<IPaginationProps>`
	width: 2.5em;
	line-height: 2.5em;
	text-align: center;
	font-size: 1rem;
	font-weight: bold;
	color: ${Colors.dark};
	border-radius: 50%;
	margin-right: .5rem;

	&:last-child {
		margin-right: 0;
	}

	${({ disabled, active }) => {
    let styles = '';

    if (!disabled) {
      styles += `
				&:hover {
					cursor: pointer;
					background-color: ${Colors.shapeColor};
				}
			`;
    }

    if (active) {
      styles += `
					cursor: pointer;
					background-color: ${Colors.shapeColor};
			`;
    }

    return styles;
  }}
`;
