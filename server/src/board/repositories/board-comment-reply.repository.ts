import { EntityRepository, Repository } from 'typeorm/index';
import { BoardCommentReply } from '../entities/board-comment-reply.entity';
import { Auth } from '../../auth/entities/auth.entity';
import { Board } from '../entities/board.entity';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EditBoardCommentRequestDto } from '../dto/editBoardCommentRequest.dto';
import { BoardComment } from '../entities/board-comment.entity';
import { EditBoardCommentReplyRequestDto } from '../dto/editBoardCommentReplyRequest.dto';

@EntityRepository(BoardCommentReply)
export class BoardCommentReplyRepository extends Repository<BoardCommentReply> {
  private logger = new Logger('BoardCommentReplyRepository');

  async createBoardCommentReply(
    user: Auth,
    boardCommentId: string,
    body: string,
  ): Promise<string> {
    try {
      const query = this.createQueryBuilder('reply');
      await query
        .insert()
        .into(BoardCommentReply)
        .values({
          boardCommentId,
          userId: user.id,
          body,
        })
        .execute();
      return 'success';
    } catch (e) {
      console.error(e);
    }
  }

  async getAuthorBoardCommentReply(user: Auth, boardCommentReplyId: string) {
    const query = this.createQueryBuilder('reply');
    const found = await query
      .where('reply.id = :id', { id: boardCommentReplyId })
      .getOne();
    if (!found) {
      this.logger.error('not found');
      throw new NotFoundException('not found');
    }
    if (found.userId !== user.id) {
      this.logger.error('UnauthorizedException');
      throw new UnauthorizedException('UnauthorizedException');
    }
    return found;
  }

  async editBoardCommentReply(
    user: Auth,
    boardCommentReplyId: string,
    editBoardCommentReplyRequestDto: EditBoardCommentReplyRequestDto,
  ) {
    const found = await this.getAuthorBoardCommentReply(
      user,
      boardCommentReplyId,
    );
    const query = this.createQueryBuilder();
    try {
      await query
        .update(BoardCommentReply)
        .set({
          ...editBoardCommentReplyRequestDto,
        })
        .where('id = :boardCommentReplyId', {
          boardCommentReplyId: found.id,
        })
        .execute();
      this.logger.verbose('editBoardCommentReply success');
      return 'success';
    } catch (e) {
      this.logger.error('editBoardCommentReply error');
      throw new InternalServerErrorException('editBoardCommentReply error');
    }
  }

  async deleteBoardCommentReply(user: Auth, boardCommentReplyId: string) {
    const found = await this.getAuthorBoardCommentReply(
      user,
      boardCommentReplyId,
    );
    const query = this.createQueryBuilder();
    const result = await query
      .delete()
      .from(BoardCommentReply)
      .where('id = :boardCommentReplyId', {
        boardCommentReplyId: found.id,
      })
      .execute();
    if (result.affected === 1) {
      this.logger.verbose(`success`);
      return 'deleteBoardCommentReply success';
    } else {
      this.logger.error('deleteBoardCommentReply error');
      throw new InternalServerErrorException('deleteBoardCommentReply error');
    }
  }
}
