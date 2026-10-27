import styled, { keyframes } from 'styled-components';
import { Colors } from '../../themes';

const shine = keyframes`
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(100%);
  }
`;

export const Bar = styled.span<{
  $width: string;
  $height: string;
  $radius: string;
}>`
  display: block;
  position: relative;
  overflow: hidden;
  width: ${({ $width }) => $width};
  max-width: 100%;
  height: ${({ $height }) => $height};
  border-radius: ${({ $radius }) => $radius};
  background-color: ${Colors.soft};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      ${Colors.line},
      transparent
    );
    animation: ${shine} 1.6s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;
