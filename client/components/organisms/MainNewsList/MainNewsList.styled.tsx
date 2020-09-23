import styled from 'styled-components';
import { mq } from '../../../styles/mq';

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 16px;
`;
export const SwiperWrapper = styled.div``;
export const Section = styled.div`
  margin: 8px 0;
`;
export const NewsContainer = styled.div``;
export const NewsBox = styled.div<{ idx: number }>`
  padding: 16px 12px;
  cursor: pointer;
  ${mq('ph')`
    padding: 32px 16px;
  `};
  background-color: ${(props) => {
    if (props.idx % 7 === 0) {
      return '#ff7f50';
    } else if (props.idx % 5 === 0) {
      return '#5352ed';
    } else if (props.idx % 3 === 0) {
      return '#2f3542';
    } else if (props.idx % 2 === 0) {
      return '#2ed573';
    } else {
      return '#57606f';
    }
  }};
  color: white;
  &:hover {
    -webkit-box-shadow: inset 0px 0px 0px 1px rgba(150, 150, 150, 1);
    -moz-box-shadow: inset 0px 0px 0px 1px rgba(150, 150, 150, 1);
    box-shadow: inset 0px 0px 0px 1px rgba(150, 150, 150, 1);
  }
  &:not:last-of-type {
  }
  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    font-weight: 900;
    font-size: 1.4rem;
    margin-bottom: 16px;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    ${mq('ph')`
    -webkit-line-clamp: 3;
  `};
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    font-size: 1rem;
    line-height: 1.6;
  }
`;
