import styled from 'styled-components';
import { mq } from '../../../styles/mq';
import A from '../../atoms/A/A';

export const Wrapper = styled.header<{ bg: boolean }>`
  width: 100%;
  height: 80px;
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  justify-items: center;
  align-content: center;
  z-index: 10000;
  ${(props) => props.bg && 'background-color: white'};
  ${mq('ph')`
    width: 640px;
    margin: 0 auto;
  `};
`;
export const Item = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
`;
export const Menu = styled(Item)`
  font-size: 2rem;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 200ms ease-out;
  &:hover {
    background-color: #f5f5f5;
  }
`;
export const Title = styled(Item)`
  font-size: 2rem;
  font-weight: 500;
`;
export const Avatar = styled(Item)`
  position: relative;
`;

export const Link = styled(A)``;

export const Logged = styled.div`
  position: absolute;
  top: 16px;
  right: 24px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 8px;
  display: grid;
  justify-items: center;
  a {
    font-weight: 500;
    font-size: 1.2rem;
    text-decoration: none;
    color: inherit;
    padding: 8px 0;
    height: 24px;
    &:hover {
      border-bottom: 1px solid black;
    }
  }
`;

export const LoggedIn = styled(Logged)``;
export const LoggedOut = styled(Logged)``;
