import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 16px 0;
  display: grid;
  grid-gap: 32px;
`;

// Header
export const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
`;
export const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 8px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
export const Date = styled.div`
  display: flex;
  grid-gap: 16px;
  font-size: 1.2rem;
  font-weight: 500;
  span {
    margin-right: 8px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

// Content
export const Content = styled.div`
  padding: 0 16px;
  display: flex;
`;
export const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
  > svg {
    color: #e95353;
    font-size: 3rem;
    margin-bottom: 8px;
    cursor: pointer;
  }
  > span {
    font-size: 2rem;
    font-weight: 500;
  }
`;

export const Desc = styled.div`
  font-size: 1.4rem;
`;

// User
export const User = styled.div`
  justify-self: flex-end;
`;

// Buttons
export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 8px;
  padding: 16px 0;
`;

// Comment
export const Comment = styled.div`
  padding: 0 16px;
`;
