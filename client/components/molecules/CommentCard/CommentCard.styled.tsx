import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 32px 0;
  border-top: 1px solid #eaeaea;
  &:last-of-type {
    border-bottom: 1px solid #eaeaea;
  }
`;
export const Content = styled.div`
  margin-left: 16px;
  flex: 1;
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
  padding: 4px 0;
  font-size: 1.2rem;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 4px;
  > button {
    cursor: pointer;
  }
`;
