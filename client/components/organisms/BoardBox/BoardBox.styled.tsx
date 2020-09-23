import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  padding: 0 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
`;

export const Title = styled.div`
  a {
    font-size: 2rem;
    font-weight: 400;
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    &:hover {
      font-weight: 600;
      letter-spacing: -0.01rem;
    }
    // icon
    > svg {
      margin-left: 1em;
      margin-bottom: 0.3em;
      font-size: 1.4rem;
    }
  }
`;

export const ShowButton = styled.div`
  cursor: pointer;
`;
