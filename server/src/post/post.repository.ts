import { EntityRepository, Repository } from 'typeorm/index';
import { Post } from './post.entity';
import { CreatePostRequest } from './request/create-post.request';
import { InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GetPostListFilter } from './filter/get-post-list.filter';
import { EditPostRequest } from './request/edit-post.request';
import { Auth } from '../auth/entities/auth.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  private logger = new Logger('PostRepository');

  async getPostList(getPostListFilter: GetPostListFilter) {
    const query = this.createQueryBuilder('post');
    if (getPostListFilter) {
      const { search } = getPostListFilter;
      if (search) {
        query.andWhere('(post.content LIKE :search)', { search: `%${search}%` });
      }
    }
    try {
      return await query
        .cache(true)
        .getMany();
    } catch (e) {
      this.logger.error(`Failed to get post list. DTO: ${JSON.stringify(getPostListFilter)}`, e.stack);
      throw new InternalServerErrorException();
    }
  }

  async getPost(id: string): Promise<Post> {
    const query = this.createQueryBuilder('post');
    const found = await query
      .where(('post.id = :id'), { id })
      .cache(true)
      .getOne();
    if (!found) {
      throw new NotFoundException(`"Post id : ${id}"를 찾을 수 없습니다. `);
    }
    return found;
  }

  async getAuthorPost(id: string, user: Auth): Promise<Post> {
    const found = await this.getPost(id);
    if (user.id !== found.userId) {
      throw new UnauthorizedException('권한이 없습니다. ');
    }
    return found;
  }

  async createPost(user: Auth, createPostRequest: CreatePostRequest) {
    const query = this.createQueryBuilder('post');
    try {
      await query
        .insert()
        .into(Post)
        .values({
          ...createPostRequest,
          userId: user.id,
        })
        .execute();
      this.logger.error(`포스트 생성 성공`);
      return 'success';
    } catch (e) {
      this.logger.error(`post 생성에 문제가 생겼습니다.`);
      throw new InternalServerErrorException(`post 생성에 문제가 생겼습니다.`, e.stack);
    }
  }

  async editPost(postId: string, user: Auth, editPostRequest: EditPostRequest): Promise<string> {
    const found = await this.getAuthorPost(postId, user);
    const query = this.createQueryBuilder('post');
    const result = await query
      .where('id = :postId', { postId: found.id })
      .update(Post)
      .set({
        ...editPostRequest,
      })
      .execute();
    if (result.affected === 1) {
      this.logger.verbose(`포스트 업데이트 성공! postId: ${postId}`);
      return postId;
    } else {
      this.logger.warn(`포스트 업데이트 실패... postId: ${postId}`);
      throw new InternalServerErrorException(`Post 업데이트 실패... postId: ${postId}`)
    }
  }

  async deletePost(postId: string, user: Auth): Promise<string> {
    const found = await this.getAuthorPost(postId, user);
    const query = this.createQueryBuilder('post');
    const result = await query
      .where('id = :postId', { postId: found.id })
      .delete()
      .from(Post)
      .execute();
    if (result.affected === 1) {
      this.logger.verbose(`포스트 삭제 성공! postId: ${postId}`);
      return postId;
    } else {
      this.logger.warn(`포스트 삭제 실패... postId: ${postId}`);
      throw new InternalServerErrorException(`Post 삭제 실패... postId: ${postId}`)
    }
  }
}