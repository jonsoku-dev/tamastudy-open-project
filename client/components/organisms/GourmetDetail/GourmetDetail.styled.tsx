import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 16px 0;
  display: grid;
  grid-template-areas:
    'image image image'
    'category category category'
    'name score score'
    'address address address'
    'desc desc desc'
    'user user user'
    'commentForm commentForm commentForm'
    'comment comment comment';
  grid-gap: 8px;
`;
export const Image = styled.div`
  background-color: black;
  grid-area: image;
  height: 240px;
`;
export const Category = styled.div`
  grid-area: category;
  font-weight: 400;
  font-size: 1.2rem;
`;
export const Name = styled.div`
  grid-area: name;
  font-weight: 600;
  font-size: 2.4rem;
`;
export const Score = styled.div`
  grid-area: score;
`;
export const Address = styled.div`
  grid-area: address;
`;
export const Desc = styled.div`
  grid-area: desc;
`;
// User
export const User = styled.div`
  grid-area: user;
  justify-self: flex-end;
`;
export const CommentForm = styled.div`
  grid-area: commentForm;
  margin-top: 32px;
`;
export const Comment = styled.div`
  grid-area: comment;
`;
