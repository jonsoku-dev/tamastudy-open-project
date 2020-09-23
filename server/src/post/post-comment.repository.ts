
import { EntityRepository, Repository } from 'typeorm/index';
import { Auth } from '../auth/entities/auth.entity';
import { InternalServerErrorException, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common';
import { PostComment } from './post-comment.entity';
import { CreatePostCommentRequest } from './request/create-post-comment.request';
import { EditPostCommentRequest } from './request/edit-post-comment.request';

@EntityRepository(PostComment)
export class PostCommentRepository extends Repository<PostComment> {
  private logger = new Logger('PostCommentRepository');

  async createPostComment(user: Auth, postId: string, createPostCommentRequest: CreatePostCommentRequest) {
    try {
      const query = this.createQueryBuilder('post_comment');
      const result = await query
        .insert()
        .into(PostComment)
        .values({
          userId: user.id,
          postId: postId,
          ...createPostCommentRequest,
        })
        .execute();
      return 'success';
    } catch (e) {
      this.logger.error(`post comment 생성에 문제가 생겼습니다.`);
      throw new InternalServerErrorException(`post comment 생성에 문제가 생겼습니다.`, e.stack);
    }
  }

  async getAuthorPostComment(user: Auth, postCommentId: string) {
    const query = this.createQueryBuilder('post_comment');
    const found = await query
      .where('post_comment.id = :id', { id: postCommentId })
      .cache(true)
      .getOne();
    if (!found) {
      this.logger.error('댓글을 찾을 수 없습니다. ');
      throw new NotFoundException();
    }
    if (found.userId !== user.id) {
      this.logger.error('권한이 없습니다.');
      throw new UnauthorizedException();
    }
    return found;
  }

  async editPostComment(user: Auth, postCommentId: string, editPostCommentRequest: EditPostCommentRequest) {
    const found = await this.getAuthorPostComment(user, postCommentId);
    const query = this.createQueryBuilder('post_comment');
    try {
      const result = await query
        .update(PostComment)
        .set({
          ...editPostCommentRequest,
        })
        .where(('post_comment.id = :postCommentId'), { postCommentId: found.id })
        .execute();
      return 'success';
    } catch (e) {
      this.logger.error(`post comment 수정에 문제가 생겼습니다.`);
      throw new InternalServerErrorException(`post comment 수정에 문제가 생겼습니다.`);
    }
  }

  async deletePostComment(user: Auth, postCommentId: string) {
    const found = await this.getAuthorPostComment(user, postCommentId);
    const query = this.createQueryBuilder('post_comment');
    const result = await query
      .delete()
      .from(PostComment)
      .where(('post_comment.id = :postCommentId'), { postCommentId: found.id })
      .execute();
    if (result.affected === 1) {
      this.logger.verbose(`포스트 댓글 삭제 성공! postCommentId: ${postCommentId}`);
      return postCommentId;
    } else {
      this.logger.warn(`포스트 댓글 삭제 실패... postCommentId: ${postCommentId}`);
      return postCommentId;
    }
  }
}