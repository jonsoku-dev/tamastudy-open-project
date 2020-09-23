import styled from 'styled-components';

export const Wrapper = styled.div<{ size: number; hasCursor: boolean }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  overflow: hidden;
  padding: 0.6em;
  ${(props) => props.hasCursor && 'cursor: pointer;'}
  > svg {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  margin-right: 8px;
`;
