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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
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


export type BoardCommentReply = BoardCommentReplyInterface & {
  __typename?: 'BoardCommentReply';
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  user: Auth;
  boardCommentId: Scalars['String'];
  boardComment: BoardComment;
};

export type BoardCommentReplyInterface = {
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  user: Auth;
  boardCommentId: Scalars['String'];
  boardComment: BoardComment;
};

export type BoardComment = BoardCommentInterface & {
  __typename?: 'BoardComment';
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  board: Board;
  boardCommentReplies: Array<BoardCommentReply>;
};

export type BoardCommentInterface = {
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  board: Board;
  boardCommentReplies: Array<BoardCommentReply>;
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
  filepath: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<BoardComment>;
  likes: Array<BoardLike>;
  likesCount: Scalars['Float'];
};

export type BoardInterface = {
  id: Scalars['ID'];
  title: Scalars['String'];
  desc: Scalars['String'];
  view: Scalars['Float'];
  category: BoardCategory;
  filepath: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<BoardComment>;
  likes: Array<BoardLike>;
  likesCount: Scalars['Float'];
};

export enum BoardCategory {
  All = 'ALL',
  Trade = 'TRADE',
  Job = 'JOB',
  Free = 'FREE',
  Fq = 'FQ'
}

export type GourmetComment = GourmetCommentInterface & {
  __typename?: 'GourmetComment';
  id: Scalars['ID'];
  body: Scalars['String'];
  images?: Maybe<Scalars['String']>;
  score: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  gourmet: Gourmet;
};

export type GourmetCommentInterface = {
  id: Scalars['ID'];
  body: Scalars['String'];
  images?: Maybe<Scalars['String']>;
  score: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  gourmet: Gourmet;
};

export type Gourmet = GourmetInterface & {
  __typename?: 'Gourmet';
  id: Scalars['ID'];
  name: Scalars['String'];
  desc: Scalars['String'];
  category: GourmetCategory;
  score: Scalars['Float'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  images?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<GourmetComment>;
};

export type GourmetInterface = {
  id: Scalars['ID'];
  name: Scalars['String'];
  desc: Scalars['String'];
  category: GourmetCategory;
  score: Scalars['Float'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  images?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<GourmetComment>;
};

export enum GourmetCategory {
  Noodle = 'NOODLE',
  Rice = 'RICE',
  Bread = 'BREAD',
  Meat = 'MEAT'
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

export type GetNoticeListResponseDto = {
  __typename?: 'GetNoticeListResponseDto';
  id: Scalars['String'];
  title: Scalars['String'];
  desc: Scalars['String'];
  view: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
};

export type GetNoticeResponseDto = {
  __typename?: 'GetNoticeResponseDto';
  id: Scalars['String'];
  title: Scalars['String'];
  desc: Scalars['String'];
  view: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
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

export type Openchat = OpenchatInterface & {
  __typename?: 'Openchat';
  id: Scalars['ID'];
  name: Scalars['String'];
  desc: Scalars['String'];
  category: OpenchatCategory;
  participationNumber: Scalars['String'];
  link: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type OpenchatInterface = {
  id: Scalars['ID'];
  name: Scalars['String'];
  desc: Scalars['String'];
  category: OpenchatCategory;
  participationNumber: Scalars['String'];
  link: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum OpenchatCategory {
  It = 'IT',
  Study = 'STUDY',
  Info = 'INFO'
}

export type GetOpenchatListResponseDto = {
  __typename?: 'GetOpenchatListResponseDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  category: OpenchatCategory;
  participationNumber: Scalars['String'];
  link: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type GetGourmetListResponseDto = {
  __typename?: 'GetGourmetListResponseDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  desc: Scalars['String'];
  category: GourmetCategory;
  score: Scalars['Float'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  images?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<GourmetComment>;
};

export type GetGourmetResponseDto = {
  __typename?: 'GetGourmetResponseDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  desc: Scalars['String'];
  category: GourmetCategory;
  score: Scalars['Float'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  images?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: Auth;
  comments: Array<GourmetComment>;
};

export type Query = {
  __typename?: 'Query';
  currentUser: Auth;
  getPostList: Array<Post>;
  getPost: Post;
  getNoticeList: Array<GetNoticeListResponseDto>;
  getNotice: GetNoticeResponseDto;
  getBoardListByCategory: Array<Board>;
  getBoardList: BoardListResponseDto;
  getBoard: Board;
  getPlaceholder: Array<PlaceholderResponse>;
  getNewsList: Array<GetNewsListResponse>;
  getOpenchatList: Array<GetOpenchatListResponseDto>;
  getGourmetList: Array<GetGourmetListResponseDto>;
  getGourmet: GetGourmetResponseDto;
};


export type QueryGetPostListArgs = {
  filter?: Maybe<GetPostListFilter>;
};


export type QueryGetPostArgs = {
  postId: Scalars['String'];
};


export type QueryGetNoticeListArgs = {
  search?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
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
  flag: NewsFlagEnum;
};


export type QueryGetOpenchatListArgs = {
  category?: Maybe<OpenchatCategory>;
  take?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  search?: Maybe<Scalars['String']>;
};


export type QueryGetGourmetListArgs = {
  search?: Maybe<Scalars['String']>;
  category?: Maybe<GourmetCategory>;
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};


export type QueryGetGourmetArgs = {
  gourmetId: Scalars['String'];
};

export type GetPostListFilter = {
  search?: Maybe<Scalars['String']>;
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
  uploadFile: Scalars['Boolean'];
  createBoard: Scalars['String'];
  editBoard: Scalars['String'];
  deleteBoard: Scalars['String'];
  createBoardComment: Scalars['String'];
  editBoardComment: Scalars['String'];
  deleteBoardComment: Scalars['String'];
  like: Scalars['String'];
  unLike: Scalars['String'];
  createBoardCommentReply: Scalars['String'];
  deleteBoardCommentReply: Scalars['String'];
  editBoardCommentReply: Scalars['String'];
  createOpenchat: Openchat;
  editOpenchat: Scalars['String'];
  deleteOpenchat: Scalars['String'];
  createGourmet: Gourmet;
  editGourmet: Scalars['String'];
  deleteGourmet: Scalars['String'];
  createGourmetComment: GourmetComment;
  editGourmetComment: Scalars['String'];
  deleteGourmetComment: Scalars['String'];
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
  input: CreateNoticeRequestDto;
};


export type MutationEditNoticeArgs = {
  input: EditNoticeRequestDto;
  noticeId: Scalars['String'];
};


export type MutationDeleteNoticeArgs = {
  noticeId: Scalars['String'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationCreateBoardArgs = {
  file?: Maybe<Scalars['Upload']>;
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


export type MutationCreateBoardCommentReplyArgs = {
  body: Scalars['String'];
  boardCommentId: Scalars['String'];
};


export type MutationDeleteBoardCommentReplyArgs = {
  boardCommentReplyId: Scalars['String'];
};


export type MutationEditBoardCommentReplyArgs = {
  input: EditBoardCommentReplyRequestDto;
  boardCommentReplyId: Scalars['String'];
};


export type MutationCreateOpenchatArgs = {
  input: CreateOpenchatRequestDto;
};


export type MutationEditOpenchatArgs = {
  input: EditOpenchatRequestDto;
  openchatId: Scalars['String'];
};


export type MutationDeleteOpenchatArgs = {
  openchatId: Scalars['String'];
};


export type MutationCreateGourmetArgs = {
  input: CreateGourmetRequestDto;
};


export type MutationEditGourmetArgs = {
  input: EditGourmetRequestDto;
  gourmetId: Scalars['String'];
};


export type MutationDeleteGourmetArgs = {
  gourmetId: Scalars['String'];
};


export type MutationCreateGourmetCommentArgs = {
  input: CreateGourmetCommentRequestDto;
  gourmetId: Scalars['String'];
};


export type MutationEditGourmetCommentArgs = {
  input: EditGourmetCommentRequestDto;
  gourmetCommentId: Scalars['String'];
};


export type MutationDeleteGourmetCommentArgs = {
  gourmetCommentId: Scalars['String'];
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

export type CreateNoticeRequestDto = {
  title: Scalars['String'];
  desc: Scalars['String'];
};

export type EditNoticeRequestDto = {
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

export type EditBoardCommentReplyRequestDto = {
  body?: Maybe<Scalars['String']>;
};

export type CreateOpenchatRequestDto = {
  name: Scalars['String'];
  desc: Scalars['String'];
  category: OpenchatCategory;
  participationNumber: Scalars['String'];
  link: Scalars['String'];
};

export type EditOpenchatRequestDto = {
  name?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  category?: Maybe<OpenchatCategory>;
  participationNumber?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
};

export type CreateGourmetRequestDto = {
  name: Scalars['String'];
  desc: Scalars['String'];
  category: GourmetCategory;
  score: Scalars['Int'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  images?: Maybe<Scalars['String']>;
};

export type EditGourmetRequestDto = {
  name?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  category?: Maybe<GourmetCategory>;
  score?: Maybe<Scalars['Int']>;
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  address?: Maybe<Scalars['String']>;
  images?: Maybe<Scalars['String']>;
};

export type CreateGourmetCommentRequestDto = {
  body: Scalars['String'];
  score: Scalars['Int'];
  images?: Maybe<Scalars['String']>;
};

export type EditGourmetCommentRequestDto = {
  body?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  images?: Maybe<Scalars['String']>;
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
  file?: Maybe<Scalars['Upload']>;
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

export type CreateBoardCommentReplyMutationVariables = Exact<{
  body: Scalars['String'];
  boardCommentId: Scalars['String'];
}>;


export type CreateBoardCommentReplyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createBoardCommentReply'>
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

export type DeleteBoardCommentReplyMutationVariables = Exact<{
  boardCommentReplyId: Scalars['String'];
}>;


export type DeleteBoardCommentReplyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBoardCommentReply'>
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

export type EditBoardCommentReplyMutationVariables = Exact<{
  input: EditBoardCommentReplyRequestDto;
  boardCommentReplyId: Scalars['String'];
}>;


export type EditBoardCommentReplyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editBoardCommentReply'>
);

export type GetBoardQueryVariables = Exact<{
  boardId: Scalars['String'];
  isRefetch?: Maybe<Scalars['Boolean']>;
}>;


export type GetBoardQuery = (
  { __typename?: 'Query' }
  & { getBoard: (
    { __typename?: 'Board' }
    & Pick<Board, 'id' | 'title' | 'desc' | 'view' | 'category' | 'filepath' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'Auth' }
      & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
    ), comments: Array<(
      { __typename?: 'BoardComment' }
      & Pick<BoardComment, 'id' | 'body' | 'createdAt'>
      & { user: (
        { __typename?: 'Auth' }
        & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
      ), boardCommentReplies: Array<(
        { __typename?: 'BoardCommentReply' }
        & Pick<BoardCommentReply, 'id' | 'body' | 'createdAt'>
        & { user: (
          { __typename?: 'Auth' }
          & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
        ) }
      )> }
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

export type GetMainDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMainDataQuery = (
  { __typename?: 'Query' }
  & { getNoticeList: Array<(
    { __typename?: 'GetNoticeListResponseDto' }
    & Pick<GetNoticeListResponseDto, 'id' | 'title' | 'createdAt'>
  )>, krBoardList: Array<(
    { __typename?: 'GetNewsListResponse' }
    & GetNewsListFieldsFragment
  )>, jpBoardList: Array<(
    { __typename?: 'GetNewsListResponse' }
    & GetNewsListFieldsFragment
  )>, usBoardList: Array<(
    { __typename?: 'GetNewsListResponse' }
    & GetNewsListFieldsFragment
  )>, tradeBoardList: Array<(
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
  )>, getOpenchatList: Array<(
    { __typename?: 'GetOpenchatListResponseDto' }
    & Pick<GetOpenchatListResponseDto, 'id' | 'name' | 'category' | 'participationNumber' | 'link' | 'createdAt'>
  )> }
);

export type CreateGourmetMutationVariables = Exact<{
  input: CreateGourmetRequestDto;
}>;


export type CreateGourmetMutation = (
  { __typename?: 'Mutation' }
  & { createGourmet: (
    { __typename?: 'Gourmet' }
    & Pick<Gourmet, 'id'>
  ) }
);

export type CreateGourmetCommentMutationVariables = Exact<{
  gourmetId: Scalars['String'];
  input: CreateGourmetCommentRequestDto;
}>;


export type CreateGourmetCommentMutation = (
  { __typename?: 'Mutation' }
  & { createGourmetComment: (
    { __typename?: 'GourmetComment' }
    & Pick<GourmetComment, 'id'>
  ) }
);

export type DeleteGourmetMutationVariables = Exact<{
  gourmetId: Scalars['String'];
}>;


export type DeleteGourmetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGourmet'>
);

export type DeleteGourmetCommentMutationVariables = Exact<{
  gourmetCommentId: Scalars['String'];
}>;


export type DeleteGourmetCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGourmetComment'>
);

export type EditGourmetMutationVariables = Exact<{
  input: EditGourmetRequestDto;
  gourmetId: Scalars['String'];
}>;


export type EditGourmetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editGourmet'>
);

export type EditGourmetCommentMutationVariables = Exact<{
  gourmetCommentId: Scalars['String'];
  input: EditGourmetCommentRequestDto;
}>;


export type EditGourmetCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editGourmetComment'>
);

export type GetGourmetQueryVariables = Exact<{
  gourmetId: Scalars['String'];
}>;


export type GetGourmetQuery = (
  { __typename?: 'Query' }
  & { getGourmet: (
    { __typename?: 'GetGourmetResponseDto' }
    & Pick<GetGourmetResponseDto, 'id' | 'name' | 'desc' | 'category' | 'score' | 'lat' | 'lng' | 'images' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'Auth' }
      & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
    ), comments: Array<(
      { __typename?: 'GourmetComment' }
      & Pick<GourmetComment, 'id'>
      & { user: (
        { __typename?: 'Auth' }
        & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
      ) }
    )> }
  ) }
);

export type GetGourmetListQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
  category?: Maybe<GourmetCategory>;
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
}>;


export type GetGourmetListQuery = (
  { __typename?: 'Query' }
  & { getGourmetList: Array<(
    { __typename?: 'GetGourmetListResponseDto' }
    & Pick<GetGourmetListResponseDto, 'id' | 'name' | 'desc' | 'category' | 'score' | 'lat' | 'lng' | 'address' | 'images' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'Auth' }
      & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
    ) }
  )> }
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

export type GetNoticeListQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
}>;


export type GetNoticeListQuery = (
  { __typename?: 'Query' }
  & { getNoticeList: Array<(
    { __typename?: 'GetNoticeListResponseDto' }
    & Pick<GetNoticeListResponseDto, 'id' | 'title' | 'desc' | 'view' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'Auth' }
      & Pick<Auth, 'id' | 'username' | 'email' | 'avatar'>
    ) }
  )> }
);

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadFile'>
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
    mutation createBoard($file: Upload, $input: CreateBoardRequestDto!) {
  createBoard(file: $file, input: $input)
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
 *      file: // value for 'file'
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
    mutation createBoardComment($input: CreateBoardCommentRequestDto!, $boardId: String!) {
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
export const CreateBoardCommentReplyDocument = gql`
    mutation createBoardCommentReply($body: String!, $boardCommentId: String!) {
  createBoardCommentReply(boardCommentId: $boardCommentId, body: $body)
}
    `;
export type CreateBoardCommentReplyMutationFn = Apollo.MutationFunction<CreateBoardCommentReplyMutation, CreateBoardCommentReplyMutationVariables>;

/**
 * __useCreateBoardCommentReplyMutation__
 *
 * To run a mutation, you first call `useCreateBoardCommentReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardCommentReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardCommentReplyMutation, { data, loading, error }] = useCreateBoardCommentReplyMutation({
 *   variables: {
 *      body: // value for 'body'
 *      boardCommentId: // value for 'boardCommentId'
 *   },
 * });
 */
export function useCreateBoardCommentReplyMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardCommentReplyMutation, CreateBoardCommentReplyMutationVariables>) {
        return Apollo.useMutation<CreateBoardCommentReplyMutation, CreateBoardCommentReplyMutationVariables>(CreateBoardCommentReplyDocument, baseOptions);
      }
export type CreateBoardCommentReplyMutationHookResult = ReturnType<typeof useCreateBoardCommentReplyMutation>;
export type CreateBoardCommentReplyMutationResult = Apollo.MutationResult<CreateBoardCommentReplyMutation>;
export type CreateBoardCommentReplyMutationOptions = Apollo.BaseMutationOptions<CreateBoardCommentReplyMutation, CreateBoardCommentReplyMutationVariables>;
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
export const DeleteBoardCommentReplyDocument = gql`
    mutation deleteBoardCommentReply($boardCommentReplyId: String!) {
  deleteBoardCommentReply(boardCommentReplyId: $boardCommentReplyId)
}
    `;
export type DeleteBoardCommentReplyMutationFn = Apollo.MutationFunction<DeleteBoardCommentReplyMutation, DeleteBoardCommentReplyMutationVariables>;

/**
 * __useDeleteBoardCommentReplyMutation__
 *
 * To run a mutation, you first call `useDeleteBoardCommentReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardCommentReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardCommentReplyMutation, { data, loading, error }] = useDeleteBoardCommentReplyMutation({
 *   variables: {
 *      boardCommentReplyId: // value for 'boardCommentReplyId'
 *   },
 * });
 */
export function useDeleteBoardCommentReplyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBoardCommentReplyMutation, DeleteBoardCommentReplyMutationVariables>) {
        return Apollo.useMutation<DeleteBoardCommentReplyMutation, DeleteBoardCommentReplyMutationVariables>(DeleteBoardCommentReplyDocument, baseOptions);
      }
export type DeleteBoardCommentReplyMutationHookResult = ReturnType<typeof useDeleteBoardCommentReplyMutation>;
export type DeleteBoardCommentReplyMutationResult = Apollo.MutationResult<DeleteBoardCommentReplyMutation>;
export type DeleteBoardCommentReplyMutationOptions = Apollo.BaseMutationOptions<DeleteBoardCommentReplyMutation, DeleteBoardCommentReplyMutationVariables>;
export const EditBoardDocument = gql`
    mutation editBoard($boardId: String!, $input: EditBoardRequestDto!) {
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
    mutation editBoardComment($input: EditBoardCommentRequestDto!, $boardCommentId: String!) {
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
export const EditBoardCommentReplyDocument = gql`
    mutation editBoardCommentReply($input: EditBoardCommentReplyRequestDto!, $boardCommentReplyId: String!) {
  editBoardCommentReply(input: $input, boardCommentReplyId: $boardCommentReplyId)
}
    `;
export type EditBoardCommentReplyMutationFn = Apollo.MutationFunction<EditBoardCommentReplyMutation, EditBoardCommentReplyMutationVariables>;

/**
 * __useEditBoardCommentReplyMutation__
 *
 * To run a mutation, you first call `useEditBoardCommentReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBoardCommentReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBoardCommentReplyMutation, { data, loading, error }] = useEditBoardCommentReplyMutation({
 *   variables: {
 *      input: // value for 'input'
 *      boardCommentReplyId: // value for 'boardCommentReplyId'
 *   },
 * });
 */
export function useEditBoardCommentReplyMutation(baseOptions?: Apollo.MutationHookOptions<EditBoardCommentReplyMutation, EditBoardCommentReplyMutationVariables>) {
        return Apollo.useMutation<EditBoardCommentReplyMutation, EditBoardCommentReplyMutationVariables>(EditBoardCommentReplyDocument, baseOptions);
      }
export type EditBoardCommentReplyMutationHookResult = ReturnType<typeof useEditBoardCommentReplyMutation>;
export type EditBoardCommentReplyMutationResult = Apollo.MutationResult<EditBoardCommentReplyMutation>;
export type EditBoardCommentReplyMutationOptions = Apollo.BaseMutationOptions<EditBoardCommentReplyMutation, EditBoardCommentReplyMutationVariables>;
export const GetBoardDocument = gql`
    query getBoard($boardId: String!, $isRefetch: Boolean) {
  getBoard(boardId: $boardId, isRefetch: $isRefetch) {
    id
    title
    desc
    view
    category
    filepath
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
      boardCommentReplies {
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
export const GetMainDataDocument = gql`
    query getMainData {
  getNoticeList(limit: 4) {
    id
    title
    createdAt
  }
  krBoardList: getNewsList(flag: KR) {
    ...getNewsListFields
  }
  jpBoardList: getNewsList(flag: JP) {
    ...getNewsListFields
  }
  usBoardList: getNewsList(flag: US) {
    ...getNewsListFields
  }
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
  getOpenchatList {
    id
    name
    category
    participationNumber
    link
    createdAt
  }
}
    ${GetNewsListFieldsFragmentDoc}
${GetBoardListByCategoryFieldsFragmentDoc}`;

/**
 * __useGetMainDataQuery__
 *
 * To run a query within a React component, call `useGetMainDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMainDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMainDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMainDataQuery(baseOptions?: Apollo.QueryHookOptions<GetMainDataQuery, GetMainDataQueryVariables>) {
        return Apollo.useQuery<GetMainDataQuery, GetMainDataQueryVariables>(GetMainDataDocument, baseOptions);
      }
export function useGetMainDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMainDataQuery, GetMainDataQueryVariables>) {
          return Apollo.useLazyQuery<GetMainDataQuery, GetMainDataQueryVariables>(GetMainDataDocument, baseOptions);
        }
export type GetMainDataQueryHookResult = ReturnType<typeof useGetMainDataQuery>;
export type GetMainDataLazyQueryHookResult = ReturnType<typeof useGetMainDataLazyQuery>;
export type GetMainDataQueryResult = Apollo.QueryResult<GetMainDataQuery, GetMainDataQueryVariables>;
export const CreateGourmetDocument = gql`
    mutation createGourmet($input: CreateGourmetRequestDto!) {
  createGourmet(input: $input) {
    id
  }
}
    `;
export type CreateGourmetMutationFn = Apollo.MutationFunction<CreateGourmetMutation, CreateGourmetMutationVariables>;

/**
 * __useCreateGourmetMutation__
 *
 * To run a mutation, you first call `useCreateGourmetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGourmetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGourmetMutation, { data, loading, error }] = useCreateGourmetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGourmetMutation(baseOptions?: Apollo.MutationHookOptions<CreateGourmetMutation, CreateGourmetMutationVariables>) {
        return Apollo.useMutation<CreateGourmetMutation, CreateGourmetMutationVariables>(CreateGourmetDocument, baseOptions);
      }
export type CreateGourmetMutationHookResult = ReturnType<typeof useCreateGourmetMutation>;
export type CreateGourmetMutationResult = Apollo.MutationResult<CreateGourmetMutation>;
export type CreateGourmetMutationOptions = Apollo.BaseMutationOptions<CreateGourmetMutation, CreateGourmetMutationVariables>;
export const CreateGourmetCommentDocument = gql`
    mutation createGourmetComment($gourmetId: String!, $input: CreateGourmetCommentRequestDto!) {
  createGourmetComment(gourmetId: $gourmetId, input: $input) {
    id
  }
}
    `;
export type CreateGourmetCommentMutationFn = Apollo.MutationFunction<CreateGourmetCommentMutation, CreateGourmetCommentMutationVariables>;

/**
 * __useCreateGourmetCommentMutation__
 *
 * To run a mutation, you first call `useCreateGourmetCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGourmetCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGourmetCommentMutation, { data, loading, error }] = useCreateGourmetCommentMutation({
 *   variables: {
 *      gourmetId: // value for 'gourmetId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGourmetCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateGourmetCommentMutation, CreateGourmetCommentMutationVariables>) {
        return Apollo.useMutation<CreateGourmetCommentMutation, CreateGourmetCommentMutationVariables>(CreateGourmetCommentDocument, baseOptions);
      }
export type CreateGourmetCommentMutationHookResult = ReturnType<typeof useCreateGourmetCommentMutation>;
export type CreateGourmetCommentMutationResult = Apollo.MutationResult<CreateGourmetCommentMutation>;
export type CreateGourmetCommentMutationOptions = Apollo.BaseMutationOptions<CreateGourmetCommentMutation, CreateGourmetCommentMutationVariables>;
export const DeleteGourmetDocument = gql`
    mutation deleteGourmet($gourmetId: String!) {
  deleteGourmet(gourmetId: $gourmetId)
}
    `;
export type DeleteGourmetMutationFn = Apollo.MutationFunction<DeleteGourmetMutation, DeleteGourmetMutationVariables>;

/**
 * __useDeleteGourmetMutation__
 *
 * To run a mutation, you first call `useDeleteGourmetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGourmetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGourmetMutation, { data, loading, error }] = useDeleteGourmetMutation({
 *   variables: {
 *      gourmetId: // value for 'gourmetId'
 *   },
 * });
 */
export function useDeleteGourmetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGourmetMutation, DeleteGourmetMutationVariables>) {
        return Apollo.useMutation<DeleteGourmetMutation, DeleteGourmetMutationVariables>(DeleteGourmetDocument, baseOptions);
      }
export type DeleteGourmetMutationHookResult = ReturnType<typeof useDeleteGourmetMutation>;
export type DeleteGourmetMutationResult = Apollo.MutationResult<DeleteGourmetMutation>;
export type DeleteGourmetMutationOptions = Apollo.BaseMutationOptions<DeleteGourmetMutation, DeleteGourmetMutationVariables>;
export const DeleteGourmetCommentDocument = gql`
    mutation deleteGourmetComment($gourmetCommentId: String!) {
  deleteGourmetComment(gourmetCommentId: $gourmetCommentId)
}
    `;
export type DeleteGourmetCommentMutationFn = Apollo.MutationFunction<DeleteGourmetCommentMutation, DeleteGourmetCommentMutationVariables>;

/**
 * __useDeleteGourmetCommentMutation__
 *
 * To run a mutation, you first call `useDeleteGourmetCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGourmetCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGourmetCommentMutation, { data, loading, error }] = useDeleteGourmetCommentMutation({
 *   variables: {
 *      gourmetCommentId: // value for 'gourmetCommentId'
 *   },
 * });
 */
export function useDeleteGourmetCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGourmetCommentMutation, DeleteGourmetCommentMutationVariables>) {
        return Apollo.useMutation<DeleteGourmetCommentMutation, DeleteGourmetCommentMutationVariables>(DeleteGourmetCommentDocument, baseOptions);
      }
export type DeleteGourmetCommentMutationHookResult = ReturnType<typeof useDeleteGourmetCommentMutation>;
export type DeleteGourmetCommentMutationResult = Apollo.MutationResult<DeleteGourmetCommentMutation>;
export type DeleteGourmetCommentMutationOptions = Apollo.BaseMutationOptions<DeleteGourmetCommentMutation, DeleteGourmetCommentMutationVariables>;
export const EditGourmetDocument = gql`
    mutation editGourmet($input: EditGourmetRequestDto!, $gourmetId: String!) {
  editGourmet(input: $input, gourmetId: $gourmetId)
}
    `;
export type EditGourmetMutationFn = Apollo.MutationFunction<EditGourmetMutation, EditGourmetMutationVariables>;

/**
 * __useEditGourmetMutation__
 *
 * To run a mutation, you first call `useEditGourmetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditGourmetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editGourmetMutation, { data, loading, error }] = useEditGourmetMutation({
 *   variables: {
 *      input: // value for 'input'
 *      gourmetId: // value for 'gourmetId'
 *   },
 * });
 */
export function useEditGourmetMutation(baseOptions?: Apollo.MutationHookOptions<EditGourmetMutation, EditGourmetMutationVariables>) {
        return Apollo.useMutation<EditGourmetMutation, EditGourmetMutationVariables>(EditGourmetDocument, baseOptions);
      }
export type EditGourmetMutationHookResult = ReturnType<typeof useEditGourmetMutation>;
export type EditGourmetMutationResult = Apollo.MutationResult<EditGourmetMutation>;
export type EditGourmetMutationOptions = Apollo.BaseMutationOptions<EditGourmetMutation, EditGourmetMutationVariables>;
export const EditGourmetCommentDocument = gql`
    mutation editGourmetComment($gourmetCommentId: String!, $input: EditGourmetCommentRequestDto!) {
  editGourmetComment(gourmetCommentId: $gourmetCommentId, input: $input)
}
    `;
export type EditGourmetCommentMutationFn = Apollo.MutationFunction<EditGourmetCommentMutation, EditGourmetCommentMutationVariables>;

/**
 * __useEditGourmetCommentMutation__
 *
 * To run a mutation, you first call `useEditGourmetCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditGourmetCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editGourmetCommentMutation, { data, loading, error }] = useEditGourmetCommentMutation({
 *   variables: {
 *      gourmetCommentId: // value for 'gourmetCommentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditGourmetCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditGourmetCommentMutation, EditGourmetCommentMutationVariables>) {
        return Apollo.useMutation<EditGourmetCommentMutation, EditGourmetCommentMutationVariables>(EditGourmetCommentDocument, baseOptions);
      }
export type EditGourmetCommentMutationHookResult = ReturnType<typeof useEditGourmetCommentMutation>;
export type EditGourmetCommentMutationResult = Apollo.MutationResult<EditGourmetCommentMutation>;
export type EditGourmetCommentMutationOptions = Apollo.BaseMutationOptions<EditGourmetCommentMutation, EditGourmetCommentMutationVariables>;
export const GetGourmetDocument = gql`
    query getGourmet($gourmetId: String!) {
  getGourmet(gourmetId: $gourmetId) {
    id
    name
    desc
    category
    score
    lat
    lng
    images
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
      user {
        id
        username
        email
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetGourmetQuery__
 *
 * To run a query within a React component, call `useGetGourmetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGourmetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGourmetQuery({
 *   variables: {
 *      gourmetId: // value for 'gourmetId'
 *   },
 * });
 */
export function useGetGourmetQuery(baseOptions?: Apollo.QueryHookOptions<GetGourmetQuery, GetGourmetQueryVariables>) {
        return Apollo.useQuery<GetGourmetQuery, GetGourmetQueryVariables>(GetGourmetDocument, baseOptions);
      }
export function useGetGourmetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGourmetQuery, GetGourmetQueryVariables>) {
          return Apollo.useLazyQuery<GetGourmetQuery, GetGourmetQueryVariables>(GetGourmetDocument, baseOptions);
        }
export type GetGourmetQueryHookResult = ReturnType<typeof useGetGourmetQuery>;
export type GetGourmetLazyQueryHookResult = ReturnType<typeof useGetGourmetLazyQuery>;
export type GetGourmetQueryResult = Apollo.QueryResult<GetGourmetQuery, GetGourmetQueryVariables>;
export const GetGourmetListDocument = gql`
    query getGourmetList($search: String, $category: GourmetCategory, $limit: Float, $offset: Float, $score: Float, $lat: Float!, $lng: Float!) {
  getGourmetList(search: $search, category: $category, limit: $limit, offset: $offset, score: $score, lat: $lat, lng: $lng) {
    id
    name
    desc
    category
    score
    lat
    lng
    address
    images
    createdAt
    updatedAt
    user {
      id
      username
      email
      avatar
    }
  }
}
    `;

/**
 * __useGetGourmetListQuery__
 *
 * To run a query within a React component, call `useGetGourmetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGourmetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGourmetListQuery({
 *   variables: {
 *      search: // value for 'search'
 *      category: // value for 'category'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      score: // value for 'score'
 *      lat: // value for 'lat'
 *      lng: // value for 'lng'
 *   },
 * });
 */
export function useGetGourmetListQuery(baseOptions?: Apollo.QueryHookOptions<GetGourmetListQuery, GetGourmetListQueryVariables>) {
        return Apollo.useQuery<GetGourmetListQuery, GetGourmetListQueryVariables>(GetGourmetListDocument, baseOptions);
      }
export function useGetGourmetListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGourmetListQuery, GetGourmetListQueryVariables>) {
          return Apollo.useLazyQuery<GetGourmetListQuery, GetGourmetListQueryVariables>(GetGourmetListDocument, baseOptions);
        }
export type GetGourmetListQueryHookResult = ReturnType<typeof useGetGourmetListQuery>;
export type GetGourmetListLazyQueryHookResult = ReturnType<typeof useGetGourmetListLazyQuery>;
export type GetGourmetListQueryResult = Apollo.QueryResult<GetGourmetListQuery, GetGourmetListQueryVariables>;
export const GetNewsListDocument = gql`
    query GetNewsList {
  krBoardList: getNewsList(flag: KR) {
    ...getNewsListFields
  }
  jpBoardList: getNewsList(flag: JP) {
    ...getNewsListFields
  }
  usBoardList: getNewsList(flag: US) {
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
export const GetNoticeListDocument = gql`
    query getNoticeList($search: String, $limit: Float, $offset: Float) {
  getNoticeList(search: $search, limit: $limit, offset: $offset) {
    id
    title
    desc
    view
    createdAt
    updatedAt
    user {
      id
      username
      email
      avatar
    }
  }
}
    `;

/**
 * __useGetNoticeListQuery__
 *
 * To run a query within a React component, call `useGetNoticeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoticeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoticeListQuery({
 *   variables: {
 *      search: // value for 'search'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetNoticeListQuery(baseOptions?: Apollo.QueryHookOptions<GetNoticeListQuery, GetNoticeListQueryVariables>) {
        return Apollo.useQuery<GetNoticeListQuery, GetNoticeListQueryVariables>(GetNoticeListDocument, baseOptions);
      }
export function useGetNoticeListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoticeListQuery, GetNoticeListQueryVariables>) {
          return Apollo.useLazyQuery<GetNoticeListQuery, GetNoticeListQueryVariables>(GetNoticeListDocument, baseOptions);
        }
export type GetNoticeListQueryHookResult = ReturnType<typeof useGetNoticeListQuery>;
export type GetNoticeListLazyQueryHookResult = ReturnType<typeof useGetNoticeListLazyQuery>;
export type GetNoticeListQueryResult = Apollo.QueryResult<GetNoticeListQuery, GetNoticeListQueryVariables>;
export const UploadFileDocument = gql`
    mutation uploadFile($file: Upload!) {
  uploadFile(file: $file)
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, baseOptions);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;

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
        "name": "BoardCommentReplyInterface",
        "possibleTypes": [
          {
            "name": "BoardCommentReply"
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
        "name": "GourmetCommentInterface",
        "possibleTypes": [
          {
            "name": "GourmetComment"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "GourmetInterface",
        "possibleTypes": [
          {
            "name": "Gourmet"
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
      },
      {
        "kind": "INTERFACE",
        "name": "OpenchatInterface",
        "possibleTypes": [
          {
            "name": "Openchat"
          }
        ]
      }
    ]
  }
};
      export default result;
    