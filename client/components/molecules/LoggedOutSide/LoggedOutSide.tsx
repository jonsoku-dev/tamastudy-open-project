import React from 'react';
import A from '../../atoms/A/A';

export interface LoggedOutSideProps {}

const LoggedOutSide: React.FC<LoggedOutSideProps> = () => {
  return (
    <div>
      <A href={'/login'} name={'login'} />
      <A href={'/register'} name={'register'} />
    </div>
  );
};

export default LoggedOutSide;
