import styled from 'styled-components';

export const Wrapper = styled.div<{ isMain: boolean }>`
  display: grid;
  grid-template-columns: 1fr 7fr 1fr 4fr;
  padding: 32px 0;
  border-top: 1px solid #eaeaea;
  transition: all 200ms;
  cursor: pointer;
  grid-gap: 16px;
  ${(props) => props.isMain && 'font-size: 80%'};
  &:last-of-type {
    border-bottom: 1px solid #eaeaea;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    margin-top: 4px;
    font-size: 1.2em;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 16px;
`;

export const Category = styled.h5`
  font-size: 1.2em;
  font-weight: 400;
`;

export const MainTitle = styled.h3`
  margin-top: 4px;
  font-size: 2em;
  font-weight: 600;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

export const View = styled(Comment)``;

export const User = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
`;

export const Info = styled.div`
  flex: 1;
  margin-left: 8px;
  display: grid;
  grid-gap: 4px;
  > h3 {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    font-size: 1.4rem;
  }
  > p {
    font-size: 1.2em;
  }
`;
