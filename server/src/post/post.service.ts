import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';
import { CreatePostRequest } from './request/create-post.request';
import { GetPostListFilter } from './filter/get-post-list.filter';
import { EditPostRequest } from './request/edit-post.request';
import { Auth } from '../auth/entities/auth.entity';
import { CreatePostCommentRequest } from './request/create-post-comment.request';
import { EditPostCommentRequest } from './request/edit-post-comment.request';
import { PostCommentRepository } from './post-comment.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(PostCommentRepository)
    private postCommentRepository: PostCommentRepository,
  ) {
  }

  getPostList(getPostListFilter: GetPostListFilter): Promise<Post[]> {
    return this.postRepository.getPostList(getPostListFilter);
  }

  getPost(id: string): Promise<Post> {
    return this.postRepository.getPost(id);
  }

  createPost(user: Auth, createPostRequest: CreatePostRequest) {
    return this.postRepository.createPost(user, createPostRequest);
  }

  editPost(id: string, user: Auth, editPostRequest: EditPostRequest): Promise<string> {
    return this.postRepository.editPost(id, user, editPostRequest);
  }

  deletePost(id: string, user: Auth): Promise<string> {
    return this.postRepository.deletePost(id, user);
  }

  createPostComment(user: Auth, postId: string, createPostCommentRequest: CreatePostCommentRequest) {
    return this.postCommentRepository.createPostComment(user, postId, createPostCommentRequest);
  }

  editPostComment(user: Auth, postCommentId: string, editPostCommentRequest: EditPostCommentRequest) {
    return this.postCommentRepository.editPostComment(user, postCommentId, editPostCommentRequest);
  }

  deletePostComment(user: Auth, postCommentId: string) {
    return this.postCommentRepository.deletePostComment(user, postCommentId);
  }
}
