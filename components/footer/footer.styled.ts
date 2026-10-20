// =========== Footer Styles
// import al modules
import styled from 'styled-components';
import { IListItemsProps } from '../../interfaces';
import { Colors } from '../../themes';

export const Footer = styled.footer`
  background-color: ${Colors.footerColor};
  padding: 4rem 0 2.5rem 0;
`;

export const FooterContainer = styled.footer`
  margin: 0 auto;
  width: 80%;
`;

export const FooterTitle = styled.p`
  color: ${Colors.thinPrimary};
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 4rem 0;

  @media (max-width: 600px) {
    justify-content: space-between;
  }

  @media (min-width: 600px) and (max-width: 920px) {
    justify-content: flex-start;
  }
`;

export const FooterContentCol = styled.div`
  @media (max-width: 600px) {
    width: 45%;
    margin-bottom: 2rem;
  }

  @media (min-width: 600px) and (max-width: 920px) {
    width: 25%;
    margin-bottom: 2rem;
  }
`;

export const ListTitle = styled.p`
  color: ${Colors.thinPrimary};
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const ListContent = styled.ul`
  list-style: none;
  line-height: 1.7rem;
`;

export const ListItems = styled.li<IListItemsProps>`
  list-style: none;
  color: ${Colors.thinPrimary};
  font-size: 1rem;

  ${(props) => {
    if (props.pointer) {
      return `
				cursor: pointer;
			`;
    }

    return '';
  }}
`;
