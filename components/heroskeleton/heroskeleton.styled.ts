import styled from 'styled-components';

export const Title = styled.div`
  container-type: inline-size;
`;

export const Line = styled.span`
  display: flex;
  align-items: center;
  height: 1lh;
`;

export const SecondTitleLine = styled(Line)`
  @container (min-width: 13.25em) {
    display: none;
  }
`;
