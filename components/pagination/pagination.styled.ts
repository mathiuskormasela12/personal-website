// =========== Pagination Styles
// import all modules
import styled from 'styled-components';
import { IPaginationProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const PaginationItems = styled.div<IPaginationProps>`
  min-width: 2.3rem;
  height: 2.3rem;
  padding: 0 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  border: 1px solid ${Colors.line};
  border-radius: 999px;
  margin-right: 0.4rem;
  background-color: ${({ active }) => (active ? Colors.dark : Colors.surface)};
  color: ${({ active }) => (active ? Colors.background : Colors.light)};
  opacity: ${({ disabled }) => (disabled ? 0.45 : 1)};

  &:last-child {
    margin-right: 0;
  }

  ${({ disabled, active }) =>
    !disabled && !active
      ? `
        &:hover {
          cursor: pointer;
          color: ${Colors.dark};
          border-color: ${Colors.inputBorder};
        }
      `
      : ''}
`;
