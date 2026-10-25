import styled from 'styled-components';
import { Colors } from '../themes';

export const HeroEdit = styled.div`
  background-color: white;
  min-height: 100vh;
  width: 100%;
`;

export const HeroEditFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 8.5rem 0 4rem;

  @media (min-width: 1201px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 10rem;
  }
`;

export const HeroEditPreview = styled.section`
  border: 1px solid ${Colors.shapeColor};
  border-radius: 1rem;
  padding: 1.5rem 1.25rem;
  text-align: center;

  @media (min-width: 1201px) {
    order: 2;
    position: sticky;
    top: 2rem;
    width: 48%;
    padding: 2.5rem;
    text-align: left;
  }
`;

export const HeroEditPreviewLabel = styled.p`
  color: ${Colors.light};
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
`;

export const HeroEditFormCol = styled.div`
  @media (min-width: 1201px) {
    order: 1;
    width: 42%;
  }
`;
