import NextLink from 'next/link';
import styled from 'styled-components';
import { Colors } from '../../themes';

export const Footer = styled.footer`
  background-color: ${Colors.footerColor};
  padding: 2.8rem 0 1.4rem;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 0 1.5rem;

  @media (min-width: 1201px) {
    width: 80%;
    padding: 0;
  }
`;

export const Top = styled.div`
  display: grid;
  gap: 2rem;
  text-align: center;

  @media (min-width: 1201px) {
    grid-template-columns: 1.4fr 1fr 1.1fr;
    gap: 3rem;
    text-align: left;
  }
`;

export const Brand = styled.p`
  color: ${Colors.primary};
  font-size: 1.8rem;
`;

export const Tagline = styled.p`
  color: ${Colors.light};
  margin-top: 0.5rem;
  line-height: 1.5;
`;

export const ColumnTitle = styled.p`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${Colors.light};
  margin-bottom: 0.8rem;
`;

export const QuickLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem 1.2rem;

  @media (min-width: 1201px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.6rem;
  }
`;

export const QuickLink = styled(NextLink)`
  color: ${Colors.thinPrimary};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    color: ${Colors.primary};
  }
`;

export const Social = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 1201px) {
    justify-content: flex-start;
  }
`;

export const Bottom = styled.div`
  border-top: 1px solid #e3e6ee;
  margin-top: 2rem;
  padding-top: 1.1rem;
  text-align: center;
  color: ${Colors.light};
  font-size: 0.9rem;
  line-height: 1.6;

  & > p {
    display: block;
  }

  @media (min-width: 1201px) {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
`;
