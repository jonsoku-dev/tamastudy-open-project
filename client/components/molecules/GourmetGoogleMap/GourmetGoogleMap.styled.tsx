import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 400px;
  width: auto;
  position: relative;
`;

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
`;

export const MakerWrapper = styled.div<{ selected: boolean }>`
  font-size: 1.6rem;
  color: ${(props) => (props.selected ? 'red' : 'black')};
  z-index: ${(props) => (props.selected ? '99999999' : '10')};
  cursor: pointer;
  h1 {
    display: none;
  }
  &:hover h1 {
    display: block;
  }
`;
