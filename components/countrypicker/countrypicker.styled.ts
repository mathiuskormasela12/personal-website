import styled from 'styled-components';
import { Colors } from '../../themes';

interface IOpenProps {
  $open: boolean;
}

export const Root = styled.div`
  position: relative;
  display: flex;
`;

export const Trigger = styled.button<IOpenProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0 0.7rem;
  border: none;
  border-radius: 0.3em 0 0 0.3em;
  background-color: ${({ $open }) => ($open ? '#f3f6fa' : 'transparent')};
  color: ${Colors.dark};
  font: inherit;
  font-size: 0.95rem;
  white-space: nowrap;
  cursor: pointer;

  & > svg {
    color: ${Colors.light};
  }
`;

export const Popover = styled.div`
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  z-index: 3;
  width: min(20rem, calc(100vw - 2.5rem));
  padding: 0.4rem;
  background-color: white;
  border: 1px solid #e4e9f1;
  border-radius: 0.9rem;
  box-shadow: 0 18px 40px -22px rgba(45, 67, 121, 0.45);
`;

export const Search = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.7rem;
  margin-bottom: 0.3rem;
  border-bottom: 1px solid #edf1f7;
  color: #9aa5c2;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 2rem;
  border: none;
  outline: none;
  appearance: none;
  background: transparent;
  color: ${Colors.dark};
  font: inherit;
  font-size: 0.95rem;
`;

export const List = styled.ul`
  list-style: none;
  max-height: 16rem;
  overflow-y: auto;
`;

export const Option = styled.li<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.55rem 0.7rem;
  border-radius: 0.6rem;
  color: ${Colors.dark};
  font-size: 0.92rem;
  cursor: pointer;
  outline: none;
  background-color: ${({ $selected }) => ($selected ? '#eef6ff' : 'transparent')};

  &:hover,
  &:focus {
    background-color: #f3f6fa;
  }
`;

export const Name = styled.span`
  flex: 1;
`;

export const DialCode = styled.span`
  color: ${Colors.light};
  font-size: 0.85rem;
`;

export const Empty = styled.p`
  padding: 0.7rem;
  color: ${Colors.light};
  font-size: 0.9rem;
`;
