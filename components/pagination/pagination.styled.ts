// =========== Pagination Styles
// import all modules
import styled from 'styled-components';
import { IPaginationProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Pagination = styled.div`
	display: flex;
	justify-content: center;
`;

export const PaginationItems = styled.div<IPaginationProps>`
	width: 2.5em;
	line-height: 2.5em;
	text-align: center;
	font-size: 1rem;
	font-weight: bold;
	color: ${Colors.dark};
	border-radius: 50%;

	${({ disabled, active }) => {
    if (!disabled) {
      return `
				&:hover {
					cursor: pointer;
					background-color: ${Colors.shapeColor};
				}
			`;
    }

    if (active) {
      return `
					cursor: pointer;
					background-color: ${Colors.shapeColor};
			`;
    }

    return '';
  }}
`;
