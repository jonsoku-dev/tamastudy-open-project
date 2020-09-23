import React, { useContext } from 'react';
import * as S from './LoggedInSide.styled';
import A from '../../atoms/A/A';
import { AuthContext } from '../../../shared/authHandler';

export interface LoggedInSideProps {}

const LoggedInSide: React.FC<LoggedInSideProps> = () => {
  const { logout } = useContext(AuthContext);

  return (
    <S.Wrapper>
      <A href={'#'} name={'logout'} onClick={logout} />
    </S.Wrapper>
  );
};

export default LoggedInSide;
