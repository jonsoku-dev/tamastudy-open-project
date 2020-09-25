import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import { CurrentUserDocument, CurrentUserQuery } from '../generated/graphql';

export interface ICurrentUserContext {
  userId: string | undefined;
  username: string | undefined;
  email: string | undefined;
  avatar: string | null | undefined;
}

export const CurrentUserContext = createContext<ICurrentUserContext>({
  userId: undefined,
  username: undefined,
  email: undefined,
  avatar: undefined,
});

export const CurrentUserProvider: React.FC<any> = ({ children }) => {
  const { data } = useQuery<CurrentUserQuery>(CurrentUserDocument, {
    fetchPolicy: 'cache-first',
  });
  console.log(data);
  const store = {
    userId: data?.currentUser?.id,
    username: data?.currentUser?.username,
    email: data?.currentUser?.email,
    avatar: data?.currentUser?.avatar,
  };
  return <CurrentUserContext.Provider value={store}>{children}</CurrentUserContext.Provider>;
};
