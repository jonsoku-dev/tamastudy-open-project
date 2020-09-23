import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { LayoutContext } from '../../../shared/menuHandler';
import * as S from './BackDrop.styled';

export interface BackDropProps {
}

export const BackDrop: React.FC<BackDropProps> = () => {
  const { setShowMenu, showMenu } = useContext(LayoutContext);
  return (
    <S.Wrapper onClick={() => setShowMenu(false)}>
      <CSSTransition
        in={showMenu}
        timeout={300}
        classNames="menu__backdrop"
        unmountOnExit
        onEnter={() => setShowMenu(true)}
        onExited={() => setShowMenu(false)}
      >
        <S.Content/>
      </CSSTransition>
    </S.Wrapper>
  );
};

export default BackDrop;