import { EntityRepository, Repository } from 'typeorm/index';
import { BoardLike } from '../entities/board-like.entity';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@EntityRepository(BoardLike)
export class BoardLikeRepository extends Repository<BoardLike> {
  private logger = new Logger('BoardLikeRepository');

  async like(userId: string, boardId: string) {
    console.log(userId);
    console.log(boardId);
    try {
      const query = this.createQueryBuilder();
      const result = await query
        .insert()
        .into(BoardLike)
        .values({
          boardId: boardId,
          userId: userId,
        })
        .execute();
      return 'success';
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('이미 좋아요를 하셨습니다~ ');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async unLike(userId: string, boardId: string) {
    const query = this.createQueryBuilder();
    const result = await query
      .andWhere('boardId = :boardId', { boardId })
      .andWhere('userId = :userId', { userId })
      .delete()
      .from(BoardLike)
      .execute();
    if (result.affected === 1) {
      this.logger.verbose(`unLike 성공! boardId: ${boardId}`);
      return boardId;
    } else {
      this.logger.warn(`unLike 실패... boardId: ${boardId}`);
      throw new InternalServerErrorException(
        `unLike 실패... boardId: ${boardId}`,
      );
    }
  }
}
