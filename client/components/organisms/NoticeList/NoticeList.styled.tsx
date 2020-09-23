import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 64px;
  justify-items: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 240px;
  height: 240px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  > div {
    padding: 16px;
    &:hover {
      background-color: #ecf0f1;
    }
    > div {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      strong {
        margin-right: 8px;
        font-size: 1rem;
        color: #ffffff;
        background-color: #e17055;
        padding: 1px 2px;
      }
      span {
        font-size: 1.6rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }
    }
    p {
      color: #7f8c8d;
    }
  }
`;

export const Button = styled.div``;
