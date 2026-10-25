import styled from 'styled-components';
import { Colors } from '../themes';

export const ProfileEditGroupTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: normal;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${Colors.light};
  margin: 2rem 0 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid #edf1f7;

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
`;

export const ProfileEditLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 1rem;
  color: ${Colors.dark};
`;

export const ProfileEditPreviewFooter = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.8rem;
  background-color: ${Colors.footerColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  color: ${Colors.light};
  font-size: 0.8rem;
`;
