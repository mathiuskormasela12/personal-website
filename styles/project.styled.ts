// ========== Project
// import all modules
import styled from 'styled-components';
import { Colors } from '../themes';
import { HeroEditPreview } from './heroEdit.styled';

export const HeroCreateProject = styled.div`
  background-color: ${Colors.background};
  height: 125vh;
  width: 100%;

  @media (max-width: 1024px) {
    height: auto;
  }
`;

export const HeroCreateProjectBody = styled.div`
  height: 100%;

  @media (min-width: 1201px) {
    padding-top: 4.8rem;
  }

  @media (max-width: 1024px) {
    height: auto;
  }
`;

export const HeroCreateProjectFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  @media (max-width: 920px) {
    height: auto;
    padding: 18vmax 0;
  }

  @media (min-width: 920px) and (max-width: 1024px) {
    height: auto;
    padding: 10vmax 0;
  }

  @media (max-width: 1200px) {
    gap: 2.5rem;
  }

  @media (min-width: 1201px) {
    gap: 3rem;
  }

  align-items: center;
  justify-content: space-between;
`;

export const HeroCreateProjectCol = styled.div`
  flex: 1 1 0;
  min-width: 0;

  @media (max-width: 1200px) {
    flex: 0 0 100%;
  }
`;

export const HeroCreateProjectPreviewCol = styled(HeroCreateProjectCol)`
  @media (min-width: 1201px) {
    flex: 0 0 360px;
  }
`;

export const HeroCreateProjectPreview = styled(HeroEditPreview)`
  @media (min-width: 1201px) {
    width: 100%;
    order: 0;
  }
`;

export const HeroCreateProjectTitle = styled.h1`
  color: ${Colors.dark};
  font-size: 2.1rem;
  font-weight: normal;

  @media (max-width: 1200px) {
    text-align: center;
  }
`;

export const HeroCreateProjectForm = styled.form`
  margin-top: 1.5rem;
`;

export const HeroCreateProjectLabel = styled.label`
  font-size: 1rem;
  color: ${Colors.dark};
`;

export const HeroCreateProjectControl = styled.div`
  margin-bottom: 1.2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const HeroCreateProjectField = styled.div`
  margin-top: 0.8rem;
`;

export const File = styled.input`
  display: none;
`;

export const FileContainer = styled.label`
  display: flex;
  cursor: pointer;
  align-items: center;
  color: ${Colors.light};
  background-color: ${Colors.surface};
  font-size: 1rem;
  outline: none;
  border: 1px solid ${Colors.inputBorder};
  height: 2.5em;
  width: 100%;
  padding-left: 0.8em;
  border-radius: 0.3em;
`;
