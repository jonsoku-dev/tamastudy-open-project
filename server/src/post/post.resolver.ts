import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostRequest } from './request/create-post.request';
import { GetPostListFilter } from './filter/get-post-list.filter';
import { EditPostRequest } from './request/edit-post.request';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/graphql-auth.guard';
import { CurrentUser } from '../auth/decorator/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';
import { EditPostCommentRequest } from './request/edit-post-comment.request';
import { CreatePostCommentRequest } from './request/create-post-comment.request';

@Resolver()
export class PostResolver {
  constructor(
    private postService: PostService,
  ) {
  }

  @Query(() => [Post])
  getPostList(
    @Args('filter', { nullable: true }) getPostListFilter: GetPostListFilter,
  ): Promise<Post[]> {
    return this.postService.getPostList(getPostListFilter);
  }

  @Query(() => Post)
  getPost(
    @Args('postId') id: string,
  ): Promise<Post> {
    return this.postService.getPost(id);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args('input') createPostRequest: CreatePostRequest,
    @CurrentUser() user: Auth,
  ) {
    return this.postService.createPost(user, createPostRequest);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  editPost(
    @CurrentUser() user: Auth,
    @Args('postId') id: string,
    @Args('input') editPostRequest: EditPostRequest,
  ): Promise<string> {
    return this.postService.editPost(id, user, editPostRequest);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  deletePost(
    @Args('postId') id: string,
    @CurrentUser() user: Auth,
  ): Promise<string> {
    return this.postService.deletePost(id, user);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  createPostComment(
    @CurrentUser() user: Auth,
    @Args('postId') postId: string,
    @Args('input') createPostCommentRequest: CreatePostCommentRequest,
  ) {
    return this.postService.createPostComment(user, postId, createPostCommentRequest);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  editPostComment(
    @CurrentUser() user: Auth,
    @Args('postCommentId') postCommentId: string,
    @Args('input') editPostCommentRequest: EditPostCommentRequest,
  ) {
    return this.postService.editPostComment(user, postCommentId, editPostCommentRequest);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  deletePostComment(
    @CurrentUser() user: Auth,
    @Args('postCommentId') postCommentId: string,
  ) {
    return this.postService.deletePostComment(user, postCommentId);
  }
}