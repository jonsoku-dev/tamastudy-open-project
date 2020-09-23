import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: 3rem;
  font-weight: 600;
`;

export interface MainTitleProps {}

const MainTitle: React.FC<MainTitleProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MainTitle;
