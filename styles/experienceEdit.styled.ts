import styled from 'styled-components';
import { ProfileEditGroupTitle } from './profileEdit.styled';
import { Colors } from '../themes';

export const ExperienceEditGroupHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 1.5rem 0 1rem;

  & > h2 {
    margin: 0;
  }

  & > span {
    color: ${Colors.faint};
    font-size: 0.8rem;
  }
`;

export const ExperienceEditFormTitle = styled(ProfileEditGroupTitle)`
  && {
    margin: 2rem 0 0;
    padding-top: 1.6rem;
    border-top: 1px solid ${Colors.line};
  }
`;

export const ExperienceEditList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const ExperienceEditRow = styled.li<{ $editing: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 1px solid
    ${({ $editing }) => ($editing ? Colors.primary : Colors.line)};
  background-color: ${({ $editing }) =>
    $editing
      ? `color-mix(in srgb, ${Colors.primary} 10%, transparent)`
      : Colors.surface};
  border-radius: 0.75rem;
  padding: 0.75rem;
`;

export const ExperienceEditRowText = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ExperienceEditRowRole = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${Colors.dark};
  font-size: 0.95rem;
  overflow-wrap: anywhere;
`;

export const ExperienceEditRowMeta = styled.p`
  color: ${Colors.faint};
  font-size: 0.8rem;
  margin-top: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ExperienceEditTag = styled.span`
  flex: none;
  font-size: 0.65rem;
  color: ${Colors.primary};
  border: 1px solid ${Colors.primary};
  border-radius: 999px;
  padding: 0.05rem 0.45rem;
  letter-spacing: 0.04em;
`;

export const ExperienceEditIconButton = styled.button<{ $danger?: boolean }>`
  width: 2.2rem;
  height: 2.2rem;
  flex: none;
  border-radius: 0.6rem;
  border: 1px solid ${Colors.line};
  background: transparent;
  color: ${({ $danger }) => ($danger ? Colors.danger : Colors.light)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: ${({ $danger }) => ($danger ? Colors.danger : Colors.primary)};
  }
`;

export const ExperienceEditAddButton = styled.button`
  margin-top: 0.8rem;
  width: 100%;
  border: 1.5px dashed ${Colors.inputBorder};
  background: transparent;
  color: ${Colors.primary};
  border-radius: 0.75rem;
  padding: 0.85rem;
  font-family: inherit;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: ${Colors.primary};
  }
`;

export const ExperienceEditEmpty = styled.p`
  color: ${Colors.light};
  font-size: 0.9rem;
`;

export const ExperienceEditDates = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

export const ExperienceEditCheckbox = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: ${Colors.dark};
  font-size: 0.9rem;
  cursor: pointer;

  & > input {
    width: 1.1rem;
    height: 1.1rem;
    accent-color: ${Colors.primary};
  }
`;

export const ExperienceEditHint = styled.p`
  color: ${Colors.faint};
  font-size: 0.75rem;
  margin-top: 0.4rem;
`;

export const ExperienceEditActions = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0.8rem;
`;

export const ExperienceEditCancel = styled.button`
  border: 1px solid ${Colors.inputBorder};
  background: transparent;
  color: ${Colors.dark};
  border-radius: 0.6em;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
`;

export const ExperienceEditPreviewEmpty = styled.p`
  color: ${Colors.light};
  font-size: 0.9rem;
  line-height: 1.6;
`;
