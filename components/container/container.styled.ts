// ========== Container Style
// import all modules
import styled from 'styled-components';
import { IContainerProps } from '../../interfaces';

export const ContainerStyle = styled.div<IContainerProps>`
	margin: 0 auto;
	width: ${({ fluid }) => (fluid ? '100%' : 'calc(100vw - 10rem)')};
	height: ${({ inheritHeight }) => (inheritHeight ? '100%' : 'auto')};

	@media (max-width: 1200px) {
		width: ${({ fluid }) => (fluid ? '100%' : 'calc(100vw - 3.6rem)')};
	}

	${({ customSize }) => {
    if (customSize) {
      return `
				width: ${customSize.value}%;

				@media (max-width: 920px) {
					width: 90%;
				}

				@media (min-width: 920px) and (max-width: 1200px) {
					width: 70%;
				}
			`;
    }

    return '';
  }}
`;
