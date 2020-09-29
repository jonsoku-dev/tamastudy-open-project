import React from 'react';
import Header from './molecules/Header/Header';
import Side from './organisms/Side/Side';
import { LayoutProvider } from '../shared/menuHandler';
import BackDrop from './molecules/BackDrop/BackDrop';
import { Container, Contents } from './shared.styled';

const BasicLayout = ({
  title,
  bg = false,
  isMain = false,
  children,
}: {
  title: string;
  bg?: boolean;
  isMain?: boolean;
  children: any;
}) => {
  return (
    <LayoutProvider>
      <Side />
      <BackDrop />
      <Container>
        <Header title={title} bg={bg} />
        <Contents isMain={isMain}>{children}</Contents>
      </Container>
    </LayoutProvider>
  );
};

export default BasicLayout;
