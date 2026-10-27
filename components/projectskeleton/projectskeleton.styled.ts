import styled from 'styled-components';
import { Colors } from '../../themes';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  margin-bottom: 1.6rem;
`;

export const Picture = styled.div`
  width: 100%;
  aspect-ratio: 550 / 320;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: ${Colors.line};
  border-radius: 1.2rem;
  background-color: ${Colors.soft};
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 1rem 0.5rem 0.7rem;
`;

export const Lines = styled.div`
  display: grid;
  gap: 0.6rem;
  margin-top: 1.6rem;
`;
