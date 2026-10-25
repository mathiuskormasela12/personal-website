import styled from 'styled-components';
import { Colors } from '../themes';

interface IIllustrationFrameProps {
  $paper?: boolean;
}

export const IllustrationFrame = styled.div<IIllustrationFrameProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  border: 1px solid ${Colors.line};
  border-radius: 1.5rem;
  background-color: ${Colors.soft};

  & > img {
    width: 100%;
    max-width: 400px;
    height: auto;
  }

  ${({ $paper }) =>
    $paper
      ? `
        [data-theme='dark'] & {
          background-color: color-mix(in srgb, ${Colors.dark} 82%, ${Colors.background});
          border-color: transparent;
        }
      `
      : ''}
`;
