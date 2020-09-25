import React, { createContext, useCallback } from 'react';
import { FetchResult, MutationFunctionOptions, useApolloClient, useMutation } from '@apollo/client';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  LoginDocument,
  LoginMutation,
  MutationLoginArgs,
  MutationRegisterArgs,
  RegisterDocument,
  RegisterMutation,
} from '../generated/graphql';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export interface IAuthContext {
  registerMutation: (
    options?: MutationFunctionOptions<RegisterMutation, MutationRegisterArgs> | undefined,
  ) => Promise<FetchResult<RegisterMutation>>;
  loginMutation: (
    options?: MutationFunctionOptions<LoginMutation, MutationLoginArgs> | undefined,
  ) => Promise<FetchResult<LoginMutation>>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  registerMutation: async () => ({}),
  loginMutation: async () => ({}),
  logout: async () => ({}),
});

export const AuthProvider: React.FC<any> = ({ children }) => {
  const client = useApolloClient();
  const router = useRouter();

  const [registerMutation] = useMutation<RegisterMutation, MutationRegisterArgs>(RegisterDocument, {
    onError({ message }) {
      alert(message);
    },
  });
  const [loginMutation] = useMutation<LoginMutation, MutationLoginArgs>(LoginDocument, {
    async onCompleted({ login }) {
      try {
        const res = await client.query<CurrentUserQuery>({
          query: CurrentUserDocument,
          context: {
            headers: {
              authorization: `Bearer ${login.token}`,
            },
          },
        });
        await client.writeQuery({
          query: CurrentUserDocument,
          data: {
            currentUser: res?.data.currentUser,
          },
        });
        await router.push('/');
      } catch (e) {
        await client.writeQuery({
          query: CurrentUserDocument,
          data: {
            currentUser: null,
          },
        });
      }
    },
    onError({ message }) {
      alert(message);
    },
  });

  const logout = useCallback(async () => {
    Cookies.remove('token');
    await client.writeQuery({
      query: CurrentUserDocument,
      data: {
        currentUser: null,
      },
    });
    router.reload()
  }, []);

  const store = {
    registerMutation,
    loginMutation,
    logout,
  };
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
