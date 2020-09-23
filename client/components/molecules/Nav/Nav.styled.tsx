import styled from 'styled-components';
import { mq } from '../../../styles/mq';

export const Wrapper = styled.nav<{ bg: boolean }>`
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  justify-items: center;
  align-content: center;
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
  font-size: 2rem;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 200ms ease-out;
  &:hover {
    background-color: #ecf0f1;
  }
`;
export const Back = styled(Item)``;
export const Home = styled(Item)``;
export const Star = styled(Item)`
  color: #f1c40f;
`;
