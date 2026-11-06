import styled from 'styled-components';
import { Colors } from '../../themes';

export const Points = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

export const Point = styled.li`
  display: grid;
  grid-template-columns: 1.2rem minmax(0, 1fr) 2.5rem;
  align-items: center;
  column-gap: 0.6rem;

  & > svg {
    color: ${Colors.primary};
  }
`;

export const RemoveButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.6rem;
  border: 1px solid ${Colors.line};
  background: transparent;
  color: ${Colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover:not(:disabled),
  &:focus-visible {
    color: ${Colors.danger};
    border-color: ${Colors.danger};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PointError = styled.p`
  grid-column: 2 / 4;
  font-size: 0.8rem;
  color: ${Colors.danger};
  margin-top: 0.35rem;
`;

export const AddButton = styled.button`
  margin-top: 0.7rem;
  border: 1.5px dashed ${Colors.inputBorder};
  background: transparent;
  color: ${Colors.primary};
  border-radius: 0.6rem;
  padding: 0.6rem 1rem;
  font-family: inherit;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;

  &:hover:not(:disabled),
  &:focus-visible {
    border-color: ${Colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.75rem;
  color: ${Colors.faint};
  margin-top: 0.55rem;

  & > span:last-child {
    white-space: nowrap;
  }
`;
