import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { LayoutContext } from '../../../shared/menuHandler';
import * as S from './Side.styled';

export interface SideProps {}

const Side: React.FC<SideProps> = () => {
  const { setShowMenu, showMenu } = useContext(LayoutContext);
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
          <S.Link href={'/board'} onClick={() => setShowMenu(false)} name={'Board'} />
          <S.Link href={'/board'} onClick={() => setShowMenu(false)} name={'Board'} />
          <S.Link href={'/board'} onClick={() => setShowMenu(false)} name={'Board'} />
          <S.Link href={'/board'} onClick={() => setShowMenu(false)} name={'Board'} />
          <S.Link href={'/board'} onClick={() => setShowMenu(false)} name={'Board'} />
        </S.Content>
      </CSSTransition>
    </S.Wrapper>
  );
};

export default Side;
