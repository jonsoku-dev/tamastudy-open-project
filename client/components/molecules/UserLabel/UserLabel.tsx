import React from 'react';
import * as S from './UserLabel.styled';
import Avatar from '../../atoms/Avatar/Avatar';

export interface UserLabelProps {
  avatar: any;
  username: string;
  email: string;
}

const UserLabel: React.FC<UserLabelProps> = ({ avatar, username, email }) => {
  return (
    <S.Wrapper>
      <Avatar avatar={avatar} />
      <S.Info>
        <h3>{username}</h3>
        <h5>{email}</h5>
      </S.Info>
    </S.Wrapper>
  );
};

export default UserLabel;
