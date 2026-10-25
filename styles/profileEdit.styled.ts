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

export const ProfileEditPreviewNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 1rem;
  margin-bottom: 1.3rem;
  border: 1px solid #edf1f7;
  border-radius: 0.8rem;
`;

export const ProfileEditPreviewBrand = styled.p`
  color: ${Colors.primary};
  font-size: 1.4rem;
  overflow-wrap: anywhere;
`;

export const ProfileEditPreviewNavLinks = styled.span`
  color: ${Colors.light};
  font-size: 0.75rem;
  white-space: nowrap;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const ProfileEditPreviewMenu = styled.span`
  display: none;
  color: ${Colors.dark};

  @media (max-width: 1200px) {
    display: inline-flex;
  }
`;

export const ProfileEditPreviewFooter = styled.div`
  margin-top: 1.5rem;
  padding: 1.1rem 1.2rem;
  border-radius: 0.8rem;
  background-color: ${Colors.footerColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  text-align: center;
  color: ${Colors.light};
  font-size: 0.85rem;

  & > ul {
    margin-bottom: 0;
  }

  @media (min-width: 1201px) {
    align-items: flex-start;
    text-align: left;
  }
`;

export const ProfileEditPreviewCopyright = styled.p`
  align-self: stretch;
  padding-top: 0.7rem;
  border-top: 1px solid #e3e6ee;
  font-size: 0.78rem;
`;
