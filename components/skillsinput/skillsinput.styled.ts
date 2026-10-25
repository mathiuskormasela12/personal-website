import styled from 'styled-components';
import { Colors } from '../../themes';

export const Pills = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.8rem;
`;

export const Pill = styled.li`
  list-style: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: white;
  border: 1px solid #e4e9f1;
  color: ${Colors.dark};
  border-radius: 2em;
  padding: 0.28rem 0.35rem;
  font-size: 0.9rem;
`;

export const PillLogo = styled.span`
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 50%;
  background-color: #f3f6fa;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.62rem;
  color: ${Colors.light};
`;

export const RemoveButton = styled.button`
  width: 1.4rem;
  height: 1.4rem;
  border: none;
  border-radius: 50%;
  background-color: #f3f6fa;
  color: ${Colors.light};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: ${Colors.danger};
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 0.6rem;

  & > input {
    flex: 1;
    min-width: 0;
  }

  & > button {
    padding: 0 1.4rem;
  }
`;

export const Hint = styled.p`
  font-size: 0.8rem;
  color: ${Colors.light};
  margin-top: 0.45rem;
`;
