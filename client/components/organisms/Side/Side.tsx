import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { LayoutContext } from '../../../shared/menuHandler';
import * as S from './Side.styled';
import { CurrentUserContext } from '../../../shared/getCurrentUser';
import { AuthContext } from '../../../shared/authHandler';

export interface SideProps {}

const Side: React.FC<SideProps> = () => {
  const { setShowMenu, showMenu } = useContext(LayoutContext);
  const { logout } = useContext(AuthContext);
  const { userId } = useContext(CurrentUserContext);
  return (
    <S.Wrapper>
      <CSSTransition
        in={showMenu}
        timeout={300}
        classNames="menu"
        unmountOnExit
        onEnter={() => setShowMenu(true)}
        onExited={() => setShowMenu(false)}
      >
        <S.Content>
          <S.Common>
            <S.Link href={'/notice'} onClick={() => setShowMenu(false)} name={'Notice'} />
            <S.Link href={'/board'} onClick={() => setShowMenu(false)} name={'Board'} />
            <S.Link href={'/post'} onClick={() => setShowMenu(false)} name={'Post'} />
            <S.Link href={'/gourmet'} onClick={() => setShowMenu(false)} name={'Gourmet'} />
            <S.Link href={'/openchat'} onClick={() => setShowMenu(false)} name={'Openchat'} />
          </S.Common>
          <S.Auth>
            {userId ? (
              <S.Link href={'#'} onClick={logout} name={'Logout'} />
            ) : (
              <>
                <S.Link href={'/register'} onClick={() => setShowMenu(false)} name={'Register'} />
                <S.Link href={'/login'} onClick={() => setShowMenu(false)} name={'Login'} />
              </>
            )}
          </S.Auth>
        </S.Content>
      </CSSTransition>
    </S.Wrapper>
  );
};

export default Side;
