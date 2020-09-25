import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 32px 0;
  border-top: 1px solid #eaeaea;
  &:last-of-type {
    border-bottom: 1px solid #eaeaea;
  }
`;
export const Reply = styled.div`
  transform: rotateY(180deg) scaleY(-1);
  padding: 0 32px;
`;
export const Content = styled.div`
  margin: 0 16px;
  flex: 1;
  width: 0;
`;
export const Name = styled.h5`
  padding: 4px 0;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  span {
    font-size: 0.8rem;
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.6);
  }
`;
export const Body = styled.p`
  flex: 1;
  padding: 4px 0;
  font-size: 1.2rem;
  overflow: hidden;
  word-wrap: break-word;
  width: 100%;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 4px;
  > button {
    cursor: pointer;
  }
`;
