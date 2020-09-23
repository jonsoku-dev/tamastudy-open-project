import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type PostComment = {
  __typename?: 'PostComment';
  id: Scalars['ID'];
  body: Scalars['String'];
  user: Auth;
  post: Post;
};

export type Post = PostInterface & {
  __typename?: 'Post';
  id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<PostComment>;
};

export type PostInterface = {
  id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<PostComment>;
};


export type Notice = NoticeInterface & {
  __typename?: 'Notice';
  id: Scalars['ID'];
  title: Scalars['String'];
  desc: Scalars['String'];
  view: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
};

export type NoticeInterface = {
  id: Scalars['ID'];
  title: Scalars['String'];
  desc: Scalars['String'];
  view: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
};

export type BoardComment = BoardCommentInterface & {
  __typename?: 'BoardComment';
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  board: Board;
};

export type BoardCommentInterface = {
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  board: Board;
};

export type BoardLike = {
  __typename?: 'BoardLike';
  id: Scalars['ID'];
  userId: Scalars['String'];
};

export type Board = BoardInterface & {
  __typename?: 'Board';
  id: Scalars['ID'];
  title: Scalars['String'];
  desc: Scalars['String'];
  view: Scalars['Float'];
  category: BoardCategory;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<BoardComment>;
  likes: Array<BoardLike>;
};

export type BoardInterface = {
  id: Scalars['ID'];
  title: Scalars['String'];
  desc: Scalars['String'];
  view: Scalars['Float'];
  category: BoardCategory;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<BoardComment>;
  likes: Array<BoardLike>;
};

export enum BoardCategory {
  All = 'ALL',
  Trade = 'TRADE',
  Job = 'JOB',
  Free = 'FREE',
  Fq = 'FQ'
}

export type Auth = AuthInterface & {
  __typename?: 'Auth';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  followers: Array<Auth>;
  following: Array<Auth>;
};

export type AuthInterface = {
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  followers: Array<Auth>;
  following: Array<Auth>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type Edges = {
  __typename?: 'Edges';
  cursor: Scalars['String'];
  node: Board;
};

export type BoardListResponseDto = {
  __typename?: 'BoardListResponseDto';
  edges: Array<Edges>;
  pageInfo: PageInfo;
};

export type PlaceholderResponse = {
  __typename?: 'PlaceholderResponse';
  userId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  completed?: Maybe<Scalars['Boolean']>;
};

export type GetNewsListResponse = {
  __typename?: 'GetNewsListResponse';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  press?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
  portal?: Maybe<Scalars['String']>;
  flag: NewsFlagEnum;
};

export enum NewsFlagEnum {
  Kr = 'KR',
  Jp = 'JP',
  Us = 'US'
}

export type Query = {
  __typename?: 'Query';
  currentUser: Auth;
  getPostList: Array<Post>;
  getPost: Post;
  getNoticeList: Array<Notice>;
  getNotice: Notice;
  getBoardListByCategory: Array<Board>;
  getBoardList: BoardListResponseDto;
  getBoard: Board;
  getPlaceholder: Array<PlaceholderResponse>;
  getNewsList: Array<GetNewsListResponse>;
};


export type QueryGetPostListArgs = {
  filter?: Maybe<GetPostListFilter>;
};


export type QueryGetPostArgs = {
  postId: Scalars['String'];
};


export type QueryGetNoticeListArgs = {
  filter?: Maybe<GetNoticeListFilter>;
};


export type QueryGetNoticeArgs = {
  noticeId: Scalars['String'];
};


export type QueryGetBoardListByCategoryArgs = {
  category: BoardCategory;
};


export type QueryGetBoardListArgs = {
  after?: Maybe<Scalars['Float']>;
  first?: Maybe<Scalars['Float']>;
  search?: Maybe<Scalars['String']>;
  category?: Maybe<BoardCategory>;
};


export type QueryGetBoardArgs = {
  boardId: Scalars['String'];
  isRefetch?: Maybe<Scalars['Boolean']>;
};


export type QueryGetNewsListArgs = {
  filter?: Maybe<NewsFlagFilter>;
};

export type GetPostListFilter = {
  search?: Maybe<Scalars['String']>;
};

export type GetNoticeListFilter = {
  search?: Maybe<Scalars['String']>;
};

export type NewsFlagFilter = {
  flag?: Maybe<NewsFlagEnum>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Auth;
  login: LoginResponse;
  follow: Scalars['String'];
  unFollow: Scalars['String'];
  createPost: Scalars['String'];
  editPost: Scalars['String'];
  deletePost: Scalars['String'];
  createPostComment: Scalars['String'];
  editPostComment: Scalars['String'];
  deletePostComment: Scalars['String'];
  createNotice: Scalars['String'];
  editNotice: Scalars['String'];
  deleteNotice: Scalars['String'];
  createBoard: Scalars['String'];
  editBoard: Scalars['String'];
  deleteBoard: Scalars['String'];
  createBoardComment: Scalars['String'];
  editBoardComment: Scalars['String'];
  deleteBoardComment: Scalars['String'];
  like: Scalars['String'];
  unLike: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterRequest;
};


export type MutationLoginArgs = {
  input: LoginRequest;
};


export type MutationFollowArgs = {
  targetUserId: Scalars['String'];
};


export type MutationUnFollowArgs = {
  targetUserId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: CreatePostRequest;
};


export type MutationEditPostArgs = {
  input: EditPostRequest;
  postId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationCreatePostCommentArgs = {
  input: CreatePostCommentRequest;
  postId: Scalars['String'];
};


export type MutationEditPostCommentArgs = {
  input: EditPostCommentRequest;
  postCommentId: Scalars['String'];
};


export type MutationDeletePostCommentArgs = {
  postCommentId: Scalars['String'];
};


export type MutationCreateNoticeArgs = {
  input: CreateNoticeRequest;
};


export type MutationEditNoticeArgs = {
  input: EditNoticeRequest;
  noticeId: Scalars['String'];
};


export type MutationDeleteNoticeArgs = {
  noticeId: Scalars['String'];
};


export type MutationCreateBoardArgs = {
  input: CreateBoardRequestDto;
};


export type MutationEditBoardArgs = {
  input: EditBoardRequestDto;
  boardId: Scalars['String'];
};


export type MutationDeleteBoardArgs = {
  boardId: Scalars['String'];
};


export type MutationCreateBoardCommentArgs = {
  input: CreateBoardCommentRequestDto;
  boardId: Scalars['String'];
};


export type MutationEditBoardCommentArgs = {
  input: EditBoardCommentRequestDto;
  boardCommentId: Scalars['String'];
};


export type MutationDeleteBoardCommentArgs = {
  boardCommentId: Scalars['String'];
};


export type MutationLikeArgs = {
  boardId: Scalars['String'];
};


export type MutationUnLikeArgs = {
  boardId: Scalars['String'];
};

export type RegisterRequest = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginRequest = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreatePostRequest = {
  content: Scalars['String'];
};

export type EditPostRequest = {
  content?: Maybe<Scalars['String']>;
};

export type CreatePostCommentRequest = {
  body: Scalars['String'];
};

export type EditPostCommentRequest = {
  body?: Maybe<Scalars['String']>;
};

export type CreateNoticeRequest = {
  title: Scalars['String'];
  desc: Scalars['String'];
};

export type EditNoticeRequest = {
  title?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
};

export type CreateBoardRequestDto = {
  title: Scalars['String'];
  desc: Scalars['String'];
  category: BoardCategory;
};

export type EditBoardRequestDto = {
  title?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  category?: Maybe<BoardCategory>;
};

export type CreateBoardCommentRequestDto = {
  body: Scalars['String'];
};

export type EditBoardCommentRequestDto = {
  body?: Maybe<Scalars['String']>;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: (
    { __typename?: 'Auth' }
    & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
  ) }
);

export type LoginMutationVariables = Exact<{
  input: LoginRequest;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: RegisterRequest;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Auth' }
    & Pick<Auth, 'id' | 'email' | 'username'>
  ) }
);

export type CreateBoardMutationVariables = Exact<{
  input: CreateBoardRequestDto;
}>;


export type CreateBoardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createBoard'>
);

export type CreateBoardCommentMutationVariables = Exact<{
  input: CreateBoardCommentRequestDto;
  boardId: Scalars['String'];
}>;


export type CreateBoardCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createBoardComment'>
);

export type DeleteBoardMutationVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type DeleteBoardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBoard'>
);

export type DeleteBoardCommentMutationVariables = Exact<{
  boardCommentId: Scalars['String'];
}>;


export type DeleteBoardCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBoardComment'>
);

export type EditBoardMutationVariables = Exact<{
  boardId: Scalars['String'];
  input: EditBoardRequestDto;
}>;


export type EditBoardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editBoard'>
);

export type EditBoardCommentMutationVariables = Exact<{
  input: EditBoardCommentRequestDto;
  boardCommentId: Scalars['String'];
}>;


export type EditBoardCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editBoardComment'>
);

export type GetBoardQueryVariables = Exact<{
  boardId: Scalars['String'];
  isRefetch?: Maybe<Scalars['Boolean']>;
}>;


export type GetBoardQuery = (
  { __typename?: 'Query' }
  & { getBoard: (
    { __typename?: 'Board' }
    & Pick<Board, 'id' | 'title' | 'desc' | 'view' | 'category' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'Auth' }
      & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
    ), comments: Array<(
      { __typename?: 'BoardComment' }
      & Pick<BoardComment, 'id' | 'body' | 'createdAt'>
      & { user: (
        { __typename?: 'Auth' }
        & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
      ) }
    )>, likes: Array<(
      { __typename?: 'BoardLike' }
      & Pick<BoardLike, 'id' | 'userId'>
    )> }
  ) }
);

export type GetBoardListQueryVariables = Exact<{
  after?: Maybe<Scalars['Float']>;
  first?: Maybe<Scalars['Float']>;
  search?: Maybe<Scalars['String']>;
  category?: Maybe<BoardCategory>;
}>;


export type GetBoardListQuery = (
  { __typename?: 'Query' }
  & { getBoardList: (
    { __typename?: 'BoardListResponseDto' }
    & { edges: Array<(
      { __typename?: 'Edges' }
      & Pick<Edges, 'cursor'>
      & { node: (
        { __typename?: 'Board' }
        & Pick<Board, 'id' | 'title' | 'desc' | 'view' | 'category' | 'createdAt' | 'updatedAt'>
        & { user: (
          { __typename?: 'Auth' }
          & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
        ), comments: Array<(
          { __typename?: 'BoardComment' }
          & Pick<BoardComment, 'id'>
        )>, likes: Array<(
          { __typename?: 'BoardLike' }
          & Pick<BoardLike, 'id'>
        )> }
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'startCursor' | 'endCursor'>
    ) }
  ) }
);

export type GetBoardListByCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardListByCategoryQuery = (
  { __typename?: 'Query' }
  & { tradeBoardList: Array<(
    { __typename?: 'Board' }
    & GetBoardListByCategoryFieldsFragment
  )>, jobBoardList: Array<(
    { __typename?: 'Board' }
    & GetBoardListByCategoryFieldsFragment
  )>, freeBoardList: Array<(
    { __typename?: 'Board' }
    & GetBoardListByCategoryFieldsFragment
  )>, fqBoardList: Array<(
    { __typename?: 'Board' }
    & GetBoardListByCategoryFieldsFragment
  )> }
);

export type GetBoardListByCategoryFieldsFragment = (
  { __typename?: 'Board' }
  & Pick<Board, 'id' | 'title' | 'desc' | 'view' | 'category' | 'createdAt' | 'updatedAt'>
  & { user: (
    { __typename?: 'Auth' }
    & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
  ), comments: Array<(
    { __typename?: 'BoardComment' }
    & Pick<BoardComment, 'id'>
  )>, likes: Array<(
    { __typename?: 'BoardLike' }
    & Pick<BoardLike, 'id'>
  )> }
);

export type LikeMutationVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'like'>
);

export type UnLikeMutationVariables = Exact<{
  boardId: Scalars['String'];
}>;


export type UnLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unLike'>
);

export type GetNewsListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewsListQuery = (
  { __typename?: 'Query' }
  & { krBoardList: Array<(
    { __typename?: 'GetNewsListResponse' }
    & GetNewsListFieldsFragment
  )>, jpBoardList: Array<(
    { __typename?: 'GetNewsListResponse' }
    & GetNewsListFieldsFragment
  )>, usBoardList: Array<(
    { __typename?: 'GetNewsListResponse' }
    & GetNewsListFieldsFragment
  )> }
);

export type GetNewsListFieldsFragment = (
  { __typename?: 'GetNewsListResponse' }
  & Pick<GetNewsListResponse, 'id' | 'title' | 'content' | 'press' | 'data' | 'url' | 'portal' | 'flag'>
);

export const GetBoardListByCategoryFieldsFragmentDoc = gql`
    fragment getBoardListByCategoryFields on Board {
  id
  title
  desc
  view
  category
  createdAt
  updatedAt
  user {
    id
    username
    email
    avatar
  }
  comments {
    id
  }
  likes {
    id
  }
}
    `;
export const GetNewsListFieldsFragmentDoc = gql`
    fragment getNewsListFields on GetNewsListResponse {
  id
  title
  content
  press
  data
  url
  portal
  flag
}
    `;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    username
    email
    avatar
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LoginDocument = gql`
    mutation LOGIN($input: LoginRequest!) {
  login(input: $input) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($input: RegisterRequest!) {
  register(input: $input) {
    id
    email
    username
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateBoardDocument = gql`
    mutation createBoard($input: createBoardRequestDto!) {
  createBoard(input: $input)
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, baseOptions);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const CreateBoardCommentDocument = gql`
    mutation createBoardComment($input: createBoardCommentRequestDto!, $boardId: String!) {
  createBoardComment(input: $input, boardId: $boardId)
}
    `;
export type CreateBoardCommentMutationFn = Apollo.MutationFunction<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>;

/**
 * __useCreateBoardCommentMutation__
 *
 * To run a mutation, you first call `useCreateBoardCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardCommentMutation, { data, loading, error }] = useCreateBoardCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useCreateBoardCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>) {
        return Apollo.useMutation<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>(CreateBoardCommentDocument, baseOptions);
      }
export type CreateBoardCommentMutationHookResult = ReturnType<typeof useCreateBoardCommentMutation>;
export type CreateBoardCommentMutationResult = Apollo.MutationResult<CreateBoardCommentMutation>;
export type CreateBoardCommentMutationOptions = Apollo.BaseMutationOptions<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>;
export const DeleteBoardDocument = gql`
    mutation deleteBoard($boardId: String!) {
  deleteBoard(boardId: $boardId)
}
    `;
export type DeleteBoardMutationFn = Apollo.MutationFunction<DeleteBoardMutation, DeleteBoardMutationVariables>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useDeleteBoardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardMutation, DeleteBoardMutationVariables>) {
        return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(DeleteBoardDocument, baseOptions);
      }
export type DeleteBoardMutationHookResult = ReturnType<typeof useDeleteBoardMutation>;
export type DeleteBoardMutationResult = Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const DeleteBoardCommentDocument = gql`
    mutation deleteBoardComment($boardCommentId: String!) {
  deleteBoardComment(boardCommentId: $boardCommentId)
}
    `;
export type DeleteBoardCommentMutationFn = Apollo.MutationFunction<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>;

/**
 * __useDeleteBoardCommentMutation__
 *
 * To run a mutation, you first call `useDeleteBoardCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardCommentMutation, { data, loading, error }] = useDeleteBoardCommentMutation({
 *   variables: {
 *      boardCommentId: // value for 'boardCommentId'
 *   },
 * });
 */
export function useDeleteBoardCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>) {
        return Apollo.useMutation<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>(DeleteBoardCommentDocument, baseOptions);
      }
export type DeleteBoardCommentMutationHookResult = ReturnType<typeof useDeleteBoardCommentMutation>;
export type DeleteBoardCommentMutationResult = Apollo.MutationResult<DeleteBoardCommentMutation>;
export type DeleteBoardCommentMutationOptions = Apollo.BaseMutationOptions<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>;
export const EditBoardDocument = gql`
    mutation editBoard($boardId: String!, $input: editBoardRequestDto!) {
  editBoard(boardId: $boardId, input: $input)
}
    `;
export type EditBoardMutationFn = Apollo.MutationFunction<EditBoardMutation, EditBoardMutationVariables>;

/**
 * __useEditBoardMutation__
 *
 * To run a mutation, you first call `useEditBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBoardMutation, { data, loading, error }] = useEditBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditBoardMutation(baseOptions?: Apollo.MutationHookOptions<EditBoardMutation, EditBoardMutationVariables>) {
        return Apollo.useMutation<EditBoardMutation, EditBoardMutationVariables>(EditBoardDocument, baseOptions);
      }
export type EditBoardMutationHookResult = ReturnType<typeof useEditBoardMutation>;
export type EditBoardMutationResult = Apollo.MutationResult<EditBoardMutation>;
export type EditBoardMutationOptions = Apollo.BaseMutationOptions<EditBoardMutation, EditBoardMutationVariables>;
export const EditBoardCommentDocument = gql`
    mutation editBoardComment($input: editBoardCommentRequestDto!, $boardCommentId: String!) {
  editBoardComment(input: $input, boardCommentId: $boardCommentId)
}
    `;
export type EditBoardCommentMutationFn = Apollo.MutationFunction<EditBoardCommentMutation, EditBoardCommentMutationVariables>;

/**
 * __useEditBoardCommentMutation__
 *
 * To run a mutation, you first call `useEditBoardCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBoardCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBoardCommentMutation, { data, loading, error }] = useEditBoardCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *      boardCommentId: // value for 'boardCommentId'
 *   },
 * });
 */
export function useEditBoardCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditBoardCommentMutation, EditBoardCommentMutationVariables>) {
        return Apollo.useMutation<EditBoardCommentMutation, EditBoardCommentMutationVariables>(EditBoardCommentDocument, baseOptions);
      }
export type EditBoardCommentMutationHookResult = ReturnType<typeof useEditBoardCommentMutation>;
export type EditBoardCommentMutationResult = Apollo.MutationResult<EditBoardCommentMutation>;
export type EditBoardCommentMutationOptions = Apollo.BaseMutationOptions<EditBoardCommentMutation, EditBoardCommentMutationVariables>;
export const GetBoardDocument = gql`
    query getBoard($boardId: String!, $isRefetch: Boolean) {
  getBoard(boardId: $boardId, isRefetch: $isRefetch) {
    id
    title
    desc
    view
    category
    createdAt
    updatedAt
    user {
      id
      username
      email
      avatar
    }
    comments {
      id
      body
      createdAt
      user {
        id
        username
        email
        avatar
      }
    }
    likes {
      id
      userId
    }
  }
}
    `;

/**
 * __useGetBoardQuery__
 *
 * To run a query within a React component, call `useGetBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      isRefetch: // value for 'isRefetch'
 *   },
 * });
 */
export function useGetBoardQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
        return Apollo.useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, baseOptions);
      }
export function useGetBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardQuery, GetBoardQueryVariables>) {
          return Apollo.useLazyQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, baseOptions);
        }
export type GetBoardQueryHookResult = ReturnType<typeof useGetBoardQuery>;
export type GetBoardLazyQueryHookResult = ReturnType<typeof useGetBoardLazyQuery>;
export type GetBoardQueryResult = Apollo.QueryResult<GetBoardQuery, GetBoardQueryVariables>;
export const GetBoardListDocument = gql`
    query getBoardList($after: Float, $first: Float, $search: String, $category: BoardCategory) {
  getBoardList(after: $after, first: $first, search: $search, category: $category) {
    edges {
      cursor
      node {
        id
        title
        desc
        view
        category
        createdAt
        updatedAt
        user {
          id
          username
          email
          avatar
        }
        comments {
          id
        }
        likes {
          id
        }
      }
    }
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
  }
}
    `;

/**
 * __useGetBoardListQuery__
 *
 * To run a query within a React component, call `useGetBoardListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardListQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      search: // value for 'search'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetBoardListQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardListQuery, GetBoardListQueryVariables>) {
        return Apollo.useQuery<GetBoardListQuery, GetBoardListQueryVariables>(GetBoardListDocument, baseOptions);
      }
export function useGetBoardListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardListQuery, GetBoardListQueryVariables>) {
          return Apollo.useLazyQuery<GetBoardListQuery, GetBoardListQueryVariables>(GetBoardListDocument, baseOptions);
        }
export type GetBoardListQueryHookResult = ReturnType<typeof useGetBoardListQuery>;
export type GetBoardListLazyQueryHookResult = ReturnType<typeof useGetBoardListLazyQuery>;
export type GetBoardListQueryResult = Apollo.QueryResult<GetBoardListQuery, GetBoardListQueryVariables>;
export const GetBoardListByCategoryDocument = gql`
    query getBoardListByCategory {
  tradeBoardList: getBoardListByCategory(category: TRADE) {
    ...getBoardListByCategoryFields
  }
  jobBoardList: getBoardListByCategory(category: JOB) {
    ...getBoardListByCategoryFields
  }
  freeBoardList: getBoardListByCategory(category: FREE) {
    ...getBoardListByCategoryFields
  }
  fqBoardList: getBoardListByCategory(category: FQ) {
    ...getBoardListByCategoryFields
  }
}
    ${GetBoardListByCategoryFieldsFragmentDoc}`;

/**
 * __useGetBoardListByCategoryQuery__
 *
 * To run a query within a React component, call `useGetBoardListByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardListByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardListByCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardListByCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardListByCategoryQuery, GetBoardListByCategoryQueryVariables>) {
        return Apollo.useQuery<GetBoardListByCategoryQuery, GetBoardListByCategoryQueryVariables>(GetBoardListByCategoryDocument, baseOptions);
      }
export function useGetBoardListByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardListByCategoryQuery, GetBoardListByCategoryQueryVariables>) {
          return Apollo.useLazyQuery<GetBoardListByCategoryQuery, GetBoardListByCategoryQueryVariables>(GetBoardListByCategoryDocument, baseOptions);
        }
export type GetBoardListByCategoryQueryHookResult = ReturnType<typeof useGetBoardListByCategoryQuery>;
export type GetBoardListByCategoryLazyQueryHookResult = ReturnType<typeof useGetBoardListByCategoryLazyQuery>;
export type GetBoardListByCategoryQueryResult = Apollo.QueryResult<GetBoardListByCategoryQuery, GetBoardListByCategoryQueryVariables>;
export const LikeDocument = gql`
    mutation like($boardId: String!) {
  like(boardId: $boardId)
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, baseOptions);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const UnLikeDocument = gql`
    mutation unLike($boardId: String!) {
  unLike(boardId: $boardId)
}
    `;
export type UnLikeMutationFn = Apollo.MutationFunction<UnLikeMutation, UnLikeMutationVariables>;

/**
 * __useUnLikeMutation__
 *
 * To run a mutation, you first call `useUnLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unLikeMutation, { data, loading, error }] = useUnLikeMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useUnLikeMutation(baseOptions?: Apollo.MutationHookOptions<UnLikeMutation, UnLikeMutationVariables>) {
        return Apollo.useMutation<UnLikeMutation, UnLikeMutationVariables>(UnLikeDocument, baseOptions);
      }
export type UnLikeMutationHookResult = ReturnType<typeof useUnLikeMutation>;
export type UnLikeMutationResult = Apollo.MutationResult<UnLikeMutation>;
export type UnLikeMutationOptions = Apollo.BaseMutationOptions<UnLikeMutation, UnLikeMutationVariables>;
export const GetNewsListDocument = gql`
    query GetNewsList {
  krBoardList: getNewsList(filter: {flag: KR}) {
    ...getNewsListFields
  }
  jpBoardList: getNewsList(filter: {flag: JP}) {
    ...getNewsListFields
  }
  usBoardList: getNewsList(filter: {flag: US}) {
    ...getNewsListFields
  }
}
    ${GetNewsListFieldsFragmentDoc}`;

/**
 * __useGetNewsListQuery__
 *
 * To run a query within a React component, call `useGetNewsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNewsListQuery(baseOptions?: Apollo.QueryHookOptions<GetNewsListQuery, GetNewsListQueryVariables>) {
        return Apollo.useQuery<GetNewsListQuery, GetNewsListQueryVariables>(GetNewsListDocument, baseOptions);
      }
export function useGetNewsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNewsListQuery, GetNewsListQueryVariables>) {
          return Apollo.useLazyQuery<GetNewsListQuery, GetNewsListQueryVariables>(GetNewsListDocument, baseOptions);
        }
export type GetNewsListQueryHookResult = ReturnType<typeof useGetNewsListQuery>;
export type GetNewsListLazyQueryHookResult = ReturnType<typeof useGetNewsListLazyQuery>;
export type GetNewsListQueryResult = Apollo.QueryResult<GetNewsListQuery, GetNewsListQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "PostInterface",
        "possibleTypes": [
          {
            "name": "Post"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "NoticeInterface",
        "possibleTypes": [
          {
            "name": "Notice"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "BoardCommentInterface",
        "possibleTypes": [
          {
            "name": "BoardComment"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "BoardInterface",
        "possibleTypes": [
          {
            "name": "Board"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "AuthInterface",
        "possibleTypes": [
          {
            "name": "Auth"
          }
        ]
      }
    ]
  }
};
      export default result;
    