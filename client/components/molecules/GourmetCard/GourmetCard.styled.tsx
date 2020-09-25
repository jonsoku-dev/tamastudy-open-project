import styled from 'styled-components';

export const Wrapper = styled.div<{selected: boolean}>`
  padding: 16px;
  border-radius: 8px;
  display: grid;
  grid-gap: 4px;
  border: 1px solid #eaeaea;
  ${props => props.selected && 'background-color: red'};
`;

export const Info = styled.div``;

export const Category = styled.h4`
  font-size: 1rem;
`;
export const Name = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
`;
export const Score = styled.div`
  flex: 1;
`;
