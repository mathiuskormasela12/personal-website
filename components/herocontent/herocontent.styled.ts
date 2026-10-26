import styled from 'styled-components';
import { Colors } from '../../themes';

export const PreviewLink = styled.p`
  color: ${Colors.light};
  font-size: 0.85rem;
  margin-top: 0.8rem;
  overflow-wrap: anywhere;
`;

export const Highlight = styled.span`
  color: ${Colors.primary};
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-color: ${Colors.primary};
  text-decoration-thickness: 2px;
  text-underline-offset: 0.3em;
  text-decoration-skip-ink: none;
`;
