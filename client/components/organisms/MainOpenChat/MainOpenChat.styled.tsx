import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Logo = styled.div`
  img {
    width: 30%;
    height: 20%;
    object-fit: cover;
  }
`;

export const Contents = styled.div`
  width: 100%;
  overflow: hidden;
`;
export const ChatCard = styled.div`
  display: grid;
  grid-gap: 16px;
  justify-items: center;
  align-items: center;
  padding: 32px 16px;
  background-color: white;
  border-radius: 8px;
`;
export const CardTitle = styled.div`
  font-size: 1.6rem;
`;
export const CardInfo = styled.div``;
export const Kakao = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  img {
    width: 100%;
    height: auto;
    object-fit: fill;
  }
`;
