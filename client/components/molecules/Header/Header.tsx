import React, { useCallback, useContext, useState } from 'react';
import * as S from './Header.styled';
import Avatar from '../../atoms/Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LayoutContext } from '../../../shared/menuHandler';
import { CurrentUserContext } from '../../../shared/getCurrentUser';
import { useFollowSubscriptionSubscription } from '../../../generated/graphql';

export interface HeaderProps {
  title: string;
  bg?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, bg = false }) => {
  const { avatar } = useContext(CurrentUserContext);
  const { setShowMenu } = useContext(LayoutContext);
  const { data } = useFollowSubscriptionSubscription();

  const [showUserInfo, setShowUserInfo] = useState(false);

  const onMouseOverAvatar = useCallback(() => {
    setShowUserInfo(true);
  }, [showUserInfo]);

  const onMouseLeaveAvatar = useCallback(() => {
    setShowUserInfo(false);
  }, [showUserInfo]);

  console.log(data);

  return (
    <S.Wrapper bg={bg}>
      <S.Menu onClick={() => setShowMenu(true)}>
        <FontAwesomeIcon icon={faBars} />
      </S.Menu>
      <S.Title>
        <h1>{title}</h1>
      </S.Title>
      <S.Avatar>
        {avatar ? (
          <div onMouseOver={onMouseOverAvatar} onMouseLeave={onMouseLeaveAvatar}>
            {data && <S.Dot></S.Dot>}
            <Avatar size={36} avatar={avatar} hasCursor />
            {showUserInfo && <S.LoggedIn>loggedIn</S.LoggedIn>}
          </div>
        ) : (
          <div onMouseOver={onMouseOverAvatar} onMouseLeave={onMouseLeaveAvatar}>
            <Avatar size={36} hasCursor />
            {showUserInfo && <S.LoggedOut>loggedOut</S.LoggedOut>}
          </div>
        )}
      </S.Avatar>
    </S.Wrapper>
  );
};

export default Header;
