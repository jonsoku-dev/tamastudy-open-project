import { EntityRepository, Repository } from 'typeorm/index';
import { Board } from '../entities/board.entity';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from '../../auth/entities/auth.entity';
import { createBoardRequestDto } from '../dto/create-board-request.dto';
import { editBoardRequestDto } from '../dto/edit-board-request.dto';
import { BoardCategory } from '../enum/board-category.enum';
import { CursorPaginationQueryDto } from '../../common/dto/cursor-pagination-query.dto';
import { GetBoardListFilterDto } from '../dto/get-board-list-filter.dto';
import { GetBoardDto } from '../dto/get-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  private logger = new Logger('BoardRepository');

  async getBoardListByCategory(category: BoardCategory) {
    const query = this.createQueryBuilder('board');
    try {
      return await query
        .leftJoinAndSelect('board.user', 'user')
        .leftJoinAndSelect('board.comments', 'comments')
        .leftJoinAndSelect('board.likes', 'likes')
        .take(5)
        .where('board.category = :category', {
          category,
        })
        .orderBy('board.id', 'DESC')
        .cache(true)
        .getMany();
    } catch (e) {
      this.logger.error('게시판불러오기에 실패하였습니다. ', e.stack);
      throw new InternalServerErrorException(
        '게시판불러오기에 실패하였습니다. ',
        e.stack,
      );
    }
  }

  async getBoardList(
    getBoardListFilterDto: GetBoardListFilterDto,
    cursorPaginationQueryDto: CursorPaginationQueryDto,
  ) {
    let limit = 8;
    const query = this.createQueryBuilder('board');
    if (getBoardListFilterDto) {
      const { search, category } = getBoardListFilterDto;
      if (search) {
        query.andWhere('board.title LIKE :search', { search: `%${search}%` });
      }
      if (category) {
        if (category !== BoardCategory.ALL) {
          query.andWhere('board.category = :category', { category });
        }
      }
    }
    if (cursorPaginationQueryDto) {
      // after = cursor
      const { first, after } = cursorPaginationQueryDto;
      if (after) {
        query.andWhere('board.id < :after', { after });
      }
      // first = limit
      if (first) {
        limit = first;
      }
    }
    try {
      let boards = await query
        .leftJoinAndSelect('board.user', 'user')
        .leftJoinAndSelect('board.comments', 'comments')
        .leftJoinAndSelect('board.likes', 'likes')
        .take(limit + 1)
        .orderBy('board.id', 'DESC')
        .cache(true)
        .getMany();

      this.logger.debug(boards.length);

      if (boards.length === 0) {
        return {
          edges: [],
          pageInfo: {
            hasNextPage: null,
            startCursor: null,
            endCursor: null,
          },
        };
      } else {
        const hasNextPage = boards.length > limit;
        boards = hasNextPage ? boards.slice(0, -1) : boards;
        const edges = boards.map((_) => ({ node: _, cursor: _.id }));
        return {
          edges,
          pageInfo: {
            hasNextPage: hasNextPage,
            startCursor: boards[0].id,
            endCursor: hasNextPage ? boards[boards.length - 1].id : null,
          },
        };
      }
    } catch (e) {
      this.logger.error('게시판불러오기에 실패하였습니다. ', e.stack);
      throw new InternalServerErrorException(
        '게시판불러오기에 실패하였습니다. ',
        e.stack,
      );
    }
  }

  async getBoardNotIncrementView(boardId: string): Promise<Board> {
    const query = this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .leftJoinAndSelect('board.comments', 'comments')
      .leftJoinAndSelect('board.likes', 'likes')
      .orderBy('comments.createdAt', 'DESC');
    const found = await query
      .where('board.id = :boardId', { boardId })
      .getOne();
    if (!found) {
      this.logger.error(`${boardId}에 해당하는 게시물이 존재하지 않습니다.`);
      throw new NotFoundException(
        `${boardId}에 해당하는 게시물이 존재하지 않습니다.`,
      );
    }
    return found;
  }

  async getBoard(getBoardTdo: GetBoardDto): Promise<Board> {
    const found = await this.getBoardNotIncrementView(getBoardTdo.boardId);
    if (!getBoardTdo.isRefetch) {
      await this.increment({ id: found.id }, 'view', 1);
    }
    return found;
  }

  async getAuthorBoard(boardId: string, user: Auth): Promise<Board> {
    const found = await this.getBoardNotIncrementView(boardId);
    if (user.id !== found.userId) {
      throw new UnauthorizedException('권한이 없습니다. ');
    }
    return found;
  }

  async createBoard(user: Auth, createBoardRequestDto: createBoardRequestDto) {
    const query = this.createQueryBuilder('board');
    try {
      await query
        .insert()
        .into(Board)
        .values({
          title: createBoardRequestDto.title,
          desc: createBoardRequestDto.desc,
          category: createBoardRequestDto.category,
          userId: user.id,
        })
        .execute();
      this.logger.error(`Board 생성 성공`);
      return 'success';
    } catch (e) {
      console.log(e);
      this.logger.error(`Board 생성에 문제가 생겼습니다.`);
      throw new InternalServerErrorException(
        `post 생성에 문제가 생겼습니다.`,
        e.stack,
      );
    }
  }

  async editBoard(
    boardId: string,
    user: Auth,
    editBoardRequestDto: editBoardRequestDto,
  ): Promise<string> {
    const found = await this.getAuthorBoard(boardId, user);
    const query = this.createQueryBuilder('board');
    const result = await query
      .where('id = :boardId', { boardId: found.id })
      .update(Board)
      .set({
        ...editBoardRequestDto,
      })
      .execute();
    if (result.affected === 1) {
      this.logger.verbose(`Board 업데이트 성공! boardId: ${boardId}`);
      return boardId;
    } else {
      this.logger.warn(`Board 업데이트 실패... boardId: ${boardId}`);
      throw new InternalServerErrorException(
        `Board 업데이트 실패... boardId: ${boardId}`,
      );
    }
  }

  async deleteBoard(boardId: string, user: Auth): Promise<string> {
    const found = await this.getAuthorBoard(boardId, user);
    const query = this.createQueryBuilder('board');
    const result = await query
      .where('id = :boardId', { boardId: found.id })
      .delete()
      .from(Board)
      .execute();
    if (result.affected === 1) {
      this.logger.verbose(`Board 삭제 성공! boardId: ${boardId}`);
      return boardId;
    } else {
      this.logger.warn(`Board 삭제 실패... boardId: ${boardId}`);
      throw new InternalServerErrorException(
        `Board 삭제 실패... boardId: ${boardId}`,
      );
    }
  }
}