import React from 'react';
import * as S from './Avatar.styled';
import Parser from 'html-react-parser';

export interface AvatarProps {
  size?: number;
  avatar?: any;
  onClick?: any;
  hasCursor?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ size = 40, avatar, onClick, hasCursor = false, ...props }) => {
  return (
    <S.Wrapper size={size} onClick={onClick} hasCursor={hasCursor} {...props}>
      {avatar ? (
        Parser(avatar)
      ) : (
        <img src={'https://cdn.onlinewebfonts.com/svg/img_213349.png'} alt="user" />
      )}
    </S.Wrapper>
  );
};

export default Avatar;
