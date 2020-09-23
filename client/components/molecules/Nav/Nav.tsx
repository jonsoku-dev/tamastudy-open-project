import React, { useCallback } from 'react';
import * as S from './Nav.styled';
import { faAngleLeft, faHome, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export interface NavProps {
  bg?: boolean;
}

const Nav: React.FC<NavProps> = ({ bg = false }) => {
  const router = useRouter();
  const onClickBackPage = useCallback(async () => {
    await router.back();
  }, []);
  const onClickHomePage = useCallback(async () => {
    await router.push('/', '/');
  }, []);
  return (
    <S.Wrapper bg={bg}>
      <S.Back onClick={onClickBackPage}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </S.Back>
      <S.Home onClick={onClickHomePage}>
        <FontAwesomeIcon icon={faHome} />
      </S.Home>
      <S.Star onClick={onClickHomePage}>
        <FontAwesomeIcon icon={faStar} />
      </S.Star>
    </S.Wrapper>
  );
};

export default Nav;
