import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-gap: 16px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
