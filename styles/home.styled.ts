// ========== Home Styles
// import all modules
import styled from 'styled-components';
import { Colors, Fonts } from '../themes';

const sectionLine = `
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${Colors.line};
`;

export const HeroHome = styled.div`
  height: auto;
  background-color: ${Colors.background};
`;

export const HeroWelcome = styled.div`
  padding: 8rem 0 4rem;

  @media (min-width: 1201px) {
    padding: 9.5rem 0 5.5rem;
  }
`;

export const HeroHomeRow = styled.div`
  display: grid;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: 1201px) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
  }
`;

export const HeroHomeTitle = styled.h1`
  color: ${Colors.dark};
  font-size: 2.35rem;
  font-weight: normal;
  line-height: 1.2;
  overflow-wrap: anywhere;

  @media (min-width: 1201px) {
    font-size: 3.4rem;
  }

  &:is(h2) {
    font-size: 2rem;
  }
`;

export const HeroHomeSubtitle = styled.p`
  color: ${Colors.light};
  font-family: ${Fonts.light};
  font-size: 1.08rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
  margin: 1.5rem 0 1.8rem;
  max-width: 30rem;
`;

export const PrimaryText = styled.span`
  color: ${Colors.primary};
`;

export const HeroHomeWelcomeContent = styled.div`
  min-width: 0;
`;

export const HomeSkills = styled.section`
  ${sectionLine}
  padding: 4.5rem 0;

  @media (min-width: 1201px) {
    padding: 6rem 0;
  }
`;

export const HeroProject = styled.section`
  ${sectionLine}
  padding: 4.5rem 0;

  @media (min-width: 1201px) {
    padding: 6rem 0;
  }
`;

export const HeroProjectHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2.2rem;

  @media (min-width: 1201px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

export const SectionTitle = styled.h2`
  color: ${Colors.dark};
  font-size: 1.9rem;
  font-weight: normal;

  @media (min-width: 1201px) {
    font-size: 2.4rem;
  }
`;

export const SectionLead = styled.p`
  color: ${Colors.light};
  font-family: ${Fonts.light};
  line-height: 1.6;
`;

export const HeroProjectMain = styled.div``;

export const HeroProjectMainRow = styled.div`
  display: grid;
  gap: 1.2rem;
  margin-bottom: 2.2rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1201px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
