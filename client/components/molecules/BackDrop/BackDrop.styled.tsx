import styled from 'styled-components';

export const Wrapper = styled.div`
  .menu__backdrop-enter {
    opacity: 0;
  }
  .menu__backdrop-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .menu__backdrop-exit {
    opacity: 1;
  }
  .menu__backdrop-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

export const Content = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 20000;
`;
