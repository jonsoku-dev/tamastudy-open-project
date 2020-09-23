import React from 'react';
import { Container } from '../../shared.styled';
import * as S from './Footer.styled'

export interface FooterProps {

}

const Footer: React.FC<FooterProps> = () => {
  return (
    <S.Wrapper>
      <Container>
        Footer
      </Container>
    </S.Wrapper>
  );
};

export default Footer;