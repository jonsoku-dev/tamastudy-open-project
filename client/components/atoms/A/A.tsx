import Link from 'next/link';
import React from 'react';
import * as S from './A.styled';

export interface LinkProps {
  href: string;
  name: string;
  onClick?: any;
  className?: any;
}

const A: React.FC<LinkProps> = ({ href, name, className, onClick }) => {
  return (
    <Link href={href} passHref>
      <S.StyledLink className={className} onClick={onClick}>
        {name}
      </S.StyledLink>
    </Link>
  );
};

export default A;
