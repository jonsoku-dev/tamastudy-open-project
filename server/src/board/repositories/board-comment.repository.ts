import { EntityRepository, Repository } from 'typeorm/index';
import { BoardComment } from '../entities/board-comment.entity';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from '../../auth/entities/auth.entity';
import { createBoardCommentRequestDto } from '../dto/create-board-comment-request.dto';
import { editBoardCommentRequestDto } from '../dto/edit-board-comment-request.dto';

@EntityRepository(BoardComment)
export class BoardCommentRepository extends Repository<BoardComment> {
  private logger = new Logger('BoardCommentRepository');

  async createBoardComment(
    user: Auth,
    boardId: string,
    createBoardCommentRequestDto: createBoardCommentRequestDto,
  ) {
    try {
      const query = this.createQueryBuilder('board_comment');
      await query
        .insert()
        .into(BoardComment)
        .values({
          userId: user.id,
          boardId: boardId,
          ...createBoardCommentRequestDto,
        })
        .execute();
      return 'success';
    } catch (e) {
      this.logger.error(`board comment 생성에 문제가 생겼습니다.`);
      throw new InternalServerErrorException(
        `board comment 생성에 문제가 생겼습니다.`,
        e.stack,
      );
    }
  }

  async getAuthorBoardComment(user: Auth, boardCommentId: string) {
    const query = this.createQueryBuilder('board_comment');
    const found = await query
      .where('board_comment.id = :id', { id: boardCommentId })
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

  async editBoardComment(
    user: Auth,
    boardCommentId: string,
    editBoardCommentRequestDto: editBoardCommentRequestDto,
  ) {
    const found = await this.getAuthorBoardComment(user, boardCommentId);
    const query = this.createQueryBuilder('board_comment');
    try {
      await query
        .update(BoardComment)
        .set({
          ...editBoardCommentRequestDto,
        })
        .where('board_comment.id = :boardCommentId', {
          boardCommentId: found.id,
        })
        .execute();
      return 'success';
    } catch (e) {
      this.logger.error(`board comment 수정에 문제가 생겼습니다.`);
      throw new InternalServerErrorException(
        `board comment 수정에 문제가 생겼습니다.`,
      );
    }
  }

  async deleteBoardComment(user: Auth, boardCommentId: string) {
    const found = await this.getAuthorBoardComment(user, boardCommentId);
    const query = this.createQueryBuilder('board_comment');
    const result = await query
      .delete()
      .from(BoardComment)
      .where('board_comment.id = :boardCommentId', { boardCommentId: found.id })
      .execute();
    if (result.affected === 1) {
      this.logger.verbose(
        `Board 댓글 삭제 성공! boardCommentId: ${boardCommentId}`,
      );
      return boardCommentId;
    } else {
      this.logger.warn(
        `Board 댓글 삭제 실패... boardCommentId: ${boardCommentId}`,
      );
      throw new InternalServerErrorException(
        `Board 댓글 삭제 실패... boardCommentId: ${boardCommentId}`,
      );
    }
  }
}
