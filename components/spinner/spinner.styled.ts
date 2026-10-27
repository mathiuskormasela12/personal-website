import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%,
  100% {
    opacity: 0.35;
  }

  50% {
    opacity: 1;
  }
`;

export const Ring = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    border-right-color: currentColor;
    animation: ${pulse} 1.6s ease-in-out infinite;
  }
`;
