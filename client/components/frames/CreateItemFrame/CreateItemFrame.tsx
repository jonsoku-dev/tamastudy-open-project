import React from 'react';
import * as S from './CreateItemFrame.styled';

export interface CreateItemFrameProps {
  name: string;
  isRequired?: boolean;
}

const CreateItemFrame: React.FC<CreateItemFrameProps> = ({ name, isRequired = false, children }) => {
  return (
    <S.Wrapper>
      <S.Name>
        {name}
        {isRequired && <span>REQUIRED</span>}
      </S.Name>
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};

export default CreateItemFrame;
