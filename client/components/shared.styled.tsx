import styled, { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { mq } from '../styles/mq';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export const Container = styled.div`
  width: 100%;
  ${mq('ph')`
    width: 640px;
    margin: 0 auto;
  `}
`;

export const Contents = styled.div<{ isMain: boolean }>`
   padding: ${(props) => (props.isMain ? '0' : '80px 16px')};
`;
