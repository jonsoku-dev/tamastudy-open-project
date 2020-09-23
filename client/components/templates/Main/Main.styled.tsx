import styled from 'styled-components';
import { mq } from '../../../styles/mq';

export const Wrapper = styled.div``;

interface ISection {
  height: number;
}

export const Section = styled.div<ISection>`
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => {
    console.log(props.height);
    return props.height;
  }}px;
`;

export const Section1 = styled(Section)`
  background-color: #ffeaa7;
  display: grid;
  grid-template-rows: 1fr 6fr 4fr 4fr;
  justify-items: center;
  text-align: center;
  padding: 64px;
  color: #2d3436;
  ${mq('ph')`
    padding: 128px;
  `}
`;

export const Section2 = styled(Section)`
  width: 100%;
  overflow: hidden;
`;
export const Section3 = styled(Section)``;
export const Section4 = styled(Section)``;
export const Section5 = styled(Section)`
  background-color: #ffeaa7;
  display: grid;
  grid-template-rows: 1fr 1fr 2fr;
  justify-items: center;
  text-align: center;
  color: #2d3436;
`;
export const Section6 = styled(Section)`
  background-color: #fdcb6e;
`;
